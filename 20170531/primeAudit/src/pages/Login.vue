<template>
  <div style="top:55%;" class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <div>
                <img alt="image" src="static/img/logo_biradar.png">
            </div>
            <br>
            <h3>欢迎来到蓝太平洋云平台</h3>
            <p>
                及时“看到”数据，快速“读懂”数据，
            <br>对企业及时决策决策提供数据支撑。
                <!--Continually expanded and constantly improved Inspinia Admin Them (IN+)-->
            </p>
            <p><small>请输入您的用户信息来登入系统。</small></p>
			<form  name="myform" @submit.prevent="handleSubmit2" >
	        <!--<form  class="form-horizontal"  :model="ruleForm2" :rules="rules2" ref="ruleForm2" >-->
                <div class="form-group">
                	<label class="sr-only" for="inputUser">用户账号</label>
				    <div class="input-group">
				      <div class="input-group-addon">
				      	<span class="glyphicon glyphicon-user" aria-hidden="true"></span>
				      </div>
				      <input type="text" class="form-control" name="username" id="inputUser" placeholder="用户名" required="" v-model="ruleForm2.account" auto-complete="off">
				    </div>
                </div>
                <div class="form-group">
                	<label class="sr-only" for="inputPassword">至少6位</label>
				    <div class="input-group">
				      <div class="input-group-addon">
				      	<span class="glyphicon glyphicon-lock" aria-hidden="true"></span>
				      </div>
				      <input type="password" class="form-control" name="password" id="inputPassword" placeholder="密码" required=""  v-model="ruleForm2.checkPass" auto-complete="off">
				      <div class="input-group-addon">
				      	<span class="glyphicon glyphicon-envelope" aria-hidden="true" onclick="javascript:window.location.href='auth/verifyEmail'" style="cursor:pointer" title="忘记密码? 请点击这里"></span>
				      </div>
				    </div>
                </div>
                <div class="form-group" style="margin-bottom: 0px; display: none;" id="inputCaptcha">
                	<label class="sr-only" for="inputAuth">验证码</label>
                	<div class="col-sm-7" style="padding:0px">
					    <div class="input-group">
					      <div class="input-group-addon">
					      	<span class="glyphicon glyphicon-transfer" aria-hidden="true"></span>
					      </div>
					      <input type="text" class="form-control" name="captcha" id="inputAuth" placeholder="验证码">
					    </div>
					</div>
					<div class="col-sm-5">
	                    <img title="看不清，换一张" id="img_captcha" onclick="refreshCaptcha();" style="cursor:pointer" src="auth/captcha">
					</div>
                </div>
                <div id="errorMessage">
                	<label class="control-label" style="margin-bottom:5px;"><font color="red" style="font-weight:200"></font></label>
                </div>
				<div class="form-group">
                	<button type="submit"  class="btn btn-primary block full-width" >登  录</button>
                </div>

                <!--<a href="auth/verifyEmail"><small>忘记密码? 请点击这里</small></a>
                <p class="text-muted text-center"><small>Do not have an account?</small></p>
                <a class="btn btn-sm btn-white btn-block" href="register.html">Create an account</a>-->
            </form>
            <p class="m-t"><small><a href="">京ICP证00000001号-1</a></small><br><small>Copyright ©1991-2017 BluePacific Cloud Platfrom. All Rights Reserved</small> </p>
        </div>
    </div>
</template>

<script>
  import { requestLogin } from '../api/api';
  import NProgress from 'nprogress'
  export default {
    data() {
      return {
		myform: {},
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleSubmit2(ev) {
			var _this = this;
			//_this.$router.replace('/table');
			this.logining = true;
			NProgress.start();
			var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
			requestLogin(loginParams).then(data => {
			  this.logining = false;
			  NProgress.done();
			  let { msg, code, user } = data;
			  if (code !== 200) {
				this.$notify({
				  title: '错误',
				  message: msg,
				  type: 'error'
				});
			  } else {
				sessionStorage.setItem('user', JSON.stringify(user));
				this.$router.push({ path: '/topiclist' });
			  }
			});
			return false;
      }
    }
  }

</script>

<style lang="scss" scoped>
  .loginscreen{
	h3{font-size: 16px;}
	p{font-size:13px; color:#676a6c;}
  }
  .btn-primary{background-color: #1ab394;border-color: #1ab394;color: #FFFFFF;width:100%;}
  .btn-primary:hover{background-color: #18a689;border-color: #18a689;color: #FFFFFF;}
  .middle-box{left: 50%; height: 400px;position: absolute;z-index: 100;}
  .loginscreen.middle-box {width: 300px;margin-left: -150px;margin-top: -330px;}
  .btn-primary:focus, .btn-primary:active, .btn-primary.active, .open .dropdown-toggle.btn-primary {
    background-color: #18a689;
    border-color: #18a689;
    color: #FFFFFF;}
</style>
