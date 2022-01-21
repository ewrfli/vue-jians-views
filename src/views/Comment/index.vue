<template>
  <div>
      <div>
        <span style="margin-right: 20px;">评论</span> 
        <!-- Form -->
        <el-button @click="dialogFormVisible = true">添加评论</el-button>
        <el-dialog title="添加粉丝" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="评论者" :label-width="formLabelWidth">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="评论内容" :label-width="formLabelWidth">
              <el-input v-model="form.commentContent" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="文章标题" :label-width="formLabelWidth">
              <el-input v-model="form.articleTitle" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="文章作者" :label-width="formLabelWidth">
              <el-input v-model="form.articleAuthor" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="评论时间" :label-width="formLabelWidth">
              <el-input v-model="form.commentCreateTime" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false, isUpdate= false" >取 消</el-button>
            <el-button  v-if="isUpdate" type="primary" @click="updateComment">更 新</el-button>
            <el-button v-else type="primary" @click="addComment">添 加</el-button>
          </div>
        </el-dialog>
      </div>

      <el-table :data="comments" style="width: 100%">
        <el-table-column label="用户" prop="username"></el-table-column>
        <el-table-column label="文章作者" prop="articleAuthor"></el-table-column>
        <el-table-column label="文章标题" prop="articleTitle"></el-table-column>
        <el-table-column label="评论内容" prop="commentContent"></el-table-column>
        <el-table-column label="评论时间：" prop="commentCreateTime"></el-table-column>
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
        @current-change="changePage"></el-pagination>
  </div>
</template>

<script>
export default {
  data(){
    return {
      comments: [],
      page:1,
      pageSize: 0,
      count: 0,
      dialogFormVisible: false,//dialog显示
      form: {//dialog 数据
        username: this.$store.state.user.username, //评论者
        articleTitle: '',
        articleAuthor: '',
        commentContent: '',
        commentCreateTime: '',
        // author: this.$store.state.user.username
      },
      formLabelWidth: '70px',
      isUpdate: false
    }
  },
  watch: {
    isUpdate(newVal) {
      console.log(newVal)
      if(newVal === false){
        let date = new Date()
        let CreateTime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        this.form = {
          username: this.$store.state.user.username, //评论者
          articleTitle: '',
          articleAuthor: '',
          commentContent: '',
          commentCreateTime: CreateTime,
        }
      }
    }
  },
  created(){
    this.getData()
     //初始值
    let date = new Date()
    this.form.commentCreateTime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  },
  methods: {
    getData(){
      this.$http({
        path: '/comment/findall',
        method: 'post',
        params: {
          page: this.page,
          // articleAuthor: this.$store.state.user.username
        }
      }).then(res=>{
        console.log(res.data.result)
        this.comments = res.data.result
        this.page = res.data.page
        this.pageSize = res.data.pageSize
        this.count = res.data.count
      })
    },
    changePage(page){
      this.page = page
      this.getData()
    },
        del(row){
      console.log('del',row)
      this.$confirm('确定要删除吗？','提示',{
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$http({
          path: '/comment/del',
          method: 'post',
          params: {
            _id: row._id
          }
        }).then(res=>{
          this.$message({
            message: res.data.msg,
            type: res.data.code === 200 ? 'success' : 'error'
          })
          if(res.data.code === 200){
            this.getData()
          }
        })
      }).catch(()=>{})
    },
    update(row){
      this.isUpdate = true
      this.dialogFormVisible = true
      console.log('row',row)
      this.form = row

    },
    addComment(){
      let params = {...this.form}
      console.log('params',params)
      this.$http({
        path: '/comment/add',
        method: 'post',
        params: params
      }).then(res=>{
        if(res.data.code === 200){
          this.dialogFormVisible = false
        }
      })
    },
    updateComment(){
      let params = {...this.form}
      console.log('params',params)
      this.$http({
        path: '/comment/update',
        method: 'post',
        params: params
      }).then(res=>{
        if(res.data.code === 200){
          this.dialogFormVisible = false
          console.log('更新成功')
          this.isUpdate = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.comment-list{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

