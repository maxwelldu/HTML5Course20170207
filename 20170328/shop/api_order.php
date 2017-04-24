<?php

require_once('./api.php');
require_once('./file.php');

/**
*订单API
*/
class Order extends Api {
	private $cacheName = 'cache_order';
	/**
	*查看订单API
	*/
	public function index() {
		$sql = "SELECT * FROM ucshop_order WHERE user_id = {$this->user_id} LIMIT 50";

		$cache = new File();
		$cacheName = $this->cacheName . $this->user_id;
		if(!$carts = $cache->cacheData($cacheName)) {
			$result = mysqli_query($this->_connect, $sql);
			$carts = array();
			while($result && $cart = mysqli_fetch_assoc($result)) {
				$carts[] = $cart;
			}

			if($carts) {
				$cache->cacheData($cacheName, $carts, 1200);
			}
		}

		if($carts) {
			return Response::show(CODE_SUCCESS, '查看订单数据获取成功', $carts);
		} else {
			return Response::show(CODE_EMPTY, '查看订单数据数据为空');
		}
	}
	/**
	*下订单API
	*/
	public function add() {
		//数据准备
		//使用收货地址id得到收货信息
		//检查购物车中有内容，才能下订单
		//将购物车中的内容得到转成json格式存起来
		//将购物车中的内容清空
		$address_id = isset($_POST['address_id']) ? (int)$_POST['address_id'] : 0;
		//1.得到收货信息
		if (!$address = $this->getAddressByAddressId($address_id)) {
			return Response::show(CODE_FAILED, '用户地址编号传递错误');
		}
		//2.得到购物车信息
		$goods_list 		= $this->getCartByUserId();
		if (count($goods_list)<1) {
			return Response::show(CODE_NOT_EXISTS, '购物车中还没有商品,无法提交订单');
		}
		$goods_list 		= json_encode($goods_list);
		//3.将购物车中的内容得到转成json
		$total_prices 		= isset($_POST['total_prices']) ? (int)$_POST['total_prices'] : 0;
		$user_id 			= $this->user_id;
		$consignee 			= $address['consignee'];
		$country 			= $address['country'];
		$province 			= $address['province'];
		$city 				= $address['city'];
		$district 			= $address['district'];
		$address_info 		= $address['address'];
		$zip_code 			= $address['zip_code'];
		$tel 				= $address['tel'];
		$email 				= $address['email'];
		$sign_building 		= $address['sign_building'];
		$best_time 			= $address['best_time'];
		$mobile 			= $address['mobile'];
		//3.将购物车清空, 这里要使用事务，两件事情同时完成才能算完成
		$this->_connect->begin_transaction();
		$emptyCart = $this->emptyCart();

		$mysqli_stmt = $this->_connect->stmt_init();
		echo $sql = "INSERT INTO `ucshop_order` (`total_prices`,`goods_list`,`user_id`,`tel`,`best_time`,`sign_building`,`country`,`email`,`consignee`,`province`,`city`,`district`,`address`, `zip_code`, `mobile`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		if ($mysqli_stmt->prepare($sql)) {
			$mysqli_stmt->bind_param('dsissssssssssss',$total_prices, $goods_list, $user_id, $tel, $best_time, $sign_building, $country, $email, $consignee, $province, $city, $district, $address_info, $zip_code, $mobile);
			$mysqli_stmt->execute();
			if ($emptyCart && 1 == $mysqli_stmt->affected_rows) {//影响结果1条表示插入成功
				$this->_connect->commit();//如果购物车成功清空,并且订单成功加入一条数据,则提交事务
				return Response::show(CODE_SUCCESS, '下订单成功');
			} else {
				$this->_connect->rollback();
				return Response::show(CODE_FAILED, '下订单失败');
			}
		}
		return Response::show(CODE_MYSQL_ERR, '数据库错误'.$mysqli_stmt->error);
	}

	/**
	 * 清空购物车
	 * @return bool
	 */
	private function emptyCart() {
		return $this->_connect->query("UPDATE `ucshop_cart` SET `is_enable`=0 WHERE `user_id`='{$this->user_id}'");
	}

	/**
	 * 根据用户编号查找购物车
	 * @return bool
	 */
	private function getCartByUserId() {
		$sql = "SELECT `cart_id`,`user_id`,`cat_id`,`cat_name`,`goods_id`,`goods_name`,`goods_thumb`,`goods_price`,`goods_number` FROM ucshop_cart WHERE is_enable=1 AND user_id = '{$this->user_id}' LIMIT 150";
		$result = mysqli_query($this->_connect, $sql);

		$ads = array();
		while($result && $ad = mysqli_fetch_assoc($result)) {
			$ads[] = $ad;
		}

		return $ads;
	}

	/**
	 * 获取收货地址信息,根据地址编号
	 * @param integer $aid 收货地址编号
	 * @return array|bool
	 */
	private function getAddressByAddressId($aid) {
		$mysqli_stmt = $this->_connect->stmt_init();
		$sql = "SELECT `country`,`address_id`,`sign_building`,`best_time`,`address_name`,`consignee`,`province`,`city`,`district`,`address`,`zip_code`,`mobile`,`email`,`tel` FROM `ucshop_user_address` WHERE `is_enable`=1 AND `address_id`=? LIMIT 1";
		if ($mysqli_stmt->prepare($sql)) {
			$mysqli_stmt->bind_param('s', $aid);
			$mysqli_stmt->execute();
			$mysqli_stmt->bind_result($country, $address_id, $sign_building, $best_time, $address_name, $consignee, $province, $city, $district, $address, $zip_code, $mobile, $email, $tel);
			$mysqli_stmt->fetch();
			if ($address_id > 0) {
				return array(
					'address_id' => $address_id,
					'sign_building' => $sign_building,
					'best_time' => $best_time,
					'country' => $country,
					'address_name' => $address_name,
					'consignee' => $consignee,
					'province' => $province,
					'city' => $city,
					'district' => $district,
					'address' => $address,
					'zip_code' => $zip_code,
					'mobile' => $mobile,
					'email' => $email,
					'tel' => $tel
				);
			}
		}
		return false;
	}

}

$status = isset($_GET['status']) ? $_GET['status'] : '';

$c = new Order();
if ($status == 'add') {//添加订单
	return $c->add();
}

return $c->index();
