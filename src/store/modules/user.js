import { getToken, setToken, removeToken,getUserInfo,setUserInfo } from '@/utils/cookies'
import { login } from '@/api/user'
import { Toast } from 'vant'
const state = {
  token: getToken(),
  username: getUserInfo(),
  avatar: '',
  collectInfo: { //采样信息
	  peopleType: "1", //人员类型
    digit: '', //条形码
    addressName: '',// 采样点名字
    operateType: '',//采样类型
    templateType: '',//样本类型
    areaName: {},//采样地区对象
    areaValue: "" //采样点具体名字
  },
  peopleList: [],//录入人员
  entryInfoList: {//录入用户信息对象
    name: "",
    sex: "",
    age: "",
    address: "",
    remark: "",
    phone: "",
    certificateCode: ""
  } 
}
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_USERNAME(state, username) {
    state.username = username
  },
  SET_AVATAR(state, avatar) {
    state.avatar = avatar
  },
  SET_COLLECTINGS: (state, data) => { //采样数据
    state.collectInfo = {...data,addressName:data.areaValue,}
    // state.collectInfo.digit = data.digit//条形码
    // state.collectInfo.addressName = data.areaValue// 采样点名字
    // state.collectInfo.operateType = data.operateType//采样类型
    // state.templateType = data.templateType//样本类型
    // state.areaName = data.areaName//采样点地区对象（包括地区code)
  },
  RESET_COLLECTINFO: (state) => {
	  state.collectInfo = {
		  peopleType: "1", //人员类型
		  digit: '', //条形码
		  addressName: '',// 采样点名字
		  operateType: '',//采样类型
		  templateType: '',//样本类型
		  areaName: {},//采样地区对象
		  areaValue: "" //采样点具体名字
	  }
  },
  SET_ENTRYINFOLIST: (state, entryInfoList) => {
    state.entryInfoList = entryInfoList
    // state.entryInfoList.name = entryInfoList.name
    // state.entryInfoList.sex = entryInfoList.sex
    // state.entryInfoList.age = entryInfoList.age
    // state.entryInfoList.address = entryInfoList.address
    // state.entryInfoList.phone = entryInfoList.phone
    // state.entryInfoList.certificateCode = entryInfoList.certificateCode
    // state.entryInfoList.remark = entryInfoList.remark
  },
  RET_ENTRYINFOLIST: (state) => {
    state.entryInfoList.name = ""
    state.entryInfoList.sex = ""
    state.entryInfoList.age = ""
    state.entryInfoList.address = ""
    state.entryInfoList.phone = ""
    state.entryInfoList.certificateCode = ""
  },
  SET_PEOPLELIST: (state,value) => {
    state.peopleList.unshift(value)
  },
  REMOVE_PEOPLEITEM: (state,index) => {
    state.peopleList = state.peopleList.filter((item, v) => v !== index)
  },
  EDIT_PEOPLEITEM: (state, {index,data}) => {
    state.peopleList[index] = data
  },
  RESET_PEOPLELIST:(state, value) => {
    state.peopleList = []
  }
}
const actions = {
  login({ commit, dispatch }, data) { //登录
    return new Promise((resolve, reject) => {
      login(data).then(res => {
        const {type, data,token} = res
         if (type == "success") {
           commit('SET_TOKEN',  token)
           commit("SET_USERNAME", data.userName)
           setUserInfo(data.userName)
           setToken(token)
           Toast.success("登录成功！")
         }
         resolve(res)
       }).catch(_ => {
         Toast.fail('登录失败~')
        reject()
      })
    }).catch(e => {
      console.log('catch:', e)
    })
  },
  getInfo({ commit, dispatch }, data) { //获取登录用户信息
    return new Promise((resolve, reject) => {
      const data = { username: '小明', avatar: '' } //暂时写死用户信息数据
      commit('SET_AVATAR', data.avatar)
      commit('SET_USERNAME', data.username)
/*
      dispatch('home/test', null, { root: true })
*/
      resolve(data)
    })
  },
  loginOut({ dispatch }) { // 退出
    return new Promise((resolve, reject) => {
      dispatch('resetToken')
      resolve()
    })
  },
  resetToken({ commit }, data) {
    return new Promise((resolve, reject) => {
      removeToken()
      commit('SET_TOKEN', '')
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
