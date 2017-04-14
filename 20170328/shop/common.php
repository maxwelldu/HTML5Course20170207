<?php
/**
 * 处理接口公共业务
 */
require_once('./response.php');
require_once('./db.php');

//时区设置
date_default_timezone_set('PRC');
//跨域请求设置,允许所有的域名请求过来,这个主要用来给前端班教学使用
header("Access-Control-Allow-Origin:*");
header('Access-Control-Allow-Methods:POST,GET,PUT,OPTIONS,DELETE');
header("Access-Control-Allow-Headers:Origin,X-Requested-With,Content-Type,Accept,token");
header("Access-Control-Request-Methods:GET,POST,PUT,DELETE,OPTIONS");
//错误处理设置
error_reporting(0);
set_error_handler('errorHandler');
register_shutdown_function('fatalErrorHandler');
function errorHandler($errno,$errstr,$errfile,$errline){
    $arr = array(
        '['.date('Y-m-d h-i-s').']',
        'http://h6.duchengjiu.top',
        '|',
        $errstr,
        $errfile,
        'line:'.$errline,
    );
    //写入错误日志
    //格式 ：  时间 uri | 错误消息 文件位置 第几行
    error_log(implode(' ',$arr)."\r\n",3,'./logs/shopapi.txt','extra');
	return Response::show(CODE_ERROR, '系统错误，请联系管理员');
}

//捕获fatalError
function fatalErrorHandler(){
    $e = error_get_last();
    switch($e['type']){
        case E_ERROR:
        case E_PARSE:
        case E_CORE_ERROR:
        case E_COMPILE_ERROR:
        case E_USER_ERROR:
            errorHandler($e['type'],$e['message'],$e['file'],$e['line']);
            break;
    }
}

const CODE_SUCCESS 	= 0;//请求成功
const CODE_EMPTY   	= 1;//数据为空
const CODE_FAILED  	= 2;//失败
const CODE_ERROR	= 3;//系统错误，请联系管理员
//用户方面错误1xxx
const CODE_USERNAME_ERR = 1000;//用户名错误,格式不正确，规定在3-20位数字字母下划线
const CODE_PASSWORD_ERR = 1001;//密码错误,格式不对,需要在6-20位之间,数字字母下划线
const CODE_TOKEN_ERR 	= 1002;//TOKEN错误, 非法的TOKEN,请使用登录后获得的TOKEN请求
const CODE_TOKEN_EMPTY	= 1003;//TOKEN没传, 请在HTTP协议的header里面添加token
const CODE_PARAM_ERR	= 1004;//参数错误
//资源错误2xxx
const CODE_RESOURCE_EXPIRE		= 2000;//资源过期
const CODE_EXISTS				= 2001;//资源已存在
const CODE_NOT_EXISTS			= 2002;//资源不存在
//服务器错误3xxx
const CODE_MYSQL_ERR			= 3000;//数据库连接错误
const CODE_MYSQL_SQL_ERR 		= 3001;//SQL语句错误

/**
 * API的基类
 * Class Common
 */
class Common {
	public $params;
	private $config = array(
		'site_token'    => 'shop',//站点前缀,用于加密的时候添加上, 只能是4位,因为程序里面会再添加6位,数据库一共只存10位
		'login_expires'  => '+7 days'//用户登录之后token有效时间，这里使用的是PHP里strtotime的函数,所以字符串要符合一定的格式
	);

	/**
	 * @var mysqli|数据库连接资源
	 */
	protected $_connect;

	/**
	 * Common constructor.
	 */
	public function __construct(){
		try {
			$this->_connect = Db::getInstance()->connect();
		} catch(Exception $e) {
			return Response::show(CODE_MYSQL_ERR, '数据库链接失败');
		}
	}

	/**
	 * 返回用户的数据
	 * @param string $username 用户名
	 * @param string $avatar 头像
	 * @param int $user_id 用户编号
	 * @param string $token 用户Token
	 * @return array
	 */
	protected function returnUser($username, $avatar, $user_id, $token='') {
		return array(
			'username' 	=> $username,
			'avatar'	=> $avatar,
			'user_id'	=> $user_id,
			'token'		=> $token,
		);
	}

	/**
	 * 记录日志
	 * @param $data
	 */
	protected function writeLog($data) {
		file_put_contents('logs/error.txt', $data);
	}
	/**
	 * 生成随机字符串
	 * @param $length integer 指定长度的字符串
	 * @return string
	 */
	protected function createRandomStr($length){
		$str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';//62个字符
		$strlen = 62;
		while($length > $strlen){
			$str .= $str;
			$strlen += 62;
		}
		$str = str_shuffle($str);
		return substr($str,0,$length);
	}

	/**
	 * 得到密码加密的盐
	 * @return string
	 */
	protected function createSalt() {
		return $this->config['site_token'] . $this->createRandomStr(6);
	}

	/**
	 * 得到密码
	 * @param $password
	 * @param $salt
	 * @return string
	 */
	protected function getPassword($password, $salt) {
		return md5($this->config['site_token'] . $password . $salt);
	}

	/**
	 * 得到一个TOKEN
	 * @param $user_id
	 * @return string
	 */
	protected function createToken($user_id) {
		return md5(time().$this->config['site_token'].$user_id.$this->createRandomStr(6));
	}

	/**
	 * 创建一个过期时间
	 * @return int
	 */
	protected function createPassTime() {
		return strtotime($this->config['login_expires']);
	}

	/**
	 * 得到登录的token
	 * @param $user_id
	 * @return string
	 */
	protected function getLoginToken($user_id) {
		if ($this->getTokenByUserId($user_id)) {
			return $this->modTokenByUserId($user_id);
		} else {
			return $this->addTokenByUserid($user_id);
		}
	}

	/**
	 * 根据用户TOKEN获得用户的编号
	 * @param string $token 用户TOKEN
	 * @return bool
	 */
	protected function getUserIdByToken($token) {
		$mysqli_stmt = $this->_connect->stmt_init();
		if($mysqli_stmt->prepare("SELECT `user_id` FROM `ucshop_user_token` WHERE `token`=? LIMIT 1")){
			$mysqli_stmt->bind_param('i', $token);
			$mysqli_stmt->execute();
			$mysqli_stmt->bind_result($user_id);
			$mysqli_stmt->fetch();
			return $user_id ? $user_id : FALSE;
		}
		$this->writeLog($mysqli_stmt->error);
		return FALSE;
	}
	/**
	 * 获得用户的Token
	 * @param $user_id
	 * @return mixed
	 */
	private function getTokenByUserId($user_id)
	{
		$mysqli_stmt = $this->_connect->stmt_init();
		if($mysqli_stmt->prepare("SELECT `token` FROM `ucshop_user_token` WHERE `pass_time`>" . time() . " AND `user_id`=? LIMIT 1")){
			$mysqli_stmt->bind_param('i', $user_id);
			$mysqli_stmt->execute();
			$mysqli_stmt->bind_result($token);
			$mysqli_stmt->fetch();
			return $token ? $token : FALSE;
		}
		$this->writeLog($mysqli_stmt->error);
		return FALSE;
	}

	/**
	 * 修改用户的Token
	 * @param $user_id
	 * @return bool|string 成功返回Token, 失败返回FALSE
	 */
	private function modTokenByUserId($user_id)
	{
		$token =  $this->createToken($user_id);
		$pass_time = $this->createPassTime();
		$mysqli_stmt = $this->_connect->stmt_init();
		if ($mysqli_stmt->prepare("UPDATE `ucshop_user_token` SET `token`=?, `pass_time`=? WHERE user_id=?")) {
			$mysqli_stmt->bind_param('sii', $token, $pass_time, $user_id);
			$mysqli_stmt->execute();
			return (1 == $mysqli_stmt->affected_rows) ? $token : FALSE; //影响结果1条表示插入成功
		}
		$this->writeLog($mysqli_stmt->error);
		return FALSE;
	}

	/**
	 * 添加Token
	 * @param $user_id
	 * @return bool|string 成功返回token,失败返回FALSE
	 */
	private function addTokenByUserId($user_id)
	{
		$token =  $this->createToken($user_id);
		$pass_time = $this->createPassTime();

		$mysqli_stmt = $this->_connect->stmt_init();
		if ($mysqli_stmt->prepare("INSERT INTO `ucshop_user_token` (`user_id`,`token`,`pass_time`) VALUES (?,?,?)")) {
			$mysqli_stmt->bind_param('isi', $user_id, $token, $pass_time);
			$mysqli_stmt->execute();
			return (1 == $mysqli_stmt->affected_rows) ? $token : FALSE; //影响结果1条表示插入成功
		}
		$this->writeLog($mysqli_stmt->error);
		return FALSE;
	}

	/**
	 * 自动删除已经过期的Token
	 * @param $token
	 * @return bool
	 */
	private function delToken($token)
	{
		//利用系统写计划任务
		//TODO 删除TOKEN
		$mysqli_stmt = $this->_connect->stmt_init();
		if ($mysqli_stmt->prepare("DELETE FROM `ucshop_user_token` WHERE `pass_time` < " . time())) {
			$mysqli_stmt->execute();
			return (1 == $mysqli_stmt->affected_rows); //影响结果1条表示插入成功
		}
		$this->writeLog($mysqli_stmt->error);
		return FALSE;
	}

	/**
	 * 根据图片大小组装相应图片
	 * @param string $imageUrl
	 * @param string $size
	 * @return string
	 */
	public function setImage($imageUrl, $size) {
		if(!$imageUrl) {
			return '';
		}
		if(!$size) {
			return $imageUrl;
		}

		$type = substr($imageUrl, strrpos($imageUrl, '.'));
		if(!$type) {
			return '';
		}
		$path = substr($imageUrl, 0, strrpos($imageUrl, '.'));

		return $path . '_' . $size . $type;
	}
}
