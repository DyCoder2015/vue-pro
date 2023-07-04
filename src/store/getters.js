const getters = {
  token: state => state.user.token,
  username: state => state.user.username,
  avatar: state => state.user.avatar,
  collectInfo: state => state.user.collectInfo,
  entryInfoList: state => state.user.entryInfoList,
  peopleList:state => state.user.peopleList,
}
export default getters
