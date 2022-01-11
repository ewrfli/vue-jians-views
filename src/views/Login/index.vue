<template>
    <div class="login">
        <el-card>
            <div class="login-title">jians后台管理系统</div>
            <el-form>
                <el-form-item>
                    <el-input placeholder="请输入用户名" v-model="username"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-input type="password" placeholder="请输入密码" v-model="pwd" @keyup.enter.native="clickLogin"></el-input>
                </el-form-item>

                <el-form-item class="button-div">
                    <el-button type="primary" @click="clickLogin" @keyup.enter.native="clickLogin">登录</el-button>
                    <el-button type="success" @click="clickRegister">注册</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            pwd: '',
            state: true, //按钮状态，true为登录，false为注册
        };
    },
    methods: {
        clickLogin(){
            this.state = true
            this.logApi()
        },
        clickRegister(){
            this.state = false
            this.logApi()
        },
        logApi(){
            if(this.username !=='' && this.pwd !==''){
                this.$http({
                    path: this.state ? "/users/login" : "/users/register",
                    method: "post",
                    params: {
                    username: this.username,
                    pwd: this.pwd,
                    },
                }).then((res) => {
                    console.log('login res',res)
                    if (res.data.code === 200 && this.state) {
                    localStorage.token = res.data.token;
                    this.$router.push({
                        path: "/admin",
                    });
                    }
                });
            }else{
                this.$message({
                message: '请输入用户名密码',
                type:  "error",
                });
            }
        }
    },
};
</script>

<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    background: url("../../assets/login-bg.jpg") no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-card {
      width: 400px;
    }
    .login-title {
        height: 40px;
        text-align: center;
    }

    .button-div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        .el-form-item__content {
            width: 50px;
        }
    }
}
</style>
