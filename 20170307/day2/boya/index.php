<?php
	//创建一个连接。连接哪个数据库服务器、用户名、密码
	$conn = mysqli_connect("localhost","root","", "mydb");

	//设置一下字符集 mysql_query就是执行SQL的意思
	mysqli_query($conn, "SET NAMES UTF8");

	//查找最新5条的新闻，按照id倒序
	$result = mysqli_query($conn, "SELECT * FROM xinwen ORDER BY id DESC LIMIT 5");
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>博雅互动</title>
	<link rel="stylesheet" type="text/css" href="css/reset.css" />
	<link rel="stylesheet" type="text/css" href="css/base.css" />
	<link rel="stylesheet" type="text/css" href="css/common.css" />
	<link rel="stylesheet" type="text/css" href="css/index.css" />
</head>
<body>
		<!-- 头部 -->
	<div class="header">
		<div class="inner_c">
			<div class="logo">
				<h1><a href="#">博雅互动-专业游戏网站</a></h1>
			</div>
			<div class="nav">
				<ul>
					<li class="first current"><a href="">首页</a></li>
					<li><a href="">博雅游戏</a></li>
					<li><a href="">博雅新闻</a></li>
					<li><a href="">关于我们</a></li>
					<li><a href="">客服中心</a></li>
					<li><a href="">投资者关系</a></li>
					<li><a href="">校园大使</a></li>
				</ul>
			</div>
			<div class="joinus">
				<a href="">加入我们</a>
			</div>
		</div>
	</div>

	<div class="cl"></div>
	
	<!-- banner -->
	<div class="banner">
		<img src="images/banner1.jpg" alt="" />
		<div class="circles">
			<ol>
				<li class="cur"></li>
				<li></li>
				<li></li>
				<li class="nomargin"></li>
			</ol>
		</div>
	</div>

	<div class="cl"></div>
	
	<!-- 产品 -->
	<div class="product inner_c">
		<ul>
			<li>
				<a href="">
					<img src="images/pro1.png" alt="" />
					<span class="c">四川麻将</span>
					<span class="e"><b>SICHUAN MAJIANG</b></span>
				</a>
			</li>
			<li>
				<a href="">
					<img src="images/pro1.png" alt="" />
					<span class="c">四川麻将</span>
					<span class="e"><b>SICHUAN MAJIANG</b></span>
				</a>
			</li>
			<li>
				<a href="">
					<img src="images/pro1.png" alt="" />
					<span class="c">四川麻将</span>
					<span class="e"><b>SICHUAN MAJIANG</b></span>
				</a>
			</li>
			<li class="nomargin last">
				<a href="">
					<img src="images/pro1.png" alt="" />
					<span class="c">四川麻将</span>
					<span class="e"><b>SICHUAN</b></span>
				</a>
			</li>
		</ul>
		<div class="circles">
			<ol>
				<li class="cur"></li>
				<li></li>
				<li></li>
				<li class="nomargin"></li>
			</ol>
		</div>	
	</div>

	<div class="cl"></div>

	<!-- 信息 -->
	<div class="information">
		<div class="inner_c">
			<div class="news">
				<div class="hd">
					<h3>博雅新闻</h3>
					<a href="" class="more">MORE <sup>+</sup></a>
				</div>
				<div class="bd">
					<ul>
						<?php
							while($row = mysqli_fetch_array($result)){
						?>
							<li class="first">
								<span class="date"><?php echo $row["date"]; ?></span>
								<span class="title">
									<a target="_blank" href="news.php?id=<?php echo $row["id"]; ?>"><?php echo $row["title"]; ?></a>
								</span>
							</li>
						<?php
							}
						?>
					</ul>
				</div>
			</div>
			<div class="jobs">
				<div class="hd">
					<h3>
						<span class="c">专场招聘</span>
						<span class="e">BOYAA JOBS</span>
					</h3>
					<a href="" class="more">MORE <sup>+</sup></a>
				</div>
				<div class="bd">
					<h4>专场招聘岗位：</h4>
					<ul>
						<li><a href="">PHP开发工程师</a></li>
						<li><a href="">PHP开发工程师</a></li>
						<li><a href="">PHP开发工程师</a></li>
						<li><a href="">PHP开发工程师</a></li>
					</ul>
				</div>
			</div>
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