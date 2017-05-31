<template>
	<section>
		<h1 class="text-center text-danger">用户注册</h1><br>
			<form id="register-form" role="form" class="form-horizontal" method="get">
				<div class="form-group">
					<label class="col-sm-2 control-label" for="firstname">用户名：</label>
					<div class="col-sm-5">
						<input class="form-control" id="firstname" name="firstname" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label" for="password">密码：</label>
					<div class="col-sm-5">
						<input class="form-control" id="password" name="password" type="password" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label" for="confirm_password">确认密码：</label>
					<div class="col-sm-5">
						<input class="form-control" id="confirm_password" name="confirm_password" type="password" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label" for="email">E-Mail：</label>
					<div class="col-sm-5">
						<input class="form-control" id="email" name="email" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label" for="phone">手机号码：</label>
					<div class="col-sm-5">
						<input class="form-control" id="phone" name="phone" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label" for="tel">固定电话：</label>
					<div class="col-sm-5">
						<input class="form-control" id="tel" name="tel" />
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label" for="address">家庭住址：</label>
					<div class="col-sm-5">
						<input class="form-control" id="address" name="address" />
					</div>
				</div>
				<div class="form-group">
					<div class="col-md-offset-2 col-md-10">
						<button type="submit" class="btn btn-primary btn-sm">注册</button>
						<button type="reset" class="btn btn-primary btn-sm">重置</button>
					</div>
				</div>
			</form>
	</section>
</template>
<script>
import axios from 'axios';
import qs from 'qs';

import bootstrapValidator from 'sbAdmin/js/jquery.validate.js'
	export default {
		data() {//绑定属性
			return {

			}
		},
		methods: {//methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用
			//退出登录
		},
		mounted() {//钩子函数当实例被创建的时候进行调用[仅仅导航栏构建的时候创建了一次]






			$("#register-form").validate({
		errorElement : 'span',
		errorClass : 'help-block',

		rules : {
			firstname : "required",
			email : {
				required : true,
				email : true
			},
			password : {
				required : true,
				isPwd : true
			},
			confirm_password : {
				required : true,
				isPwd : true,
				equalTo : "#password"
			},
			phone : {
				required : true,
				isPhone : true
			},
			tel : {
				isTel : true
			},
			address : {
				minlength : 10
			}
		},
		messages : {
			firstname : "请输入姓名",
			email : {
				required : "请输入Email地址",
				email : "请输入正确的email地址"
			},
			password : {
				required : "请输入密码",
				minlength : jQuery.format("密码不能小于{0}个字 符")
			},
			confirm_password : {
				required : "请输入确认密码",
				minlength : "确认密码不能小于5个字符",
				equalTo : "两次输入密码不一致不一致"
			},
			phone : {
				required : "请输入手机号码"
			},
			tel : {
				required : "请输入座机号码"
			},
			address : {
				required : "请输入家庭地址",
				minlength : jQuery.format("家庭地址不能少于{0}个字符")
			}
		},
		errorPlacement : function(error, element) {
			element.next().remove();
			element.after('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
			element.closest('.form-group').append(error);
		},
		highlight : function(element) {
			$(element).closest('.form-group').addClass('has-error has-feedback');
		},
		success : function(label) {
			var el=label.closest('.form-group').find("input");
			el.next().remove();
			el.after('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
			label.closest('.form-group').removeClass('has-error').addClass("has-feedback has-success");
			label.remove();
		},
		submitHandler: function(form) {
			alert("submitted!");
		}

	})








		}
	}

</script>
