import { defaultAddressApi } from "@/api/address";

export default {
  // 填写订单 vuex
  namespaced: true,
  state: {
    // 收货地址
    chooseAddress: null,
    // 收货日期
    date: "请填写送达日期",
    // 收货时间
    time: "不限时段",
    // 配送方式
    delivery: "市区免费配送",
    // 订购人信息
    billData: "请填写",
  },
  getters: {
    // 运费
    getDeliveryfee(state) {
      let res = 0;
      switch (state.delivery) {
        case "市区免费配送":
          res = 0;
          break;
        case "近郊+30.00运费":
          res = 30;
          break;
        case "近郊+50.00运费":
          res = 50;
          break;
        default:
          break;
      }
      return res;
    },
  },
  mutations: {
    // 修改收货地址
    changeAddress(state, payload) {
      state.chooseAddress = payload;
    },
    // 修改收货日期
    changeDate(state, payload) {
      state.date = payload;
    },
    // 修改收货日期
    changeTime(state, payload) {
      state.time = payload;
    },
    // 修改收货日期
    changeDelivery(state, payload) {
      state.delivery = payload;
    },
    // 修改订购人
    changeBillData(state, payload) {
      state.billData = payload;
    },
  },
  actions: {
    // 获取默认地址
    async getDeaultAddress(ctx) {
      try {
        // 没有选中地址才执行
        if (!ctx.state.chooseAddress) {
          const { result } = await defaultAddressApi();
          ctx.commit("changeAddress", result);
        }
      } catch (err) {
        return err;
      }
    },
  },
};
