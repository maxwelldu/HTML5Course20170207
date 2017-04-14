<?php
/**
 * Created by PhpStorm.
 * User: maxwell
 * Date: 17/3/17
 * Time: 下午9:43
 */
include('./function.php');

//良仓的首页轮播数据抓取
/*
$data = getLiangcangBannerData();
$position_ids = array();
foreach($data[1] as $k) {
    $position_ids[] = 1; //首页banner广告
}
$data[] = $position_ids;
$sql = createSQL($data, 'ucshop_ad', array('thumb', 'url','position_id'));

if (insertData($sql)) {
    echo '数据插入成功';
} else {
    echo '数据插入失败(数据可能已经插入): SQL:<br /><code>' . $sql . '</code>';
}
*/

//三星的首页轮播数据抓取
$data = getSamsungBannerData();
$position_ids = array();
foreach($data[1] as $k) {
    $position_ids[] = 2; //三星的轮播
}
$data[] = $position_ids;
$sql = createSQL($data, 'ucshop_ad', array('thumb', 'url', 'position'));
if (insertData($sql)) {
    echo '数据插入成功';
} else {
    echo '数据插入失败(数据可能已经插入): SQL:<br /><code>' . $sql . '</code>';
}
