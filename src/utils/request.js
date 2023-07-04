import  axios from 'axios'
import { Notify, Toast } from 'vant'
import  qs from 'qs'
import store  from '@/store'
import router from "@/router"
const success_codes = [100, 200]
const fail_codes = [500]
const token_code =  1000

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000
})
service.interceptors.request.use(
  config => {
    // post 序列化
    // config.data = {
    //   ...config.data,
    //   token: store.getters.token
    // }
    // config.data.token = store.getters.token
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it atccording to the actual situation
    // config.headers['Authorization'] = 'Bearer ' + store.getters.token
    if(store.getters.token) {
      config.headers['token'] = 'Bearer ' + store.getters.token
    }
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    if (config.method === 'get') {
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      // config.headers['Content-Type'] = 'multipart/form-data'
      // 上传文件测试
      // if (Object.prototype.toString.call(config.data) == '[object FormData]') {
      //   config.headers['Content-Type'] = 'multipart/form-data'
      // } else {
        // console.info('1111config.data:', config.data);
        // console.info('2222:',typeof qs.parse(config.data), qs.parse(config.data))
        // console.info('3333:', typeof qs.stringify(config.data), qs.stringify(config.data))
        // config.data = qs.stringify(config.data)
        // config.data = qs.stringify({...config.data});
        // config.data = config.data;
      // }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    // console.log(response, "返回")
    // const { message, status } = response
    // || data.message
    // const msg = data.type 
    // console.log('msg', msg)
    // if (success_codes.includes(status)) {
     
    // } 
    // else if (fail_codes.includes(code)) {
    //   Toast.fail(msg || '操作失败')
    //   // fail
    // } else if (token_code == code) {
    //   Notify({
    //     type: 'warning',
    //     message: '登录信息失效~'
    //   })
    //   store.dispatch('user/resetToken').then(() => {
    //     location.reload()
    //   })      // others
    // } else {
    //   Toast.fail(msg || '参数错误~')
    // }
    return response.data
  },
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        Toast.fail('登录信息失效，请重新登录！');
        store.dispatch('user/loginOut')
      }
      switch (error.response.status) {
        case 401:
          // console.log(error.response);
          // 登录超时, token超时
          // 401 清除token信息并跳转到登录页面
          router.replace({
            name: '/login',
            query: {redirect: router.currentRoute.fullPath}
          });
          break;
        case 500:
          const {message} = error.response
          Toast(message)
          break;
        default:
        // console.log('err-login')
        /* 普通401拦截直接返回到登录页面 */
        // store.commit(types.LOGOUT);
        // router.push('/');
      }
      // if(error.response.status === 500) {
      //   Toast(message)
      // }
    }
    Toast.fail(error?.response.data.content)
    return Promise.reject(error?.response?.data);
  }
)
export default service
