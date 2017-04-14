<?php
$order = 1;
if (isset($_GET['order'])) {
    $order = $_GET['order'];
}
$conn = mysqli_connect('localhost', 'duchengj_web6', '123456', 'duchengj_web6');
mysqli_query($conn, "SET NAMES UTF8");
if ($order == 1) {
    $sql = "SELECT * FROM dcj_liuyanben";
} else {
    $sql = "SELECT * FROM dcj_liuyanben ORDER BY id DESC";
}
$result = mysqli_query($conn, $sql);
$arr = array('result' => array());
while($row = mysqli_fetch_array($result)) {
    array_push($arr['result'], $row);
}
$json = json_encode($arr);
echo $json;
mysqli_close($conn);