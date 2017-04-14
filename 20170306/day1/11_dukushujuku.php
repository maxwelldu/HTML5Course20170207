<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<?php
//是连接数据库，PHP和MySQL是黄金搭档，只需要一行命令，就能连接数据库
//数据库的用户名root, 密码是空
//$con 就是一个变量，表示一次连接
$con = mysql_connect("localhost","root","");
if (!$con) {
    die('Could not connect: ' . mysql_error());
}
//选择链接哪个数据库
mysql_select_db("mydb", $con);
//更改数据操作字符集
mysql_query("SET NAMES UTF8");
//是执行SQL语句，就把检索结果放到$result变量中
$result = mysql_query("SELECT * FROM xinwen");
//循环读取
while($row = mysql_fetch_array($result))
{
    echo "<a href='12_news.php?id={$row['id']}'>";
    echo $row['title'];
    echo "</a>";
    echo "<br />";
}
//关闭数据库
mysql_close($con);
?>
</body>
</html>