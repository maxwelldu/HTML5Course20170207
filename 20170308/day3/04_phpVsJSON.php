<?php
//    $a = array(1,2,3);
//    $b = json_encode($a);
//    print_r($a);
//    print_r($b);
//
//    $a = array(
//        "name" => "付荣",
//        "age" => 18,
//        "qqhao" => 110
//    );
//    $b = json_encode($a);
//    print_r($b);
?>
<?php
    $con = mysqli_connect('localhost','root','', "mydb");
    mysqli_query($con, "SET NAMES UTF8");
    $sql = "SELECT * FROM xinwen";
    $arr = array();
    $result = mysqli_query($con, $sql);
    while($row = mysqli_fetch_array($result)) {
        array_push($arr, $row);
    }
    $json = json_encode($arr);
    print_r($json);
?>
