<?php

require_once('./common.php');

/**
 * 用户API
 * Class User
 */
class User extends Common {
	/**
	 * 检查用户名唯一,如果发现已存在，则提示401错误
	 * @return string
	 */
	private function checkUnique($username) {
		$mysqli_stmt = $this->_connect->stmt_init();
		if($mysqli_stmt->prepare("SELECT `user_id` FROM `ucshop_user` WHERE `username`=? LIMIT 1")){
            $mysqli_stmt->bind_param('s', $username);
            $mysqli_stmt->execute();
			$mysqli_stmt->bind_result($user_id);
			$mysqli_stmt->fetch();
			$mysqli_stmt->close();
			if ($user_id) {//如果已经存在则提示
				return Response::show(CODE_EXISTS, '用户名已存在');
			}
		}
	}

    /**
	 * 注册API
	 */
	public function register($post) {
		$this->checkUnique($post['username']);

		//数据准备
		$username 	= $post['username'];
		$salt 		= $this->createSalt();
		$password 	= $post['password'];
		$password 	= $this->getPassword($password, $salt);
		$email 		= isset($post['email']) ? $post['email'] : '';
		$reg_time 	= time();
		$avatar 	= 'default.png';

		//注册
		$mysqli_stmt = $this->_connect->stmt_init();
		if ($mysqli_stmt->prepare("INSERT INTO `ucshop_user` (`username`,`email`,`avatar`,`salt`,`password`,`reg_time`) 
            VALUES(?,?,?,?,?,?)")) {
			$mysqli_stmt->bind_param('sssssi', $username, $email, $avatar, $salt, $password, $reg_time);
			$mysqli_stmt->execute();
			if (1 == $mysqli_stmt->affected_rows) {//影响结果1条表示插入成功
				return Response::show(CODE_SUCCESS, '注册成功');
			}
		}
		return Response::show(CODE_MYSQL_ERR, '数据库错误'.$mysqli_stmt->error);
	}

	/**
	 * 登录API
	 * @param $post
	 * @return string
	 */
	public function login($post) {
		$username = $post['username'];

		//验证用户信息
		$mysqli_stmt = $this->_connect->stmt_init();
		if ($mysqli_stmt->prepare("SELECT `avatar`,`user_id`,`salt`,`password` FROM `ucshop_user` WHERE `username`=? LIMIT 1")) {
			$mysqli_stmt->bind_param('s', $username);
			$mysqli_stmt->execute();
			$mysqli_stmt->bind_result($avatar,$user_id, $salt, $password);
			$mysqli_stmt->fetch();
			$mysqli_stmt->close();
			if (!$user_id) {
				return Response::show(CODE_NOT_EXISTS, '用户名不存在');
			}
            //验证密码
            if ($this->getPassword($post['password'], $salt) !== $password) {
                Response::show(CODE_PASSWORD_ERR, '密码错误');
            }
			//得到token
			$token = $this->getLoginToken($user_id);
			if (!$token) {
				return Response::show(CODE_MYSQL_SQL_ERR, 'db error ,数据库出错,Token获取失败');
			}
			//返回登录成功后的信息
            return Response::show(CODE_SUCCESS, '登录成功', $this->returnUser($username,$avatar,$user_id,$token));
		}
		return Response::show(CODE_MYSQL_ERR, '数据库出错');
	}

}

$allowAction 	= array('register', 'login');
$status 		= isset($_POST['status']) ? $_POST['status'] : '';
if (empty($status) && !in_array($status, $allowAction)) {
	return Response::show(CODE_PARAM_ERR, '请求非法的API');
}

$username 		= isset($_POST['username']) ? $_POST['username'] : '';
if (empty($username)) {
	return Response::show(CODE_USERNAME_ERR, '少传参数username');
}

if (!isset($_POST['password'])) {
	return Response::show(CODE_PARAM_ERR, '参数错误，请检查');
}
//正则校验
if (!preg_match('/^\w{3,20}$/U', $username)) {//U让量词默认非贪婪
	return Response::show(CODE_USERNAME_ERR, '用户名不合法，请填写3-20位的英文数字下划线');
}
if (!preg_match('/^\w{6,20}$/U', $_POST['password'])) {
	return Response::show(CODE_PASSWORD_ERR, '密码最小长度为6位');
}

$c = new User();
switch ($status) {
	case 'login':
		$c->login($_POST);
        break;
	case 'register':
		$c->register($_POST);
		break;
}
