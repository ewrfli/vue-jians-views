import axios from 'axios'
import {Message} from 'element-ui';
const baseURL = 'http://localhost:3000'
let instance = axios.create({
    baseURL: baseURL,
    timeout: 5000
})

//请求拦截器
instance.interceptors.request.use(config => {
    // console.log('请求拦截器',config)
    if (localStorage.token) {
        config.headers.authorization = 'Bearer ' + localStorage.token;
    }
    return config
},error => {
    console.error('请求失败', error)
    Message({
        message: error,
        type: "error",
    });
    return Promise.reject(error);
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
    // console.log('响应拦截器',response)
    // 对响应数据做点什么
    if(response && response.data.msg !== '认证成功' ){ //response.data.msg !== '认证成功'
        // Message({
        //     message: response.data.msg,
        //     type: response.data.code === 200 ? "success" : "error",
        // });
    }
    return response;
  }, error => {
    // 对响应错误做点什么
    console.error('失败', error)
    Message({
        message: error,
        type: "error",
    });
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