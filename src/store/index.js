import Vue from "vue";
import Vuex from "vuex";
import loginStore from "@/store/modules/login";
import shopCarStore from "@/store/modules/shopCar";
import classflyStore from "@/store/modules/classfly";
import fillOrderStore from "@/store/modules/fillOrder";
import addressStore from "@/store/modules/address";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    loginStore,
    shopCarStore,
    fillOrderStore,
    addressStore,
    classflyStore,
  },
});
