<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title"><img :src="logLogoUrl"></img></h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import * as Constants from '../common/constants';
  import getApi from '../api/api';
  const { userLogin } = getApi(Constants.USER)

  export default {
    data() {
      return {
        logLogoUrl: require('@/assets/loginlogo.png'),
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { email: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            userLogin(loginParams).then(_data => {
              this.logining = false;
              let { msg, success, data } = _data.data;
              if (success) {
                sessionStorage.setItem('user', JSON.stringify(data));
                this.$router.push({ path: '/cunzhuang' });
                window.location.reload();
              } else {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              }
              console.info(data)
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 20px auto;
      text-align: center;
      color: #505458;

      img {
        width: 300px;
      }
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>