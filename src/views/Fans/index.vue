<template>
  <div>
    <div>
      <span style="margin-right: 20px;">粉丝列表</span> 
      <!-- Form -->
      <el-button @click="dialogFormVisible = true">添加粉丝</el-button>
      <el-dialog title="添加粉丝" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="作者" :label-width="formLabelWidth">
            <el-input v-model="form.author" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="时间" :label-width="formLabelWidth">
            <el-input v-model="form.createTime" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    
    </div>
    
    <el-table :data="fans" style="width: 100%">
      <el-table-column label="用户" prop="username"></el-table-column>
      <el-table-column label="作者" prop="author"></el-table-column>
      <el-table-column label="关注时间：" prop="createTime"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="update(scope.row)" type="primary" size="mini">编辑</el-button>
          <el-button @click="del(scope.row)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

      <!-- 分页 -->
      <el-pagination
        background
        layout="prev,pager,next"
        :total="count"
        :page-size="pageSize"
        :current-page="page"
        @current-change="changePage">
      </el-pagination>
  </div>
</template>

<script>
export default {
  data(){
    return {
      fans: [],
      page: 1,
      pageSize: 0,
      count: 0,
      dialogFormVisible: false,
      form: {
        username: '',
        author: '',
        createTime: '',
      },
      formLabelWidth: '50px'
    }
  },
  created(){
    this.getData()
  },
  methods: {
    getData(){
      this.$http({
        path: '/fans/findall',
        method: 'post',
        params: {
          page: this.page,
          author: this.$store.state.user.username
        }
      }).then(res=>{
        this.fans = res.data.result
        this.page = res.data.page
        this.pageSize = res.data.pageSize
        this.count = res.data.count
      })
    },
    changePage(page){
      this.page = page
      this.getData()
    },

  }
}
</script>

<style lang="less" scoped>
.fans-list{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
