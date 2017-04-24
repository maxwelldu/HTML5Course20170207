<?php
// http://app.com/list.php?page-=1&pagesize=12
require_once('./common.php');
require_once('./file.php');


/**
 * 商品类
 * Class Goods
 */
class Goods extends Common {
    private $cacheName = 'cache_goods';

    /**
     * 商品搜索
     */
    public function search($search_text) {
        $page = isset($_GET['page']) ? $_GET['page'] : 1;
        $pageSize = isset($_GET['pagesize']) ? $_GET['pagesize'] : 10;
        if (!is_numeric($page) || !is_numeric($pageSize)) {
            return Response::show(CODE_PARAM_ERR, '数据不合法');
        }

        $offset = ($page - 1) * $pageSize;

        $sql = "SELECT * FROM ucshop_goods WHERE goods_name like '%{$search_text}%' ORDER BY sort_order ASC LIMIT {$offset}, {$pageSize}";
        $cache = new File();
        $cacheName = $this->cacheName . '-' . $search_text;
        if(!$goods = $cache->cacheData($cacheName)) {
            $result = mysqli_query($this->_connect, $sql);

            $goods = array();
            while($result && $good = mysqli_fetch_assoc($result)) {
                $goods[] = $good;
            }

            if($goods) {
                $cache->cacheData($cacheName, $goods, 1200);
            }
        }

        if($goods) {
            return Response::show(CODE_SUCCESS, '商品搜索数据获取成功', $goods);
        } else {
            return Response::show(CODE_EMPTY, '商品搜索数据为空');
        }
    }

    /**
     * 获取商品列表
     * 默认返回热门商品
     * 有cat_id则返回一个类型的商品列表
     * 有goods_id则返回单一的商品信息, 优先级高
     * @return string
     */
    public function index()
    {
        $page = isset($_GET['page']) ? $_GET['page'] : 1;
        $pageSize = isset($_GET['pagesize']) ? $_GET['pagesize'] : 10;
        if (!is_numeric($page) || !is_numeric($pageSize)) {
            return Response::show(CODE_PARAM_ERR, '数据不合法');
        }

        $offset = ($page - 1) * $pageSize;

        $where = "";
        $cat_id = isset($_GET['cat_id']) ? (int)$_GET['cat_id'] : '';
        if (!empty($cat_id)) {
            $where .= " AND cat_id = " . $cat_id;
        }

        $goods_id = isset($_GET['goods_id']) ? (int)$_GET['goods_id'] : '';
        if (!empty($goods_id)) {
            $where .= " AND goods_id = " . $goods_id;
        }

        if (empty($where)) {
            $where = " AND is_hot = 1 ";
        }

        $sql = "SELECT * FROM `ucshop_goods` WHERE 1 = 1 {$where} ORDER BY sort_order ASC LIMIT " . $offset . " , " . $pageSize;
        $cache = new File();
        $cacheName = $this->cacheName . '-list-' . $page . '-' . $pageSize . '-' . $cat_id . '-' . $goods_id;
        if (!$goods = $cache->cacheData($cacheName)) {
            $result = mysqli_query($this->_connect, $sql);

            $goods = array();
            while ($result && $good = mysqli_fetch_assoc($result)) {
                $goods[] = $good;
            }

            //添加商品品牌数据
            /*
            $brand_ids = implode(',',array_column($goods, 'brand_id'));
            echo $sql = "SELECT * FROM `ucshop_brand` WHERE brand_id in ({$brand_ids})";
            $brandResult = mysqli_query($this->_connect, $sql);
            $brands = array();
            while ($brandResult && $brand = mysqli_fetch_assoc($brandResult)) {
                $brands[] = $brand;
            }
            */

            if ($goods) {
                $cache->cacheData($cacheName, $goods, 1200);
            }
        }

        if ($goods) {
            return Response::show(CODE_SUCCESS, '商品数据获取成功', $goods);
        } else {
            return Response::show(CODE_EMPTY, '商品数据为空');
        }
    }
}

$c = new Goods();
if (isset($_GET['search_text'])) {
    $c->search($_GET['search_text']);
} else {
    $c->index();
}
