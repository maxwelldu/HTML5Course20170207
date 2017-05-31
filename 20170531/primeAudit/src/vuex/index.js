import Vue from 'vue'
import Vuex from 'vuex'


import customer from './modules/customer'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    customer
  }
})

export default store
