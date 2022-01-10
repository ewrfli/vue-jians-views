<template>
  <div>
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
.null-img{
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #545c64;
}
.small-img{
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-right: 10px;
}
</style>
