<?php
/**
 * Created by PhpStorm.
 * User: sks
 * Date: 2017/3/9
 * Time: 10:01
 */
$a = file_get_contents("php://input");
print_r($a);

print_r($_POST);
echo "服务器接受到参数" . $_POST['name'] . $_POST['age'];