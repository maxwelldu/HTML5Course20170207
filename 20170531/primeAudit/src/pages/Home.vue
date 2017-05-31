<template>
	<div class="container">
		
	</div>
</template>


<script>
	import bootstrap from 'sbAdmin/js/bootstrap.min.js'
	import sbAdmin from 'sbAdmin/js/sb-admin-2.min.js'

	export default {
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

<style scoped lang="scss">

</style>
