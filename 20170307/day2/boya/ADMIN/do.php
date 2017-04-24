<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>Document</title>
</head>
<body>
	<?php
		$biaoti = $_POST["biaoti"];
		$riqi = $_POST["riqi"];
		$neirong = $_POST["neirong"];

		//创建一个连接。连接哪个数据库服务器、用户名、密码
		$conn = mysqli_connect("localhost","root","", "mydb");

		//设置一下字符集 mysql_query就是执行SQL的意思
		mysqli_query($conn, "SET NAMES UTF8");

		//执行插入
		$result = mysqli_query($conn, "INSERT INTO xinwen (title,date,content) VALUES ('{$biaoti}','{$riqi}','{$neirong}')");

		echo "发布成功";
		

		//关闭数据库
		mysqli_close($conn);
	?>
</body>
</html>