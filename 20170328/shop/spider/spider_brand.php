<?php
/**
 * Created by PhpStorm.
 * User: maxwell
 * Date: 17/3/17
 * Time: 下午9:43
 */
require_once('../db.php');
include('./function.php');

$data = getLiangcangBrand();
//遍历所有的品牌，使用curl批量抓取页面数据
$brandids = $data[1];
$brands = $brandids;
foreach($brands as &$brand) {
    $brand = "http://www.iliangcang.com/i/brand/intro/?id=" . $brand;
}
//var_dump($brands);

$requests = $brands;
$main    = curl_multi_init();
$results = array();
$errors  = array();
$info = array();
$count = count($requests);
$count = 93;
for($i = 0; $i < $count; $i++)
{
    $handles[$i] = curl_init($requests[$i]);
    var_dump($requests[$i]);
    curl_setopt($handles[$i], CURLOPT_URL, $requests[$i]);
    curl_setopt($handles[$i], CURLOPT_RETURNTRANSFER, 1);
    curl_multi_add_handle($main, $handles[$i]);
}
$running = 0;
do {
    curl_multi_exec($main, $running);
}
while($running > 0);
for($i = 0; $i < $count; $i++)
{  $results[] = curl_multi_getcontent($handles[$i]);
    $errors[]  = curl_error($handles[$i]);
    $info[]    = curl_getinfo($handles[$i]);
    curl_multi_remove_handle($main, $handles[$i]);
}
curl_multi_close($main);
//var_dump($results);
foreach($results as $k=>$result) {
    $array = array();
    //图片
    $regex = '/<div class="drImg">.*?<img src="(.*?)"\s*.*>.*?<\/div>/s';
    $imgs = fetchData($result, $regex);
    $array[] = $imgs[1][0];

    //标题
    $reg = '/<p class="drName">(.*)<\/p>/';
    $names = fetchData($result, $reg);
    $array[] = addslashes(mysqli_escape_string(Db::getInstance()->connect(), $names[1][0]));

    //简介
    $reg = '/<p class="bottom" style=".*">
			<span style=".*">品牌简介：<\/span>(.*)
		<\/p>/s';
    $descData = fetchData($result, $reg);
    $array[] = addslashes(mysqli_escape_string(Db::getInstance()->connect(), $descData[1][0]));

    $results[$k] = $array;
}
var_dump($results);
for ($i = 0; $i < count($results); $i++) {
    $results[$i][] = $brandids[$i];
}
echo '<hr />';
var_dump($results);
//var_dump($errors);
//var_dump($info);

$sql = createSingleSQL($results, 'ucshop_brand', array('brand_logo', 'brand_name', 'brand_summary', 'brand_id'));
echo $sql;
$insert = insertData($sql);
var_dump($insert);
if ($insert) {
    echo '数据插入成功';
} else {
    echo '数据插入失败(数据可能已经插入): SQL:<br /><code>' . $sql . '</code>';
}
