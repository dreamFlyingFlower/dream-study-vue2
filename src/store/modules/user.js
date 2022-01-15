// jshint esversion:6
// jshint node:true
/**
 * 用户信息存储
 * state:需要进行存储的属性,state是固定的,不可改,否则找不到,state中的属性只能拿,this.$store.state.user;不能直接改
 * getter:对state的计算属性,相当于vue中吃computed,计算state中的属性,得到一个全新的属性,在vue中同state一样调用
 * mutations:修改state中的属性,this.$store.SET_CODE,相当于vue中的methods
 */
import apiUser from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    userIcon: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  /**
   * getter可以返回一个值,一个方法,方法可以传参;传参时,state可以不用显示的传递
   * 在vue中调用this.$store.getter.username
   */
  getter:{
    username:state=>state.user.username,
    username1:state=>param=>state.user.param
  },

  /**
   * 在vue中调用mutations中的方法时,必须使用commit(this.$store.SET_CODE,10)
   * state并不需要显示传入,参数可写在方法之后,若是多个参数,需要以对象的形式传入,总之就是只能写一个参数
   * 在mutations中的函数调用,如ajax必须是同步的
   */
  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERICON: (state, userIcon) => {
      state.userIcon = userIcon
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  /**
   * 修改mutations中的方法,因为mutations中的方法必须同步,而action中的方法可异步
   * 在vue中通过this.$dispatch('Login',userInfo)调用
   */
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        apiUser.login(username, userInfo.password).then(response => {
          const data = response.data;
          sessionStorage.setItem('SET_USERICON',data.userIcon);
          sessionStorage.setItem('SET_TOKEN',data.token);
          commit('SET_TOKEN', data.token);
          commit('SET_USERICON',data.userIcon);
          setToken(response.data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 获取用户信息
    GetUserMenus({ commit, state }) {
      console.log(22);
      return new Promise((resolve, reject) => {
        apiUser.getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data

          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          commit('SET_NAME', data.name)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        apiUser.logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_USERICON', data.userIcon)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user;