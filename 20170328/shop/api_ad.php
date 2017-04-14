<?php

require_once('./common.php');
require_once('./file.php');

/**
 * 广告API
 * Class Ad
 */
class Ad extends Common {
	private $cacheName = 'cache_ad';
	/**
	 * 获取广告API
	 * @param $position_id
	 * @return string
	 */
	public function index($position_id) {
		$sql = "SELECT `title`,`thumb`,`url`,`goods_id` FROM ucshop_ad WHERE position_id={$position_id} ORDER BY sort_order ASC LIMIT 10";
		$cache = new File();
		$cacheName = $this->cacheName . $position_id;
		if(!$ads = $cache->cacheData($cacheName)) {
			$result = mysqli_query($this->_connect, $sql);

			$ads = array();
			while($result && $ad = mysqli_fetch_assoc($result)) {
				$ads[] = $ad;
			}

			if($ads) {
				$cache->cacheData($cacheName, $ads, 1200);
			}
		}

		if($ads) {
			return Response::show(CODE_SUCCESS, '广告数据获取成功', $ads);
		} else {
			return Response::show(CODE_EMPTY, '广告数据为空');
		}
	}
}

$position_id = isset($_GET['position_id']) ? (int)$_GET['position_id'] : 0;
if ($position_id<1) {
	return Response::show(CODE_PARAM_ERR, '参数传递错误');
}

$c = new Ad();
$c->index($position_id);
