import service from '@/utils/service';

export default {
  login,
}

/**
 * 登录
 * @param params 是一个对象
 */
function login(params) {
  return service({
    url: '/login/login',
    method: 'get',
    params
  })
}

/**
 * 获得用户信息,如果请求头中contenttype不是application/json,那么get和post的参数传递方式可能要改,自定探索
 * @param data 是一个json序列化后的字符串 
 */
function getUserInfo(data) {
  return request({
    url: '/user/info',
    method: 'post',
    data
  })
}