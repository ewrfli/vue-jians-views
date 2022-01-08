<template>
    <div id="app">
        <h1>xxxxxxxxxx</h1>
        <i class="el-icon-edit"></i>
        <i class="el-icon-share"></i>
        <i class="el-icon-delete"></i>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <img :src="img" alt="">
    </div>
</template>

<script>
export default {
  data () {
    return {
      img:''
    }
  },
  mounted(){
    this.$axios.get('https://api.thecatapi.com/v1/images/search?limit=1').then(res=>{
      console.log('img',res)
      this.img = res.data[0].url
    }).catch(err => {
      console.log('err',err)
    })
    this.$axios.get('http://localhost:3000/users/find').then(res=>{
      console.log('users',res)
    }).catch(err => {
      console.log('err',err)
    })
  },
  methods: {},
}
</script>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
