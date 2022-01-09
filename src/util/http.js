import axios from 'axios'
let instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
})

//请求拦截器
instance.interceptors.request.use(config => {
    return config
},err => {
    console.error('请求失败', err)
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
    // 对响应数据做点什么
    return response;
  }, error => {
    // 对响应错误做点什么
    console.error('请求失败', err)
    return Promise.reject(error);
  });


  //封装http请求方法
/**
 * 
 * @param {*} option 配置对象属性包括：
 * method
 * path
 * params
 */
async function http(option = {}){
    let result = null;
    if(option.method === 'get' || option.method === 'delete'){
        await instance[option.method](
            option.path,
            {
                params: option.params
            }
        ).then(res=>{
            result = res
        }).catch(err => {
            result = err
        })
    }else if(option.method === 'post' || option.method === 'put'){
        await instance[option.method](
            option.path,
            option.params
        ).then(res=>{
            result = res
        }).catch(err => {
            result = err
        })
    }
    return result
}
export default http