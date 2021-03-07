import Vue from 'vue'
import Vuex from 'vuex'
import productsModule from './products.js'
import loadingModule from './loading.js'
import alertModule from './AlertMessage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    productsModule,
    loadingModule,
    alertModule
  }
})
