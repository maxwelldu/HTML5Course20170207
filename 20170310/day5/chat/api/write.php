<?php
session_start();
header("Content-Type: application/json");
$username = $_SESSION['username'];
$content = $_POST['content'];
$create_time = time();

if (preg_match("/[\<\>]/", $content)) {
    echo '{"result":"wrong"}';
    exit;
}

$conn = mysqli_connect("localhost",  'duchengj_web6', '123456', 'duchengj_web6');
mysqli_query($conn, "SET NAMES UTF8");
$sql = "INSERT INTO dcj_chat(username,content, create_time) VALUES ('{$username}', '{$content}', '{$create_time}')";
$result = mysqli_query($conn, $sql);
if ($result == 1) {
    echo '{"result":"ok"}';
} else {
    echo '{"result":"wrong"}';
}
mysqli_close($conn);
