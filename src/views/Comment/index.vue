<template>
  <div>
    <div>收到的评论</div>
      <el-table :data="comments">
        <el-table-column>
          <template slot-scope="scope">
            <div class="comment-list">
              <div>
                <el-tag type='info' size="small" effect="plain">用户</el-tag>
                {{scope.row.username}} 评论了你的文章 【{{scope.row.articleTitle}}】
              </div>
              <div>
                评论时间：{{scope.row.commentCreateTime}}
              </div>
              <div>
                评论内容：{{scope.row.commentContent}}
              </div>
            </div>
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
          articleAuthor: this.$store.state.user.username
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

