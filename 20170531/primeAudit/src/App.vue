<template>
	<div id="app" class="container">
		<nav class="navbar navbar-default navbar-static-top" role="navigation">
            <!--左侧title-->
			<div class="navbar-header">
            <span><img alt="image" src="static/img/logo.png"></span>
      </div>
			<!--右侧导航-->

			<!--消息类提醒开始-->
			<ul class="nav navbar-top-links navbar-right UserMenu">
				<li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
							<el-badge :value="12" class="item userMesg">
								<i class="fa fa-envelope fa-fw msgicon"></i>
							</el-badge>
            </a>
            <ul class="dropdown-menu dropdown-messages">
                <li>
                    <a href="#">
                        <div>
                            <strong>Hi Smith</strong>
                            <span class="pull-right text-muted">
                                <em>昨天</em>
                            </span>
                        </div>
                        <div>大海科技有限公司财务信息需要您及时处理...</div>
                    </a>
                </li>
                <li class="divider"></li>
                <li>
                    <a href="#">
                        <div>
                            <strong>Hi Smith</strong>
                            <span class="pull-right text-muted">
                                <em>前天</em>
                            </span>
                        </div>
                        <div>大海科技有限公司财务信息需要您及时处理...</div>
                    </a>
                </li>
                <li class="divider"></li>
                <li>
                    <a class="text-center" href="#">
                        <strong>阅读所有信息</strong>
                        <i class="fa fa-angle-right"></i>
                    </a>
                </li>
            </ul>
            <!-- /.dropdown-messages -->
        </li>
				<li class="dropdown user UserInfo">
	              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
	                <!-- The user image in the navbar-->
	                <img src="static/img/user1-128x128.jpg" class="userImage" alt="User Image">
	                <span class="hiddenXs">Smith</span>
									<i class="fa fa-caret-down"></i>
	              </a>
								<ul class="dropdown-menu dropdown-user">
                        <li><a href="#"><i class="fa fa-user fa-fw"></i> 个人资料</a>
                        </li>
                        <li><a href="#"><i class="fa fa-gear fa-fw"></i> 设置</a>
                        </li>
                        <li class="divider"></li>
                        <li><a href="/#/login"><i class="fa fa-sign-out fa-fw"></i> 退出登录</a>
                        </li>
                </ul>
	       </li>
			</ul>
			<ul class="nav navbar-top-links navbar-right textMenu">
				<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
					<li v-if="item.path == $route.path" class="navList active" :data="item.path">
						<a v-if="item.leaf" href="javascript:void(0);" v-on:click="repath(item.path)">
							{{item.name}}
						</a>
						<span class="linkBottom" style="width:100%;" :data="item.path"></span>
					</li>
					<li v-else class="navList" :data="item.path">
						<a v-if="item.leaf" href="javascript:void(0);" v-on:click="repath(item.path)">
							{{item.name}}
						</a>
						<span class="linkBottom" :data="item.path"></span>
					</li>
				</template>
      </ul>
			<!--消息类提醒结束-->
		</nav>
		<!--下面大容器开始-->
		<section class="contentContainer">
		<div class="grid-content bg-purple-light">
			<el-col :span="24" class="content-wrapper">
				<transition>
					<router-view></router-view>
				</transition>
			</el-col>
		</div>
		<div style="clear:both;"></div>
	</section>
		<!--下面大容器结束-->
	</div>
</template>

<script>
	import bootstrap from 'sbAdmin/js/bootstrap.min.js'
	import sbAdmin from 'sbAdmin/js/sb-admin-2.min.js'

	export default {
		name: 'app',
		data() {//绑定属性
			return {

			}
		},
		methods: {//methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用
			//退出登录
			logout: function () {

			},
			//模拟A跳转实现路由
			repath: function (path) {
				var _this = this;
				if(path != '/')
				{//路由开始添加样式
					//下部动画效果
					$(".linkBottom").each(function(){
						 	if($(this).attr('data') == path)
							{
								$(this).animate({
							      width:'100%',
							    });
							}
							else{
								$(this).animate({
							      width:'0px',
							    });
							}

					 });
					 //字体加粗
					 $(".navList").each(function(){
 						 	if($(this).attr('data') == path)
 							{
 								$(this).addClass('active');
 							}
 							else{
 								$(this).removeClass('active');
 							}

 					 });

					_this.$router.push(path);
				}
				else
					return false;
			},
			//控制左侧导航样式收缩

		},
		mounted() {//钩子函数当实例被创建的时候进行调用[仅仅导航栏构建的时候创建了一次]
		}
	}
</script>

<style lang="scss">
.container {width: 100%;padding: 0px;
	.navbar{margin-bottom: 0;width:100%;background: #1dbba4;height: 70px;position: fixed;min-width: 1280px; max-width: 1920px;/*width: 1280px;*/margin-left: auto; margin-right: auto;
		.textMenu{height: 70px;
			.active{font-weight: bold;opacity: 1;}
			.linkBottom{display:block;background-color:#fff; width:0px;height:4px;margin: 0px auto;}
		}
		.textMenu li{margin: 0px 20px;margin-top: 15px;/*opacity: 0.8*/;opacity: 1;}
		.textMenu li:hover{opacity: 1;}
		.textMenu li a{line-height: 40px; color:#ffffff;padding: 0px;font-size: 16px;font-family:"Microsoft YaHei",Arial,Helvetica,sans-serif,"宋体";}
		.textMenu a:hover{background-color: #1dbba4;}
		.textMenu a:visited{background-color: #1dbba4;}
		.textMenu a:active {background-color: #1dbba4;}
		/**用户菜单部分**/
		.UserMenu {color: #ffffff;
			.userImage{width:30px; height: 30px; border-radius: 15px;}
			.msgicon{color: #ffffff;font-size:20px;}
			.hiddenXs{color: #ffffff;}
			.userMesg{height: 28px;margin-top: 10px;color:#ffffff;}
		}
		.UserMenu a:hover{background-color: #1dbba4;}
		.UserMenu a:visited{background-color: #1dbba4;}
		.UserMenu a:active {background-color: #1dbba4;}
		.nav > li > a:focus, .nav > li > a:hover,nav > li > a:active{background-color: #1dbba4}
		.nav .open>a, .nav .open>a:focus, .nav .open>a:hover{background-color: #1dbba4;}
	}
	.contentContainer{
    background-color: #f0f0f0;
    margin-top:70px;
	}
}
</style>
