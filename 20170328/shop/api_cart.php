<?php

require_once('./api.php');
require_once('./file.php');

/**
*购物车API
*/
class Cart extends Api {
	private $cacheName = 'cache_cart';

	/**
	 * 根据商品编号获取商品
	 * @param $goods_id
	 * @return array|null
	 */
	private function getGoodsByGoodsId($goods_id) {
		if (!is_numeric($goods_id)) {
			return false;
		}

		$sql = "SELECT goods_id,cat_id,cat_name,brand_id,goods_name,goods_desc,goods_thumb,price FROM `ucshop_goods` WHERE `goods_id`={$goods_id} LIMIT 1";
		$result = mysqli_query($this->_connect, $sql);
		$goods = mysqli_fetch_assoc($result);
		return $goods;
	}
	/**
	*查看购物车API
	*/
	public function index() {
		$sql = "SELECT `cart_id`,`user_id`,`cat_id`,`cat_name`,`goods_id`,`goods_name`,`goods_thumb`,`goods_price`,`goods_number` FROM ucshop_cart WHERE is_enable=1 AND user_id = {$this->user_id} LIMIT 150";

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
			return Response::show(CODE_SUCCESS, '购物车数据获取成功', $carts);
		} else {
			return Response::show(CODE_EMPTY, '购物车数据为空');
		}
	}
	/**
	* 更新购物车API
	* 添加商品到购物车,或者更新,或者删除
	*/
	public function update() {
		//数据准备
		$goods_id = isset($_POST['goods_id']) ? (int)$_POST['goods_id'] : 0;//商品编号
		$goods_number = isset($_POST['number']) ? (int)$_POST['number'] : 1;//商品数量(0为删除)

		if ($goods_id == 0) {
			return Response::show(CODE_PARAM_ERR, '商品编号没传');
		}

		$goods = $this->getGoodsByGoodsId($goods_id);
		if (!$goods) {
			return Response::show(CODE_NOT_EXISTS, '商品不存在');
		}
		$cat_id = $goods['cat_id'];
		$cat_name = $goods['cat_name'];
		$goods_name = $goods['goods_name'];
		$goods_thumb = $goods['goods_thumb'];
		$goods_price = $goods['price'];

		if ($this->checkUnique($this->user_id, $goods_id) && $goods_number > 0) {//如果购物车中存在则进行更新
			$result = $this->updateCart($this->user_id, $cat_id, $cat_name, $goods_id, $goods_name, $goods_thumb, $goods_price, $goods_number);
		} elseif ($goods_number == 0) { //如果是0则执行删除
			$result = $this->deleteCart($this->user_id, $goods_id);
		} else { //否则执行添加
			$result = $this->addCart($this->user_id, $cat_id, $cat_name, $goods_id, $goods_name, $goods_thumb, $goods_price, $goods_number);
		}
		if ($result) {
			Response::show(CODE_SUCCESS, '更新购物车成功');
		} else {
			Response::show(CODE_FAILED, '购物车未更新');
		}
	}

	/**
	 * 更新购物车
	 * @param integer $user_id 用户编号
	 * @param integer $cat_id 商品分类编号
	 * @param string $cat_name 商品分类名称
	 * @param integer $goods_id 商品编号
	 * @param string $goods_name 商品名称
	 * @param string $goods_thumb 商品缩略图
	 * @param double $goods_price 商品价格
	 * @param integer $goods_number 商品数量
	 * @return string
	 */
	private function updateCart($user_id,$cat_id,$cat_name,$goods_id,$goods_name,$goods_thumb, $goods_price, $goods_number) {
		$mysqli_stmt = $this->_connect->stmt_init();
		if ($mysqli_stmt->prepare("UPDATE `ucshop_cart` SET `cat_id`=?,`cat_name`=?,`goods_id`=?,`goods_name`=?,`goods_thumb`=?,`goods_price`=?,`goods_number`=`goods_number`+? WHERE `user_id`=? AND `goods_id`=?")) {
			$mysqli_stmt->bind_param('isissdiii', $cat_id, $cat_name, $goods_id, $goods_name, $goods_thumb, $goods_price, $goods_number, $user_id, $goods_id);
			$mysqli_stmt->execute();
			return (1 == $mysqli_stmt->affected_rows); //影响结果1条表示插入成功
		}
		return FALSE;
	}

	/**
	 * 删除购物车中的某个商品
	 * @param $user_id
	 * @param $goods_id
	 * @return bool
	 */
	private function deleteCart($user_id, $goods_id) {
		$mysqli_stmt = $this->_connect->stmt_init();
		if ($mysqli_stmt->prepare("DELETE FROM `ucshop_cart` WHERE `user_id` = ? AND `goods_id`=?")) {
			$mysqli_stmt->bind_param('ii', $user_id, $goods_id);
			$mysqli_stmt->execute();
			print_r($mysqli_stmt->error);
			return (1 == $mysqli_stmt->affected_rows); //影响结果1条表示插入成功
		}
		print_r($mysqli_stmt->error);
		return FALSE;
	}

	/**
	 * 添加到购物车
	 * @param integer $user_id 用户编号
	 * @param integer $cat_id 商品分类编号
	 * @param string $cat_name 商品分类名称
	 * @param integer $goods_id 商品编号
	 * @param string $goods_name 商品名称
	 * @param string $goods_thumb 商品缩略图
	 * @param double $goods_price 商品价格
	 * @param integer $goods_number 商品数量
	 * @return string
	 */
	private function addCart($user_id,$cat_id,$cat_name,$goods_id,$goods_name,$goods_thumb, $goods_price, $goods_number) {
		$mysqli_stmt = $this->_connect->stmt_init();
		if ($mysqli_stmt->prepare("INSERT INTO `ucshop_cart` (`user_id`,`cat_id`,`cat_name`,`goods_id`,`goods_name`,`goods_thumb`, `goods_price`, `goods_number`)
            VALUES(?,?,?,?,?,?,?,?)")) {
			$mysqli_stmt->bind_param('iisissdi', $user_id, $cat_id, $cat_name, $goods_id, $goods_name, $goods_thumb, $goods_price, $goods_number);
			$mysqli_stmt->execute();
			if (1 == $mysqli_stmt->affected_rows) {//影响结果1条表示插入成功
				return Response::show(CODE_SUCCESS, '添加到购物车成功');
			}
		}
		return Response::show(CODE_MYSQL_SQL_ERR, '数据库错误'.$mysqli_stmt->error);
	}

	/**
	 * 检查购物车中是否已经存在该商品
	 * @param $user_id
	 * @param $goods_id
	 * @return bool
	 */
	private function checkUnique($user_id,$goods_id) {
		$mysqli_stmt = $this->_connect->stmt_init();
		if($mysqli_stmt->prepare("SELECT `cart_id` FROM `ucshop_cart` WHERE `user_id`=? AND `goods_id`=? LIMIT 1")){
			$mysqli_stmt->bind_param('ii', $user_id, $goods_id);
			$mysqli_stmt->execute();
			$mysqli_stmt->bind_result($cart_id);
			$mysqli_stmt->fetch();
			$mysqli_stmt->close();
			return $cart_id > 0;
		}
	}
}

$c = new Cart();
if (isset($_POST['goods_id'])) {
	$c->update();
} else {
	$c->index();
}
