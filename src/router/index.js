import Vue from "vue";
import VueRouter from "vue-router";
// 引入 vuex
import vuex from "@/store";
import { Toast } from "vant";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/index",
  },
  // 主页
  {
    path: "/index",
    name: "index",
    meta: {
      keepAlive: true,
      title: "订花乐 - 鲜花店_订花_送花_鲜花配送",
    },
    component: () => import("@/views/Index.vue"),
  },
  // @商品详情页面
  {
    path: "/detail",
    name: "detail",
    meta: {
      title: "商品详情",
    },
    component: () => import("@/views/Detail.vue"),
  },
  // 分类
  {
    path: "/category",
    name: "category",
    meta: {
      title: "分类",
    },
    component: () => import("@/views/Category.vue"),
    //子路由
    children: [
      {
        path: "/category/UseView",
        name: "UseView",
        // props: ["id"],`
        meta: {
          title: "用途",
        },
        component: () => import("@/views/children_route/use.vue"),
      },
      {
        path: "/category/MaterialView",
        name: "MaterialView",
        meta: {
          title: "花材",
        },
        component: () => import("@/views/children_route/material.vue"),
      },
      {
        path: "/category/ClassView",
        name: "ClassView",
        meta: {
          title: "类别",
        },
        component: () => import("@/views/children_route/class.vue"),
      },
      {
        path: "/category/NumberView",
        name: "NumberView",
        meta: {
          title: "枝树",
        },
        component: () => import("@/views/children_route/number.vue"),
      },
    ],
  },
  // @商品子分类
  {
    path: "/classification",
    name: "classification",
    meta: {
      title: "商品分类",
    },
    component: () => import("@/views/self_classification/Classification.vue"),
  },
  {
    path: "/shop",
    name: "shop",
    meta: {
      title: "购物车",
    },
    component: () => import("@/views/Shop.vue"),
  },
  {
    path: "/home",
    name: "home",
    meta: {
      title: "我的",
    },
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/search",
    name: "search",
    meta: {
      title: "搜索",
    },
    component: () => import("@/views/Search.vue"),
  },
  // @ 个人中心
  {
    path: "/order",
    name: "order",
    redirect: "/order/myorder/1",
    component: () => import("@/views/individual_center/Order.vue"),
    meta: {
      isAuth: true,
      title: "个人中心",
    },
    children: [
      {
        path: "/order/myorder/:id",
        name: "myorder",
        component: () => import("@/views/order/myOrder.vue"),
        meta: {
          title: "个人中心",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/user_information/Login.vue"),
    meta: {
      title: "登录注册",
    },
  },
  {
    path: "/personalInfo",
    name: "personalInfo",
    component: () => import("@/views/user_information/personalInfo.vue"),
    meta: {
      isAuth: true,
      title: "个人信息",
    },
  },
  {
    path: "/coupon",
    name: "coupon",
    component: () => import("@/views/individual_center/Coupon.vue"),
    meta: {
      title: "优惠券",
      isAuth: true,
    },
  },
  {
    path: "/address",
    name: "address",
    component: () => import("@/views/individual_center/Address.vue"),
    meta: {
      title: "地址列表",
      isAuth: true,
    },
  },
  // 地址编辑页
  {
    path: "/addressEdit",
    name: "addressEdit",
    component: () => import("@/views/individual_center/AddressEdit.vue"),
    meta: {
      title: "地址编辑",
      isAuth: true,
    },
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import("@/views/individual_center/Setting.vue"),
    meta: {
      title: "设置",
      isAuth: true,
    },
  },
  // 填写订单
  {
    path: "/fillOrder",
    name: "fillOrder",
    meta: {
      title: "填写订单",
      isAuth: true,
    },
    component: () => import("@/views/order/FillOrder.vue"),
  },
  // 订购人页面
  {
    path: "/subscriber",
    name: "subscriber",
    component: () => import("@/views/order/SubscriberView.vue"),
    meta: {
      title: "填写订购人",
      isAuth: true,
    },
  },
  // 发票页面
  {
    path: "/receipt",
    name: "receipt",
    component: () => import("@/views/order/ReceiptEdit.vue"),
    meta: {
      title: "发票",
      isAuth: true,
    },
  },
  // 结算订单
  {
    path: "/paysuccess",
    name: "paysuccess",
    component: () => import("@/views/order/PaySuccess.vue"),
    meta: {
      title: "结算页面",
      isAuth: true,
    },
  },
  // 订单详情
  {
    path: "/orderdetails",
    name: "orderdetails",
    component: () => import("@/views/order/OrderDetails.vue"),
    meta: {
      title: "订单详情",
      isAuth: true,
    },
  },
  // 物流页
  {
    path: "/logistics",
    name: "logistics",
    component: () => import("@/views/individual_center/Logistics.vue"),
    meta: {
      isAuth: true,
    },
  },
  // 评论页
  {
    path: "/comments",
    name: "comments",
    component: () => import("@/views/individual_center/Comments.vue"),
    meta: {
      title: "用户评价",
    },
  },
  // 搜索结果页
  {
    path: "/searchresult",
    name: "searchresult",
    component: () => import("@/views/self_classification/SearchResult.vue"),
    meta: {
      title: "搜索结果",
    },
  },
  // 支付订单
  {
    path: "/payorder",
    name: "payorder",
    component: () => import("@/views/order/PayOrder.vue"),
    meta: {
      title: "支付订单",
      isAuth: true,
    },
  },
];

// BUG catch
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }
  return originalPush.call(this, location).catch((err) => err);
};

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalReplace.call(this, location, onResolve, onReject);
  }
  return originalReplace.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
  // 操作页面滚动
  scrollBehavior(to, from, savedPosition) {
    // 页面详情页面需要top 0
    // @ 订单页面不需要top 0
    if (to.name === "detail" && from.name !== "fillOrder") {
      console.log(to);
      return { y: 0 };
    }
    if (to.name === "fillOrder") {
      return { y: 0 };
    }
    if (savedPosition && to.meta.keepAlive) {
      // console.log(savedPosition);
      // console.log(to.meta.keepAlive);
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  // 判断页面是否需要授权
  if (to.matched.some((item) => item.meta.isAuth)) {
    // 判断是否登录
    if (vuex.state.loginStore["token"]) {
      // 已登录放行
      next();
    } else {
      next({
        path: "/login",
        // 完整路径
        query: { redirect: to.fullPath },
      });
      Toast({
        message: "请先登录",
        position: "bottom",
      });
    }
  } else {
    // 不需要授权
    next();
  }
});

// 后置守卫
router.afterEach((to) => {
  // 配置标题
  document.title = to.meta.title;
});

export default router;
