<?php
session_start();
$username = $_POST['username'];

/*
//正则验证
if (preg_match("/[\<\>]/", $username)) {
    echo "0";
    exit;
}
if (trim($username) == ""){
    echo "0";
    exit;
}
$students = array("付荣", "王亚倩", "焦梦婷", "邵晨",
"刑养龙", "周聪", "聂晓茹", "刘阳", "胡雁龙", "周翔",
"李恒光", "程晨", "张小琛", "李盘军", "杜老师");
*/
//if (!in_array($username, $students)) {
//    echo "0";
//    exit;
//}

$_SESSION['username'] = $username;

echo "1";