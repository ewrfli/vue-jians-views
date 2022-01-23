<template>
  <div>

    <el-form label-position="left" label-width="70px">
      <el-form-item label="头像" class="avatar-item">
        <div class="avatar-div">
              <img :src="form.avatar" alt="" class="small-img" v-if="form.avatar">
              <div class="null-img" v-else></div>
              <el-upload
                :action="imgUpPath"
                name="myfile"
                :headers="uploadHeader"
                :on-success="onSuccess"
                :show-file-list="false"
              >
                <el-button>上传</el-button>
              </el-upload>
        </div>
      </el-form-item>

      <el-form-item label="用户名">
        <el-col :span="6">
          <el-input v-model="form.username" disabled placeholder="请输入用户名"></el-input>
        </el-col>
      </el-form-item> 
      <el-form-item label="ID"> 
        <el-col :span="6">
          <el-input v-model="form.id"  placeholder="请输入ID"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码">
        <el-col :span="6">
          <el-input v-model="form.pwd"  placeholder="请输入新密码"></el-input>
        </el-col> 
      </el-form-item>
      <el-form-item label="权限">
        <el-col :span="6">
          <el-input v-model="form.power"  placeholder="请输入用户名权限"></el-input>
        </el-col> 
      </el-form-item>
      <el-form-item label="性别">
        <el-col :span="6">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
          <el-radio v-model="form.sex" label="保密">保密</el-radio>
        </el-col>        
      </el-form-item>
      <el-form-item label="描述">
        <el-col :span="6">
          <el-input v-model="form.desc" placeholder="请输入描述" type="textarea" rows="3"></el-input>
        </el-col>      
      </el-form-item> 
      <el-form-item label="手机">
        <el-col :span="6">
          <el-input v-model="form.phone" placeholder="请输入手机"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-col :span="6">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="提交">
        <el-button type="primary" @click="save">提交修改</el-button>
      </el-form-item>
    </el-form>




  </div>
</template>

<script>
import {Message} from 'element-ui';
export default {
  data () {
    return {
      uploadHeader: {
        authorization: "Bearer " + localStorage.token,
      },
      imgUpPath: '',
      form: {
        _id: '',
        avatar: '',
        username: '',
        pwd: '',
        power: '',
        sex: '男',
        desc: '',
        phone: '',
        email: ''

      }
    }
  },
  created(){
    this.form = this.$store.state.user
    this.imgUpPath = 'http://localhost:3000'+'/upload/img'
  },
  methods: {
    onSuccess(res){
      console.log(res)
      this.form.avatar = res.path//上传成功显示图片预览
    },
    save(){
      console.log('this.form',this.form)
      this.$http({
          path: '/users/dataupdate',
          method: 'put',
          params: this.form
      }).then((res) => {
          console.log('dataupdate res',res)
           Message({
            message: res.data.msg,
            type: res.data.code === 200 ? "success" : "error",
          });
      });
    }
  },
}
</script>

<style lang="less" scoped>
.avatar-div {
  display: flex;
  align-items: center;
}
.null-img{
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background-color: #545c64;
  margin: 0 10px;
}
.small-img{
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin: 0 10px;
}
</style>
