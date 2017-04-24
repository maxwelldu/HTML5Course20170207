<?php
/**
 * Created by PhpStorm.
 * User: maxwell
 * Date: 17/3/17
 * Time: 下午9:41
 */
set_time_limit(0);
require_once('./function.php');

function goodsPage($cat_id, $page) {
    //良仓的商品信息,抓取某一个分类下面的商品
    $offset = ($page - 1) * 24;
    $url = "http://www.iliangcang.com/i/shop/list/?cat_id=00{$cat_id}&offset={$offset}#_GLS";
    $content = getContent($url);

    //id, 图片，标题
    $reg = '/<a href="\/i\/goods\/\?id=(\d+)" target="_blank"><img\s+src="(.*)" title="(.*)" alt=".*" \/>/m';
    $imgData = fetchData($content, $reg);

    //价格
    $reg = '/.*<p class="money">¥([\d\.]+)<\/p>/m';
    $moneyData = fetchData($content, $reg);
    $imgData[] = $moneyData[1];

    //描述
    $reg = '/<p class="desc">(.*?)<\/p>/s';//修正正则里面的.匹配包括换行符
    $descData = fetchData($content, $reg);
    $imgData[] = $descData[1];

    $cat_ids = array();
    $is_hots = array();
    foreach($moneyData[1] as $k) {
        $cat_ids[] = $cat_id;
        $is_hots[] = 1;
    }
    $imgData[] = $cat_ids;
    $imgData[] = $is_hots;

    if (count($moneyData[1])<24) {
        return;
    }


    $sql = createSQL($imgData, 'ucshop_goods', array('goods_id', 'goods_thumb', 'goods_name', 'price', 'goods_desc', 'cat_id', 'is_hot'));
    $result = insertData($sql);
    if($result){
        echo '数据插入成功<br /><br />';
    } else {
        echo '数据插入失败(数据可能已经插入): SQL:<br /><code>'.$sql.'</code>'.$result.'<br /><br />';
    }
    flush();
    sleep(1);
    goodsPage($cat_id, ++$page);
}

//获取分类
$data = getCategoryData();
//得到分类编号
$cat_ids = $data[1];
//读取已经抓取后的索引
$index = readIndex();
if ($index >= count($cat_ids)) {
    echo '商品已经抓取结束';
    exit;
}

//抓取当前分类的所有商品,从第1页开始
goodsPage($cat_ids[$index], 1);
