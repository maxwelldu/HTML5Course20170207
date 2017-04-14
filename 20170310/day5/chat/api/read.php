<?php
header("Content-Type: application/json");
$conn = mysqli_connect("localhost",  'duchengj_web6', '123456', 'duchengj_web6');
mysqli_query($conn, "SET NAMES UTF8");
$sql = "SELECT * FROM dcj_chat ORDER BY id DESC LIMIT 50";
$result = mysqli_query($conn, $sql);
$avatars = array(
"https://a-ssl.duitang.com/uploads/item/201511/19/20151119131827_Tv4tR.thumb.224_0.gif",
"https://a-ssl.duitang.com/uploads/item/201511/02/20151102144937_EdTAn.thumb.224_0.gif",
"https://a-ssl.duitang.com/uploads/item/201510/21/20151021094448_ikzYy.thumb.224_0.gif",
"https://a-ssl.duitang.com/uploads/item/201412/07/20141207175028_BdudU.thumb.224_0.gif"
);
$arr = array('result' => array(), 'avatars' => $avatars);

while($row = mysqli_fetch_array($result)) {
    $row['create_time'] = date('Y-m-d H:i', $row['create_time']);
    array_push($arr['result'], $row);
}
$json = json_encode($arr);
print_r($json);
mysqli_close($conn);
