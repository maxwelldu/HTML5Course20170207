<?php
$id = $_GET['id'];
$conn = mysqli_connect('localhost', 'duchengj_web6', '123456', 'duchengj_web6');
mysqli_query($conn, "SET NAMES UTF8");
$sql = "DELETE FROM dcj_liuyanben WHERE id = {$id}";
$result = mysqli_query($conn, $sql);
if ($result == 1) {
    echo 'ok';
} else {
    echo 'wrong';
}
mysqli_close($conn);
