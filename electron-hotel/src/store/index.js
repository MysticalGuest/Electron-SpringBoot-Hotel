import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    // set方法
    // 修改token，并将token存入localStorage
    changeLogin (state, user) { // 这里的state对应上面状态state
      console.log('user.token:' + user.token);
      state.token = user.token;
      const param = new URLSearchParams();
      // 获取sno数据
      param.append('aName', user.token.aName);
      console.log('param:  ', param);
      // console.log('jsonaaaaa:  ', json.aName);
      // sessionStorage.setItem('token', user.token);
      sessionStorage.setItem('token', param);
    }
  },
  actions: {
  },
  modules: {
  }
})
