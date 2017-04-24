<?php
require_once('./response.php');
$arr = array(
  'id' => 1,
  'name' => 'max'
)
Response::json(200, "数据返回成功", $arr)

require_once('./file.php');
$file = new File();
if($file->cacheData('index_mk_cache',$data)) {
  var_dump($file->cacheData('index_mk_cache'));exit;
  echo 'success';
} else {
  echo 'error';
}

$file->cacheData('index_mk_cache', null);
