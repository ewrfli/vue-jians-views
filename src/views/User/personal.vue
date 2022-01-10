<template>
  <div>

    <el-form label-position="left" label-width="70px">
      <el-form-item label="头像" class="avatar-item">
        <div class="avatar-div">
              <img :src="imgPath" alt="" class="small-img" v-if="imgPath">
              <div class="null-img" v-else></div>
              <el-upload
                action="http://localhost:3000/upload/img"
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
          <el-input placeholder="请输入用户名"></el-input>
        </el-col>
      </el-form-item> 
      <el-form-item label="性别">
        <el-col :span="6">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
          <el-radio label="保密">保密</el-radio>
        </el-col>        
      </el-form-item>
      <el-form-item label="描述">
        <el-col :span="6">
          <el-input placeholder="请输入描述" type="textarea" rows="3"></el-input>
        </el-col>      
      </el-form-item> 
      <el-form-item label="手机">
        <el-col :span="6">
          <el-input placeholder="请输入手机"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-col :span="6">
          <el-input placeholder="请输入邮箱"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="提交">
        <el-button type="primary">提交修改</el-button>
      </el-form-item>
    </el-form>




  </div>
</template>

<script>
export default {
  data () {
    return {
      uploadHeader: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InhpYW9tIiwiX2lkIjoiNjFkYmQzNWZlOTA3YTYxMjU5MjYwOGY0IiwiaWF0IjoxNjQxODA2MzcxLCJleHAiOjE2NDI0MTExNzF9.wM-2Iqvtwlb7qM6QBGtq0-_688BDoNAlEkTWywQnwgE"
      },
      imgPath: ''
    }
  },
  methods: {
    onSuccess(res){
      console.log(res)
      this.imgPath = res.path
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
