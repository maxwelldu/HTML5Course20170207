<?php
/**
 * Created by PhpStorm.
 * User: maxwell
 * Date: 17/3/17
 * Time: 下午10:16
 */

/**
 * 数据抓取相关函数
*/
/**
 * 获得数据
 * @param string $url URL地址
 * @return string
 */
function getContent($url) {
    return file_get_contents($url);
}
/**
 * 抓取网页中的数据
 * @param string $content 需要分析的数据
 * @param string $regex 需要提取的内容
 * @return mixed 返回数组
 */
function fetchData($content, $regex) {
    preg_match_all($regex, $content, $matches);
    return $matches;
}

/**
 * 数据库相关函数
 */
/**
 * 根据数据生成插入的SQL语句
 * @param array $data   数据
 * @param string $table 表名
 * @param array $fields 字段名数组
 * @return string   SQL语句
 */
function createSQL($data, $table, $fields) {
    $dataCount = count($data[0]);
    $fieldCount = count($fields);
    $fields = implode(',', $fields);
    $sql = "INSERT INTO {$table} ({$fields}) VALUES ";
    for($i=0; $i<$dataCount; $i++) {
        $items = array();
        for($j=1; $j<=$fieldCount; $j++) {
            $items[] = "'" . trim($data[$j][$i]) . "'";
        }
        $itemsString = implode(',', $items);
        $sql .= "({$itemsString}),";
    }
    $sql = rtrim($sql, ',');
    return $sql . ';';
}
function createSingleSQL($data, $table, $fields) {
    $sqls = "";
    $fields = implode(',',$fields);
   foreach($data as $d) {
       $values = implode("','", $d);
       $sqls .= "INSERT INTO {$table} ({$fields}) VALUES ('{$values}');";
   }
    return $sqls;
}

/**
 * 插入数据
 * @param string $sql SQL语句
 * @return bool|mysqli_result 插入成功与否
 * @throws Exception
 */
function insertData($sql)
{
    require_once('../db.php');
    try {
        $connect = Db::getInstance()->connect();
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    $result = mysqli_query($connect, $sql);
    if ($result) {
        return $result;
    } else {
        return mysqli_error($connect);
    }
}

/**
 * 获取商品分类数据
 * @return mixed
 */
function getCategoryData()
{
    //良仓的分类数据抓取
    $url = "http://www.iliangcang.com/i/shop/";
    $regex = '/cat_id="(\d+)">(.*)<span/';
    return fetchData(getContent($url), $regex);
}
function getLiangcangBannerData()
{
    $url = "http://www.iliangcang.com/";
    $regex = '/<li class="v2.*"[.\s]*>\s*<a href="(.*)" target="_blank">\s*<img src="(.*)"  target="_blank" alt="" title=""\/>/m';
    return fetchData(getContent($url), $regex);
}
function getLiangcangBrand()
{
    $url = "http://www.iliangcang.com/i/brand/";
//    $regex = '/<a class="tooltips" rel=".*" href="(\/i\/brand\/intro\/\?id=\d+)">.*<\/a>/';
    $regex = '/<a class="tooltips" rel=".*" href="\/i\/brand\/intro\/\?id=(\d+)">.*<\/a>/';
    return fetchData(getContent($url), $regex);
}
function getSamsungBannerData(){
    $url = "https://www.samsungshop.com.cn/";
    $regex = '';
    echo getContent($url);
    return fetchData(getContent($url), $regex);
}

/**
 * 文件保存当前页码
 */
/**
 * 保存当前的索引
 * @param $index
 */
function saveIndex($index) {
    file_put_contents('./index.txt', ++$index);
}

/**
 * 读取索引
 * @return string
 */
function readIndex() {
    if (!file_exists('./index.txt')) {
        touch('./index.txt');
    }
    $index =  file_get_contents('./index.txt');
    $index = empty($index) ? 0 : $index;
    saveIndex($index);
    return $index;
}