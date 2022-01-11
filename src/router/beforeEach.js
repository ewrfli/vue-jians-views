/**
 * 路由的前置守卫，调用该方法时需要传入路由对象作为参数
 */
import http from '../util/http'
import store from '../store'

export default (router) => {
    router.beforeEach((to, from, next) => {
        //设置title
        document.title = to.meta.title ? to.meta.title : 'jians后台管理系统'

        //校验是否存在token
        if (localStorage.token) {
            //验证token是否有效，并获取用户信息及权限
            http({
                path: '/users/verify',
                method: 'post'
            }).then(res => {
                console.log('beforeEach res',res)
                if (res.data.code === 200) {
                    store.commit('setUsername', res.data.user)//verify验证后的user信息存vuex
                    if (to.path !== '/login') {
                        next()
                    } else {
                        next('/admin')
                    }
                } else {
                    console.log('localStorage.token',localStorage.token)
                    localStorage.removeItem('token') //token验证不通过销毁已存在的token 并跳转to/login
                    localStorage.removeItem('vuex')
                    if (to.path !== '/login') {
                        next('/login')
                    } else {
                        next()
                    }
                }
            }).catch(err => { ////token验证不通过销毁已存在的token 并跳转to/login
                console.log('localStorage.token',localStorage.token)
                localStorage.removeItem('token')
                localStorage.removeItem('vuex')
                console.log('verify.err',err)
                if (to.path !== '/login') {
                    next('/login')
                } else {
                    next()
                }
            })
        } else {
            //判断当前要跳转的路由是否为'/login'，如果不加此判断，会报内存溢出的错误
            if (to.path !== '/login') {
                next('/login')
            } else {
                next()
            }
        }
    })
}