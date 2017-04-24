<?php
$title = $_GET['title'];
$date = $_GET['date'];
$content = $_GET['content'];

//连接数据库
$conn = mysqli_connect('localhost', 'root','','mydb');
//设置操作字符集
mysqli_query($conn, "SET NAMES UTF8");
//执行一条SQL语句，插入数据库
$sql = "INSERT INTO xinwen
(title,date,content) VALUES('{$title}', '{$date}',
'{$content}')";
echo $sql;
$result = mysqli_query($conn, $sql);

if ($result == 1) {
    echo "数据成功插入";
} else {
    echo "数据错误，请联系管理员";
}
mysqli_close($conn);
