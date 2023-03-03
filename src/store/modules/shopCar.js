import { delShopCarApi, getShopCarApi } from "@/api/shopCar";

// 购物车模块
export default {
  namespaced: true,
  state: {
    // 购物车列表
    shopCarList: JSON.parse(sessionStorage.getItem("shopCarList")) || [],
    // 选中商品id数组
    chooseShopList: JSON.parse(sessionStorage.getItem("chooseShopList")) || [],
    // 选中商品的信息
    selectShopMsg: JSON.parse(sessionStorage.getItem("selectShopMsg")) || [],
  },
  getters: {
    // 计算总价
    getTotal(state) {
      let total = 0;
      state.selectShopMsg.forEach((item) => {
        total += item.num * item.s_good.sale_price;
      });
      return total;
    },
    // 优惠了多少
    getDiscount(state) {
      let sum = 0;
      state.selectShopMsg.forEach((item) => {
        sum += item.num * item.s_good.price - item.num * item.s_good.sale_price;
      });
      return sum;
    },
  },
  mutations: {
    // 更新购物车
    upDataShopCar(state, payload) {
      if (payload.length) {
        state.shopCarList = payload;
        sessionStorage.setItem("shopCarList", JSON.stringify(payload));
      }
    },
    // 更新选中商品id数组
    upDataChooseShop(state, payload) {
      state.chooseShopList = payload;
      sessionStorage.setItem("chooseShopList", JSON.stringify(payload));
      state.selectShopMsg = state.shopCarList.filter((item) =>
        payload.includes(item.id)
      );
      sessionStorage.setItem(
        "selectShopMsg",
        JSON.stringify(state.selectShopMsg)
      );
    },
    // 删除购物车
    delShop(state, $id) {
      state.shopCarList.splice($id, 1);
      sessionStorage.setItem("shopCarList", JSON.stringify(state.shopCarList));
    },
    // 清空购物车
    clearShopCar(state) {
      state.shopCarList = [];
      state.chooseShopList = [];
      state.selectShopMsg = [];
      sessionStorage.removeItem("shopCarList");
      sessionStorage.removeItem("chooseShopList");
      sessionStorage.removeItem("selectShopMsg");
    },
  },
  actions: {
    // 获取购物车列表
    async getShopCarList(ctx) {
      try {
        const res = await getShopCarApi();
        ctx.commit("upDataShopCar", res.result);
        return res;
      } catch (error) {
        return error;
      }
    },
    // 删除购物车
    async deleteShopCar(ctx, payload) {
      try {
        const { id, idx } = payload;
        // 删除请求
        const res = await delShopCarApi(id);
        ctx.dispatch("getShopCarList");
        // 删除购物车中的数据
        ctx.commit("delShop", idx);
        // 如果删除选中的商品，更新选中
        ctx.commit(
          "upDataChooseShop",
          ctx.state.chooseShopList.filter((item) => item.id === id)
        );
        return res;
      } catch (error) {
        return error;
      }
    },
  },
};
