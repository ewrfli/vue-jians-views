<template>
    <el-container>
        <el-header>
          <div class="sys-title">jians后台管理系统</div>
          <div class="header-right">
            <span>首页</span>
            <i class="el-icon-location"></i>
            <span>admin</span>
            <span>退出</span>
          </div>
        </el-header>
        <el-container>

            <el-aside width="200px">
              <el-menu>
                <el-submenu index="1"> 
                  <template #title>
                    <span>个人中心</span>
                  </template>
                  <el-menu-item>个人资料</el-menu-item>
                  <el-menu-item>修改密码</el-menu-item>
                </el-submenu>

                <el-submenu index="2">
                  <template #title>
                    <span>文章管理</span>
                  </template>
                  <el-menu-item>发布文章</el-menu-item>
                  <el-menu-item>文章列表</el-menu-item>
                </el-submenu>

                <el-menu-item>
                  <template #title>
                    <span>评论管理</span>
                  </template>
                </el-menu-item>

                <el-menu-item>
                  <template #title>
                    <span>粉丝管理</span>
                  </template>
                </el-menu-item>

                <el-menu-item>
                  <template #title>
                    <span>点赞管理</span>
                  </template>
                </el-menu-item>
              </el-menu>
            </el-aside>

            <el-container>
                <el-main>Main</el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.el-container {
    width: 100%;
    height: 100%;
    .el-aside {
        background-color: aquamarine;
    }
    .el-header {
        background-color: palevioletred;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .el-main {
        background-color: powderblue;
    }
    .el-footer {
        background-color: rebeccapurple;
    }
}
</style>
