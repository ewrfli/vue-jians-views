<template>
  <div>
      <div>
        <span style="margin-right: 20px;">用户列表</span> 
        <!-- Form -->
        <el-button @click="dialogFormVisible = true">添加用户</el-button>
        <el-dialog title="添加粉丝" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.pwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="ID" :label-width="formLabelWidth">
              <el-input v-model="form.id" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="头像" :label-width="formLabelWidth">
              <el-input v-model="form.avatar" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限" :label-width="formLabelWidth">
              <el-input v-model="form.power" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-input v-model="form.sex" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input v-model="form.desc" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="手机" :label-width="formLabelWidth">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="form.email" autocomplete="off"></el-input>
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
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="密码" prop="pwd"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="权限" prop="power"></el-table-column>
        <!-- <el-table-column label="头像" prop="avatar"></el-table-column> -->
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="手机" prop="phone"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="update(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="del(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <!-- <el-pagination 
        background
        layout="prev,pager,next"
        :total="count"
        :page-size="pageSize"
        :current-page="page"
        @current-change="changePage"></el-pagination> -->
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
        _id: '',
        username: '', //评论者
        pwd: '',
        id: '',
        power: '',
        avatar: '',
        sex: '',
        desc: '',
        phone: '',
        email:''
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
          _id: '',
          username: '', //评论者
          pwd: '',
          id: '',
          power: '',
          avatar: '',
          sex: '',
          desc: '',
          phone: '',
          email:''
        }
      }
    }
  },
  created(){
    this.getData()
     //初始值
    let date = new Date()
    this.form.id = Date.now()
    // this.form.commentCreateTime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  },
  methods: {
    getData(){
      this.$http({
        path: '/users/findall',
        method: 'get',
        // params: {
        //   page: this.page,
        //   // articleAuthor: this.$store.state.user.username
        // }
      }).then(res=>{
        console.log(res.data.reslut)
        this.comments = res.data.reslut
        this.page = res.data.page
        this.pageSize = res.data.pageSize
        this.count = res.data.count
      })
    },
    // changePage(page){
    //   this.page = page
    //   this.getData()
    // },
    del(row){
      console.log('del',row)
      this.$confirm('确定要删除吗？','提示',{
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$http({
          path: '/users/del',
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
      for(let key in params){     // 删除对象中空属性值
            if(params[key] == ''){
                delete params[key]
            }
      }
      console.log('params',params)
      this.$http({
        path: '/users/add',
        method: 'post',
        params: params
      }).then(res=>{
        if(res.data.code === 200){
          this.dialogFormVisible = false
          this.getData()
        }
      })
    },
    updateComment(){
      let params = {...this.form}
      console.log('params',params)
      this.$http({
        path: '/users/dataupdate',
        method: 'put',
        params: params
      }).then(res=>{
        if(res.data.code === 200){
          this.dialogFormVisible = false
          console.log('更新成功')
          this.isUpdate = false
          this.getData()
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

