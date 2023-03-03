import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
// px2rem 自适应
import "lib-flexible";
import "@/vantui/vant";
// @清除默认样式
import "./assets/style/reset.css";
import { Swipe, SwipeItem, Skeleton, Lazyload } from "vant";
// @px2rem 自适应
import "lib-flexible";
// @按需引入vantui
import "@/vantui/vant";
// @清除默认样式
import "./assets/style/reset.css";
// 引入公共组件
import CommonHead from "@/components/CommonHead.vue";
// import { Skeleton } from 'vant';

//骨架屏
Vue.use(Skeleton);
//懒加载
Vue.use(Lazyload);
Vue.use(Swipe);
Vue.use(SwipeItem);

// 生产提示
Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();

// 注册全局组件
Vue.component("com-head", CommonHead);
new Vue({
  router,
  store,

  render: (h) => h(App),
}).$mount("#app");
