<template>
  <div>
      <el-table :data="fans">
        <el-table-column>
          <template slot-scope="scope">
            <div class="fans-list">
              <div>
                <el-tag type="danger" size="small" effect="plain">粉丝</el-tag>
                {{scope.row.username}} 关注了你
              </div>
              <div>
                关注时间：
                {{scope.row.createTime}}
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
      fans: [],
      page: 1,
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
    }
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
