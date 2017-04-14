<?php

require_once('./api.php');
require_once('./file.php');

/**
 * 用户API
 * Class User
 */
class User extends Api {
	private $cacheName = 'cache_user';
	public function __construct() {
		parent::__construct();
	}
	/**
	 * 获取信息
	 * @param $username
	 * @return string
	 */
	public function info($username){
		$cache = new File();
		$cacheName = $this->cacheName . '-' . $this->user_id;
		if(!$user = $cache->cacheData($cacheName)) {
			$mysqli_stmt = $this->_connect->stmt_init();
			if ($mysqli_stmt->prepare("SELECT `avatar`,`user_id` FROM `ucshop_user` WHERE `username`=? LIMIT 1")) {
				$mysqli_stmt->bind_param('s', $username);
				$mysqli_stmt->execute();
				$mysqli_stmt->bind_result($avatar, $this->user_id);
				$mysqli_stmt->fetch();
				$mysqli_stmt->close();

				$user = array(
					'username' 	=> $username,
					'avatar' 	=> $avatar,
					'user_id'	=> $this->user_id,
				);
				$cache->cacheData($cacheName, $user, 1200);
				return Response::show(CODE_SUCCESS, '用户获取成功', $this->returnUser($user['username'], $user['avatar'], $this->user_id));
			}
		}
        return Response::show(CODE_SUCCESS, '用户数据获取成功', $this->returnUser($user['username'], $user['avatar'], $this->user_id));
	}

	/**
	 * 修改用户信息
	 */
	public function update() {
		$email = isset($_POST['email']) ? $_POST['email'] : " ";
		$sex = isset($_POST['sex']) ? (int)$_POST['sex'] : 0;
		$avatar = isset($_POST['avatar']) ? $_POST['avatar'] : 1;

		$result = FALSE;
		$mysqli_stmt = $this->_connect->stmt_init();
		if ($mysqli_stmt->prepare("UPDATE `ucshop_user` SET `email`=?,`sex`=?,`avatar`=? WHERE `user_id`=? ")) {
			$mysqli_stmt->bind_param('sisi', $email, $sex, $avatar, $this->user_id);
			$mysqli_stmt->execute();
			$result = (1 == $mysqli_stmt->affected_rows); //影响结果1条表示插入成功
		}
		return Response::show($result ? CODE_SUCCESS : CODE_FAILED , $result ? "更新信息成功" : "更新信息失败");
	}

}

$allowAction = array('info', 'update');
$status = isset($_GET['status']) ? $_GET['status'] : '';
if (empty($status) && !in_array($status, $allowAction)) {
	return Response::show(CODE_PARAM_ERR, '请求非法的API');
}

$c = new User();
//1.获取用户信息
if ($status == 'info') {
	$username = isset($_GET['username']) ? $_GET['username'] : '';
	if (empty($username)) {
		return Response::show(CODE_PARAM_ERR, '少传参数username');
	}
	return $c->info($username);
} elseif ($status == 'update') {
	return $c->update();
}
return Response::show(CODE_PARAM_ERR, '没有传递合适的参数');
