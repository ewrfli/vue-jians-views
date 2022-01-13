<template>
    <div>
        <el-form label-position="left" label-width="70px">
          <!-- <el-form-item label="_id"> 
              <el-col :span="6">
                <el-input v-model="form._id"  placeholder="请输入ID" ></el-input>
              </el-col>
            </el-form-item> -->

            <el-form-item label="ID"> 
              <el-col :span="6">
                <el-input v-model="form.id"  placeholder="请输入ID"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="用户名">
              <el-col :span="6">
                <el-input v-model="form.username"  placeholder="请输入用户名"></el-input>
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
            <el-form-item label="提交">
              <el-button type="primary" @click="save">提交修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
              _id: '',
              id:'',
              username: '',
              pwd: '',
              power: ''
            },
        };
    },
    created(){
      this.form = this.$store.state.user
    },
    methods: {
       save(){
         let params = this.form
        for(var key in params){ //剔除params里的page
          if(params[key] == 'pwd' && params.pwd == ''){
            delete obj[key]
          }
        }
        console.log('this.form', params)
        this.$http({
            path: '/users/pwdupdate',
            method: 'put',
            params: params
        }).then((res) => {
            console.log('dataupdate res',res)
        });
      }
    },
};
</script>

<style lang="less" scoped></style>
