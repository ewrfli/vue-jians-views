<template>
  <div>
      <el-form label-width="100px">
        <el-form-item label="评论者">
          <el-col :span="6">
            <el-input v-model="form.username" clearable="" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="评论内容">
          <el-col :span="6">
            <el-input v-model="form.commentContent" clearable="" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="文章标题">
            <el-col :span="6">
            <el-input v-model="form.articleTitle" clearable="" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="文章作者">
          <el-col :span="6">
            <el-input v-model="form.articleAuthor" clearable="" placeholder="请输入"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="评论时间">
          <el-col :span="6">
            <el-input v-model="form.commentCreateTime" clearable="" placeholder="请输入创建时间"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type='primary' round @click="submit">发布评论</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: this.$store.state.user.username, //评论者
        articleTitle: '',
        articleAuthor: '',
        commentContent: '',
        commentCreateTime: '',
        // author: this.$store.state.user.username
      }
    }
  },
  mounted(){
      //初始值
      let date = new Date()
      this.form.commentCreateTime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  },
  methods: {
    submit(){
      let params = {...this.form}
      console.log('params',params)
      this.$http({
        path: '/comment/add',
        method: 'post',
        params: params
      }).then(res=>{
        if(res.data.code === 200){
          this.$router.push({
              path: "/admin/comment"
          });
        }
      })
    }
  },
}
</script>

<style scoped lang="less">
</style>
