<template>
    <div class="login">
        <el-card>
            <div class="login-title">jians后台管理系统</div>
            <el-form>
                <el-form-item>
                    <el-input placeholder="请输入用户名" v-model="name"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-input type="password" placeholder="请输入密码" v-model="password"></el-input>
                </el-form-item>

                <el-form-item class="button-div">
                    <el-button type="primary">登录</el-button>
                    <el-button type="success">注册</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
          name: '',
          password: ''
        };
    },
    methods: {},
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
