<?php
	$id = $_GET["id"];
	//创建一个连接。连接哪个数据库服务器、用户名、密码
	$conn = mysqli_connect("localhost","root","", "mydb");

	//设置一下字符集 mysql_query就是执行SQL的意思
	mysqli_query($conn, "SET NAMES UTF8");

	//查找最新5条的新闻，按照id倒序
	$result = mysqli_query($conn, "SELECT * FROM xinwen WHERE id = {$id}");

	$row = mysqli_fetch_array($result);
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>博雅游戏</title>
	<link rel="stylesheet" type="text/css" href="css/reset.css" />
	<link rel="stylesheet" type="text/css" href="css/base.css" />
	<link rel="stylesheet" type="text/css" href="css/common.css" />
	<link rel="stylesheet" type="text/css" href="css/game.css" />
	<style type="text/css">
		h3{
			font-size:40px;
			text-align: center;
		}
	</style>
</head>
<body>
	<!-- 头部 -->
	<div class="header">
		<div class="inner_c">
			<div class="logo">
				<h1>
					<a href="#">博雅互动-专业游戏网站</a>
				</h1>
			</div>
			<div class="nav">
				<ul>
					<li class="first current">
						<a href="">首页</a>
					</li>
					<li>
						<a href="">博雅游戏</a>
					</li>
					<li>
						<a href="">博雅新闻</a>
					</li>
					<li>
						<a href="">关于我们</a>
					</li>
					<li>
						<a href="">客服中心</a>
					</li>
					<li>
						<a href="">投资者关系</a>
					</li>
				</ul>
			</div>
			<div class="joinus">
				<a href="">加入我们</a>
			</div>
		</div>
	</div>

	<div class="cb"></div>

	<!-- banner -->
	<div class="banner">
		<img src="images/gamebanner.jpg" alt="" />
	</div>

	<div class="cb"></div>

	<!-- 内容 -->
	<div class="content inner_c">
		<div class="content_hd">
			<h3>博雅游戏</h3>
			<div class="breadNav">
				<!-- 注意下面这个a里面有房子，别删了！！ -->
				<a href=""></a>
				<span>博雅游戏</span>
				<span>博雅游戏</span>
				<span>博雅游戏</span>
				<span>博雅游戏</span>
			</div>
		</div>
		<div class="content_bd">
			<div class="menu">
				<ul>
					<li>
						<a href="" class="current"> <b class="iphone"></b>
							iPhone
						</a>
					</li>
					<li>
						<a href=""> <b class="android"></b>
							Android
						</a>
					</li>
					<li>
						<a href="">
							<b class="ipad"></b>
							iPad
						</a>
					</li>
					<li>
						<a href="">
							<b class="pc"></b>
							PC
						</a>
					</li>
					<li>
						<a href="">
							<b class="tv"></b>
							TV
						</a>
					</li>
				</ul>
			</div>
			<div class="main">
				<h3><?php echo $row["title"]; ?></h3>
				<h5 style="padding-top:20px;">发布日期：<?php echo $row["date"]; ?></h5>

				<div class="neirong" style="padding-top:40px;">
					<?php echo $row["content"]; ?>
				</div>
			</div>
		</div>
	</div>
	
	<div class="shengming">
		<div class="inner_c">
			<p>申明：所有游戏均由深圳市东方博雅科技游戏公司所研发，游戏中使用到的游戏币、博雅币等均为游戏道具，不具有任何财产性功能，只限用户本人在游戏中使用。</p>
			<p>本公司对于用户所拥有的游戏币、博雅币不提供任何形式的官方回购、直接或变相兑换现金或实物，相互赠予转让等服务及相关功能。</p>
			<p>本公司严禁用户之间在游戏中及线下进行任何相互叫卖、转让游戏币等行为，如一经查出则永久封杀，账户清零。</p>


		</div>
		
	</div>

	<div class="cl"></div>

	<!-- 页脚 -->
	<div class="footer">
		<div class="inner_c">
			<div class="links">
				<a href="#">网站地图</a>
				<span>|</span>
				<a href="#">免责声明</a>
			</div>
			<div class="copyright">
				Copyright © 2004 - 2016 博雅互动(Boyaa Interactive) 
				<a href="">粤ICP备05062536号</a>
				增值电信业务经营许可证：粤B2-20110513
				<img src="images/govIcon.gif" alt="" class="govicon" />
			</div>
		</div>
	</div>
</body>
</html>