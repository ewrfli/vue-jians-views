import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Web',
    component: () => import('@/views/Web')           
  
  },
  {
    path: '/detail',
    name: 'Web',
    component: () => import('@/views/Web/detail.vue')           
  
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'), 
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Home'),    
    children: [
      {
        path: '/admin/user/personal',
        name: 'UserPersonal',
        component: () => import('@/views/User/personal.vue'),
        meta: {
          title: '个人资料'
        }
      },
      {
        path: '/admin/user/password',
        name: 'UserPassword',
        component: () => import('@/views/User/password.vue'),
        meta: {
          title: '修改密码'
        }
      },
      {
        path: '/admin/article',
        name: 'ArticleList',
        component: () => import('@/views/Article/index.vue'), 
        meta: {
          title: '文章列表'
        }
      },
      {
        path: '/admin/article/add',
        name: 'ArticleAdd',
        component: () => import('@/views/Article/add.vue'), 
        meta: {
          title: '发布文章'
        }
      },
      {
        path: '/admin/article/update',
        name: 'ArticleUpdate',
        component: () => import('@/views/Article/update.vue'), 
        meta: {
          title: '更新文章'
        }
      },
      {
        path: '/admin/comment',
        name: 'Comment',
        component: () => import('@/views/Comment/index.vue'), 
        meta: {
          title: '评论列表'
        }
      },
      {
        path: '/admin/comment/add',
        name: 'addComment',
        component: () => import('@/views/Comment/add.vue'), 
        meta: {
          title: '添加评论'
        }
      },
      {
        path: '/admin/comment/update',
        name: 'Comment',
        component: () => import('@/views/Comment/update.vue'), 
        meta: {
          title: '更新评论'
        }
      },
      {
        path: '/admin/fans',
        name: 'Fans',
        component: () => import('@/views/Fans/index.vue'), 
        meta: {
          title: '粉丝列表'
        }
      },
      {
        path: '/admin/star',
        name: 'Star',
        component: () => import('@/views/Star/index.vue'), 
        meta: {
          title: '点赞列表'
        }
      }
    ]       
  
  }
  
  
]

const router = new VueRouter({
  routes
})

export default router
