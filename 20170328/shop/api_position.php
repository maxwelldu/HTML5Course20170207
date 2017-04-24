<?php

require_once('./common.php');
require_once('./file.php');

/**
 * 广告位API
 * Class Position
 */
class Position extends Common {
	private $cacheName = 'cache_position';
	/**
	 * 获取广告位API
	 * @return string
	 */
	public function index() {
		$sql = "SELECT `position_id`,`name`,`description` FROM ucshop_position WHERE is_show = 1 LIMIT 10";
		$cache = new File();
		if(!$positions = $cache->cacheData($this->cacheName)) {
			$result = mysqli_query($this->_connect, $sql);

			$positions = array();
			while($result && $position = mysqli_fetch_assoc($result)) {
				$positions[] = $position;
			}

			if($positions) {
				$cache->cacheData($this->cacheName, $positions, 1200);
			}
		}

		if($positions) {
			return Response::show(CODE_SUCCESS, '广告位数据获取成功', $positions);
		} else {
			return Response::show(CODE_EMPTY, '广告位数据为空');
		}
	}
}

$c = new Position();
$c->index();
