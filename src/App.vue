<template>
    <router-view></router-view>
</template>

<script>
export default {
    data() {
        return {};
    },
    mounted() {
        // this.$http({
        //   path:'https://api.thecatapi.com/v1/images/search?limit=1',
        //   method: 'get',
        //   params: {}
        // }).then(res=>{
        //   console.log('img',res)
        //   this.img = res.data[0].url
        // }).catch(err => {
        //   console.log('err',err)
        // })
        // this.$http({
        //   path:'http://localhost:3000/users/find',
        //   method:'get',
        //   params:{_id:'61d879208d6d8e1f764bd1ff'}
        // }).then(res=>{
        //   console.log('users',res)
        // }).catch(err => {
        //   console.log('err',err)
        // })
    },
    methods: {},
};
</script>

<style lang="less">
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
}
// #app {
//     font-family: Avenir, Helvetica, Arial, sans-serif;
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
//     text-align: center;
//     color: #2c3e50;
// }

// #nav {
//     padding: 30px;

//     a {
//         font-weight: bold;
//         color: #2c3e50;

//         &.router-link-exact-active {
//             color: #42b983;
//         }
//     }
// }
</style>
