// 引入api
import { login, register } from "@/api/user";
// vant 轻提示
import { Toast } from "vant";
// 引入路由
import router from "@/router";
// 引入加密模块文件
import { Encrypt } from "@/utils/encryption";
// 登录模块vuex
export default {
  // 开启命名空间
  namespaced: true,
  state: {
    // token
    token: localStorage.getItem("token") || "",
    // 用户信息
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
  },
  getters: {},
  mutations: {
    // 清空用户信息
    clearUserInfo(state) {
      state.token = null;
      state.userInfo = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
    },
    // 更新用户数据
    updateUserInfo(state, payload) {
      // console.log(payload);
      // 过滤账号密码避免暴露
      const newPayload = Object.entries(payload).filter(([key]) => {
        return key != "phone" && key != "password";
      });
      // 利用正则把电话号码替换中间四位号码
      const phoneReplace = payload.phone.replace(
        /(\d{3})\d{4}(\d{4})/,
        "$1****$2"
      );
      // 利用crypto-js加密手机号
      const phoneEncryption = Encrypt(payload.phone);
      // 利用crypto-js加密密码
      const passwordEncryption = Encrypt(payload.password);
      // 转化为对象
      const newVal = Object.fromEntries(newPayload);
      // 把加密过的电话号码和密码添加进用户信息
      newVal.phone = phoneReplace;
      newVal.mAES = phoneEncryption;
      newVal.pAES = passwordEncryption;
      state.token = newVal.token;
      state.userInfo = newVal;
      // tokrn数据持久化
      localStorage.setItem("token", newVal.token);
      // 用户信息数据持久化
      localStorage.setItem("userInfo", JSON.stringify(newVal));
    },
  },
  actions: {
    // 登录请求
    async loginResquest(ctx, payload) {
      try {
        let loginRes = await login({
          phone: payload["modile"],
          password: payload["password"],
        });
        Toast.success("登陆成功");
        // 存储到vuex
        ctx.commit("updateUserInfo", loginRes.result);
        // 是否进入过鉴权页面
        if (loginRes && router.history.current.query.redirect) {
          router.replace(router.history.current.query.redirect);
        } else {
          router.replace("/");
        }
      } catch (error) {
        // console.log(error.response.data.msg);
        Toast.fail(error.response.data.msg);
      }
    },
    // 注册请求
    async registerResquest(ctx, payload) {
      // console.log(payload);
      try {
        // 随机数字和字母数组
        let RandomArr = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
        ];
        let RandomNum = "";
        // 获得随机四位数字或字母放进名字（后期可改个人信息）
        for (let i = 0; i < 4; i++) {
          let num = Math.floor(Math.random() * (RandomArr.length - 1));
          RandomNum += RandomArr[num];
        }
        const registerRes = await register({
          // 唯一值
          phone: payload["modile"],
          password: payload["password"],
          // 唯一值
          name: `${RandomNum}Sc`,
          sex: 1,
          realName: "ccc",
        });
        if (registerRes) {
          Toast.success("注册成功,已为您自动登录");
          return { modile: payload["modile"], password: payload["password"] };
        }
      } catch (error) {
        console.log(error);
        if (error.response.data.msg === "手机号码已注册") {
          Toast.fail("手机号码已注册");
        } else {
          Toast.fail("注册失败，参数不对或缺失");
        }
      }
    },
  },
};
