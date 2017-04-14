<?php
//得到内容
$username = $_POST['username'];
$email = $_POST['email'];
$content = $_POST['content'];
$create_time = time();
//连接数据库
$conn = mysqli_connect('localhost', 'duchengj_web6', '123456', 'duchengj_web6');
mysqli_query($conn, "SET NAMES UTF8");
//组装SQL语句
$sql = "INSERT INTO dcj_liuyanben (username, email, content, create_time)
VALUES('{$username}', '{$email}', '{$content}', '{$create_time}')";
//执行插入数据库操作
$result = mysqli_query($conn, $sql);
//判断是否插入成功
if ($result == 1) {
    echo '{"result":"ok"}';
} else {
    echo '{"result":"wrong"}';
}
//关闭数据库
mysqli_close($conn);
