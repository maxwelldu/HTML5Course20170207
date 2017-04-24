<?php
/**
 * Created by PhpStorm.
 * User: maxwell
 * Date: 17/3/17
 * Time: 下午9:43
 */
include('./function.php');

$data = getCategoryData();
var_dump( $data);
$sql = createSQL($data, 'ucshop_category', array('cat_id', 'cat_name'));

if (insertData($sql)) {
    echo '数据插入成功';
} else {
    echo '数据插入失败(数据可能已经插入): SQL:<br /><code>' . $sql . '</code>';
}
