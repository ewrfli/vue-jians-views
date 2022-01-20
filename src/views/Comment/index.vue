<template>
  <div>
    <div>收到的评论</div>
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
      count: 0
    }
  },
  created(){
    this.getData()
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
      this.$router.push({
        path: '/admin/comment/update',
        query: {
          _id: row._id
        }
      })
    },

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

