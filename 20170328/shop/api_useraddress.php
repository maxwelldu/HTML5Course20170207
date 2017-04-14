<?php

require_once('./api.php');
require_once('./file.php');

/**
 * 用户地址API
 * Class UserAddress
 */
class UserAddress extends Api {
	public function __construct() {
		parent::__construct();
	}
	/**
	 * 用户的地址列表
	 * @return string
	 */
	public function index(){
        $sql = "SELECT `address_id`,`address_name`,`consignee`,`province`,`city`,`district`,`address`,`zip_code`,`mobile` FROM `ucshop_user_address` WHERE `is_enable`=1 AND `user_id`='{$this->user_id}' LIMIT 50";
        $result = mysqli_query($this->_connect, $sql);
        $addresses = array();
        while($result && $address = mysqli_fetch_assoc($result)) {
            $addresses[] = $address;
        }

		return Response::show(CODE_SUCCESS, '用户地址数据获取成功', $addresses);
	}

	/**
	 * 添加用户地址
	 */
	public function add() {
		//数据准备
		$address_name = isset($_POST['address_name']) ? $_POST['address_name'] : " ";
		$consignee = isset($_POST['consignee']) ? $_POST['consignee'] : " ";
		$country = isset($_POST['country']) ? $_POST['country'] : "中国";
		$province = isset($_POST['province']) ? $_POST['province'] : " ";
		$city = isset($_POST['city']) ? $_POST['city'] : " ";
		$district = isset($_POST['district']) ? $_POST['district'] : " ";
		$address = isset($_POST['address']) ? $_POST['address'] : " ";
		$zip_code = isset($_POST['zip_code']) ? $_POST['zip_code'] : " ";
		$mobile = isset($_POST['mobile']) ? $_POST['mobile'] : " ";
		$email = isset($_POST['email']) ? $_POST['email'] : " ";
		$tel = isset($_POST['tel']) ? $_POST['tel'] : " ";
		$best_time = isset($_POST['best_time']) ? $_POST['best_time'] : " ";
		$sign_building = isset($_POST['sign_building']) ? $_POST['sign_building'] : " ";

		$mysqli_stmt = $this->_connect->stmt_init();
		$sql = "INSERT INTO `ucshop_user_address` (`user_id`,`tel`,`best_time`,`sign_building`,`country`,`email`,`address_name`,`consignee`,`province`,`city`,`district`,`address`, `zip_code`, `mobile`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		if ($mysqli_stmt->prepare($sql)) {
			$mysqli_stmt->bind_param('ssssssssssssss',$this->user_id,$tel, $best_time, $sign_building, $country, $email, $address_name, $consignee, $province, $city, $district, $address, $zip_code, $mobile);
			$mysqli_stmt->execute();
			if (1 == $mysqli_stmt->affected_rows) {//影响结果1条表示插入成功
				return Response::show(CODE_SUCCESS, '收货地址添加成功');
			} else {
				return Response::show(CODE_FAILED, '收货地址添加失败');
			}
		}
		return Response::show(CODE_MYSQL_ERR, '数据库错误'.$mysqli_stmt->error);
	}
	public function delete() {
		$address_id = isset($_GET['address_id']) ? (int)$_GET['address_id'] : 0;

		$result = FALSE;
		$mysqli_stmt = $this->_connect->stmt_init();
		if ($mysqli_stmt->prepare("UPDATE `ucshop_user_address` SET `is_enable`=0 WHERE `address_id`=?")) {
			$mysqli_stmt->bind_param('i', $address_id);
			$mysqli_stmt->execute();
			$result = (1 == $mysqli_stmt->affected_rows); //影响结果1条表示插入成功
		}
		return Response::show($result ? CODE_SUCCESS : CODE_FAILED , $result ? "收货地址删除成功" : "收货地址删除失败");
	}
}

$status = isset($_GET['status']) ? $_GET['status'] : '';

$c = new UserAddress();
if ($status == 'add') {//添加收货地址
	return $c->add();
} elseif ($status == 'delete') {//删除收货地址
	return $c->delete();
}

return $c->index();
