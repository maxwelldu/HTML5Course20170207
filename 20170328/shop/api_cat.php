<?php

require_once('./common.php');
require_once('./file.php');

/**
 * 商品分类API
 * Class Category
 */
class Category extends Common {
	private $cacheName = 'cache_cat';

	/**
	 * 获取商品分类API
	 * @return string
	 */
	public function index() {
		$sql = "SELECT * FROM ucshop_category WHERE is_show = 1 AND parent_id=0 ORDER BY sort_order ASC LIMIT 10";
		$cache = new File();
		if(!$cats = $cache->cacheData($this->cacheName)) {
			$result = mysqli_query($this->_connect, $sql);

			$cats = array();
			while($result && $cat = mysqli_fetch_assoc($result)) {
				$cats[] = $cat;
			}

			if($cats) {
				$cache->cacheData($this->cacheName, $cats, 1200);
			}
		}

		if($cats) {
			return Response::show(CODE_SUCCESS, '商品分类数据获取成功', $cats);
		} else {
			return Response::show(CODE_EMPTY, '商品分类数据为空');
		}
	}
}

$c = new Category();
$c->index();
