<?php

// 让crontab定时执行的脚本程序     */5 * * * * /usr/bin/php /data/www/app/cron.php

require_once('./db.php');
require_once('./file.php');

$sql = "SELECT * FROM ucshop_goods WHERE status = 1 ORDER BY orderby DESC";
try {
	$connect = Db::getInstance()->connect();
} catch(Exception $e) {
	file_put_contents('./logs/'.date('y-m-d') . '.txt' , $e->getMessage());
	return;
}
$result = mysqli_query($connect, $sql);
$goods = array();
while($good = mysqli_fetch_assoc($result)) {
	$goods[] = $good;
}
$file = new File();
if($goods) {
	$file->cacheData('cache_cron_goods', $goods);
} else {
	file_put_contents('./logs/'.date('y-m-d') . '.txt' , "没有相关数据");
}
return;
