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
$con = mysqli_connect("localhost","root","","mydb");
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}
//更改数据操作字符集
mysqli_query($con, "SET NAMES UTF8");
//是执行SQL语句，就把检索结果放到$result变量中
$result = mysqli_query($con, "SELECT * FROM xinwen");
//循环读取
while($row = mysqli_fetch_array($result))
{
    echo "<a href='12_news.php?id={$row['id']}'>";
    echo $row['title'];
    echo "</a>";
    echo "<br />";
}
//关闭数据库
mysqli_close($con);
?>
</body>
</html>