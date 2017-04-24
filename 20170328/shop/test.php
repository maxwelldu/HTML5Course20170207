<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<form action="api_userinfo.php?format=json&status=upload" method="post" enctype="multipart/form-data" >
    name: <input type="text" name="username" value="" /><br>
    <input type="hidden" name="MAX_FILE_SIZE" value="1000000" />
    up pic: <input type="file" name="pic[]" value=""><br>
    up pic: <input type="file" name="pic[]" value=""><br>
    up pic: <input type="file" name="pic[]" value=""><br>
    up pic: <input type="file" name="pic[]" value=""><br>

    <input type="submit" value="upload" /><br>

</form>
</body>
</html>

<?php
//测试DB
/*
include_once('db.php');
$connect = Db::getInstance()->connect();
$sql = "SELECT * FROM ucshop_user";
$result = mysqli_query($connect, $sql);
echo "测试数据库连接后查询数据是否正常,结果是查询出来的结果条数<br />" . mysqli_num_rows($result) . '<br /><hr />';

//测试Response
include_once('response.php');
$data = array('a'=>'b', 'c'=>'d');
//Response::show(200,'test',$data);

//测试Common
include_once('common.php');

class User extends Common
{
    public function checkUnique($username)
    {
        $mysqli_stmt = $this->_connect->stmt_init();
        if ($mysqli_stmt->prepare("SELECT `user_id` FROM `ucshop_user` WHERE `username`=? LIMIT 1")) {
            $mysqli_stmt->bind_param('s', $username);
            $mysqli_stmt->execute();
            $mysqli_stmt->bind_result($user_id);
            $mysqli_stmt->fetch();
            $mysqli_stmt->close();
            if ($user_id) {
                return Response::show(CODE_EXISTS, 'username is exists');
            }
        }
    }
}
$user = new User();
$r = $user->checkUnique('maxwelldu');
var_dump($r);
*/
?>
