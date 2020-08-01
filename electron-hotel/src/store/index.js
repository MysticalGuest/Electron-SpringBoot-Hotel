import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    loadState: 0
  },
  // 同步方法
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
    },
    // loadingState (state, load) {
    //   console.log('loadSTATE:' + load.state);
    //   this.loadState = load.state;
    //   console.log('this.loadStateloadSTATE:' + this.loadState);
    // }
    loadingState (state) {
      console.log('BEFORE' + state.loadState);
      state.loadState = 1;
      console.log('this.loadStateloadSTATE:' + state.loadState);
    }
  },
  getters: {
    getLoading(state) {
      return state.loadState;
    }
  },
  // 异步方法
  actions: {
    setloadingState(context) {
      // 处理异步操作
      context.commit('loadingState')
    }
  },
  modules: {
  }
})
