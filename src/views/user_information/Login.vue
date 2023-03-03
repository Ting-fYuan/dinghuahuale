<!-- 登录 -->
<template>
  <!-- 整体 -->
  <div class="wrap">
    <!-- 头部 -->
    <header>
      <div class="login_head">
        <div class="head_back" @click="back">
          <i class="iconfont icon-zuojiantou"></i>
        </div>
        <div class="head_text">登录注册</div>
        <div class="head_option">
          <!-- 弹出层 -->
          <van-popover
            v-model="showPopover"
            trigger="click"
            :actions="actions"
            placement="left-start"
            @select="onSelect"
            theme="dark"
          >
            <!-- 点击事件 -->
            <template #reference>
              <i class="iconfont icon-caidan" />
            </template>
          </van-popover>
        </div>
      </div>
      <!-- logo图片 -->
      <div class="logo">
        <!-- <img :src="logo" alt="logo" /> -->
        <img src="http://www.dinghuale.com/public/images/logo.png" alt="logo" />
      </div>
    </header>
    <!-- 内容 -->
    <main>
      <!-- tab栏切换 -->
      <van-tabs
        v-model="activeName"
        animated
        title-active-color="#804E21"
        color="#804E21"
        @click="tabsState"
      >
        <!--登录 -->
        <van-tab title="登录" name="login">
          <!-- 登录模块 -->
          <form action="javascript:;">
            <!-- 登录手机号码 -->
            <div class="form">
              <div class="label" ref="loginMobileL">手机号码</div>
              <input
                v-model.trim="form.loginPhone"
                type="text"
                id="loginMobile"
                @blur="loginBlur"
                @focus="loginFocus"
              />
              <!-- 错误提示 -->
              <div class="err_msg" ref="login_m_err">
                {{ err.login_m_err }}
              </div>
            </div>
            <!-- 登录密码 -->
            <div class="form">
              <div class="label" ref="loginPassL">请输入密码</div>
              <input
                v-model="form.loginPassword"
                type="password"
                id="loginPassword"
                @blur="loginBlur"
                @focus="loginFocus"
                ref="loginRef"
              />
              <!-- 错误提示 -->
              <div class="err_msg" ref="login_p_err">
                {{ err.login_p_err }}
              </div>
              <!-- 眼睛 -->
              <i class="iconfont icon-yanjing-biyan" @click="loginEye"></i>
            </div>
            <!-- 点击登录 -->
            <div class="form" v-if="!btnIsShow">
              <button
                ref="loginBtn"
                class="btn"
                @click="loginSubmit"
                type="button"
              >
                登录
              </button>
            </div>
          </form>
        </van-tab>
        <!-- 注册 -->
        <van-tab title="注册" name="register">
          <!-- 注册模块 -->
          <div class="registerModule">
            <!-- 注册手机号模块 -->
            <div class="form">
              <div class="label" ref="regMobileL">手机号码</div>
              <input
                v-model.trim="form.regPhone"
                type="text"
                id="regMobile"
                @blur="regBlur"
                @focus="regFocus"
              />
              <!-- 错误提示 -->
              <div class="err_msg" ref="reg_m_err">{{ err.reg_m_err }}</div>
            </div>
            <!-- 注册密码模块 -->
            <div class="form">
              <div class="label" ref="regPassL">请输入密码</div>
              <input
                v-model="form.regPassword"
                type="password"
                id="regPassword"
                @blur="regBlur"
                @focus="regFocus"
                ref="regPassRef"
              />
              <!-- 错误提示 -->
              <div class="err_msg" ref="reg_p_err">{{ err.reg_p_err }}</div>
              <!-- 眼睛 -->
              <i class="iconfont icon-yanjing-biyan" @click="regPassEye"></i>
            </div>
            <!-- 注册确认密码模块 -->
            <div class="form">
              <div class="label" ref="regSamePassL">请输入确认密码</div>
              <input
                v-model="form.regSamePass"
                type="password"
                id="regSamePass"
                @blur="regBlur"
                @focus="regFocus"
                ref="regSameRef"
              />
              <!-- 错误提示 -->
              <div class="err_msg" ref="reg_cp_err">{{ err.reg_cp_err }}</div>
              <!-- 眼睛 -->
              <i class="iconfont icon-yanjing-biyan" @click="regSameEye"></i>
            </div>
            <!-- 注册按钮模块 -->
            <div class="form" v-if="btnIsShow">
              <button ref="regBtn" class="btn" @click="regiaterSubmit">
                注册
              </button>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </main>
    <!-- 底部 -->
    <footer></footer>
  </div>
</template>

<script>
// 引入logoApi
import { logoSwiper } from "@/api/swiper";
// 引入vant组件提示
// import { Toast } from "vant";
export default {
  name: "LoginView",
  data() {
    return {
      // 两个模块绑定的数据
      form: {
        // 登录手机号
        loginPhone: "",
        // 登录密码
        loginPassword: "",
        // 注册手机号
        regPhone: "",
        // 注册密码
        regPassword: "",
        // 确认密码
        regSamePass: "",
      },
      // 两个模块的错误提示
      err: {
        // 登录手机号格式错误提示
        login_m_err: "",
        // 登录密码错误提示
        login_p_err: "",
        // 注册手机号格式错误提示
        reg_m_err: "",
        // 注册密码错误提示
        reg_p_err: "",
        // 注册确密码错误提示
        reg_cp_err: "",
      },
      // 通过 actions 属性来定义菜单选项
      actions: [
        { text: "首页", icon: "wap-home-o" },
        { text: "分类", icon: "apps-o" },
        { text: "购物车", icon: "shopping-cart-o" },
        { text: "我的", icon: "contact" },
      ],
      // tabs栏切换
      activeName: "login",
      // logo
      logo: "",
      // 菜单是否显示
      showPopover: false,
      // 控制眼睛是否显示
      eyeShow: false,
      // 是否存在历史页面栈
      hasBackHistory: false,
      // 切换登录注册两个的button
      btnIsShow: false,
      // logo
      // logo: requrire(""),
      // 手机正则
      phoneRule:
        /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
    };
  },
  async created() {
    // 获取logo请求
    let res = await logoSwiper(1620);
    this.logo = res.result.s_photos[0].path;
  },
  beforeRouteEnter(to, from, next) {
    let hasBackHistory = false;
    if (from.name !== null) hasBackHistory = true;
    next((vm) => {
      vm.hasBackHistory = hasBackHistory;
    });
  },
  // 绑定监听事件
  mounted() {
    window.addEventListener("keydown", this.keyEnter);
  },
  // 销毁回车事件
  destroyed() {
    window.removeEventListener("keydown", this.keyEnter, false);
  },
  methods: {
    // 占位符和错误提示样式添加删除函数
    classHandel($cute, $data) {
      const allClass = {
        labelAdd: (data) => {
          this.$refs[`${data}`].classList.add("labelActive");
        },
        labelRemova: (data) => {
          this.$refs[`${data}`].classList.remove("labelActive");
        },
        errAdd: (data) => {
          this.$refs[`${data}`].classList.add("errChange");
        },
        errRemove: (data) => {
          this.$refs[`${data}`].classList.remove("errChange");
        },
      };
      const callBack = (cute, data) => {
        allClass[cute](data);
      };
      callBack($cute, $data);
    },
    // 眼睛变化函数
    eyeHandle($event, $data) {
      if (!this.eyeShow) {
        $event.target.className = "iconfont icon-yanjing";
        this.$refs[$data].type = "text";
        this.eyeShow = !this.eyeShow;
      } else {
        $event.target.className = "iconfont icon-yanjing-biyan";
        this.$refs[$data].type = "password";
        this.eyeShow = !this.eyeShow;
      }
    },
    // 切换tab栏去除另一边的错误提示
    tabsState(e) {
      if (e == "login") {
        this.btnIsShow = !this.btnIsShow;
        if (
          this.form.regPhone == "" &&
          this.form.regPassword == "" &&
          this.form.regSamePass == ""
        ) {
          this.classHandel("errRemove", "reg_m_err");
          this.classHandel("errRemove", "reg_p_err");
          this.classHandel("errRemove", "reg_cp_err");
        } else if (this.form.regPhone == "" && this.form.regPassword == "") {
          this.classHandel("errRemove", "reg_m_err");
          this.classHandel("errRemove", "reg_p_err");
        } else if (this.form.regPhone == "" && this.form.regSamePass == "") {
          this.classHandel("errRemove", "reg_m_err");
          this.classHandel("errRemove", "reg_cp_err");
        } else if (this.form.regPassword == "" && this.form.regSamePass == "") {
          this.classHandel("errRemove", "reg_p_err");
          this.classHandel("errRemove", "reg_cp_err");
        } else if (this.form.regPhone === "") {
          this.classHandel("errRemove", "reg_m_err");
        } else if (this.form.regPassword === "") {
          this.classHandel("errRemove", "reg_p_err");
        } else if (this.form.regSamePass == "") {
          this.classHandel("errRemove", "reg_cp_err");
        }
      } else {
        this.btnIsShow = !this.btnIsShow;
        if (this.form.loginPhone == "" && this.form.loginPassword == "") {
          this.classHandel("errRemove", "login_m_err");
          this.classHandel("errRemove", "login_p_err");
        } else if (this.form.loginPassword == "") {
          this.classHandel("errRemove", "login_p_err");
        } else if (this.form.loginPhone == "") {
          this.classHandel("errRemove", "login_m_err");
        }
      }
    },
    // 登录失焦样式变化
    loginBlur(e) {
      // 判断是哪个输入框
      if (e.target.id == "loginMobile") {
        // 判断是否为空
        if (this.form.loginPhone == "") {
          this.classHandel("labelRemova", "loginMobileL");
          this.err.login_m_err = "手机号不能为空";
          this.classHandel("errAdd", "login_m_err");
        } else {
          // 判断是否为电话号码
          if (!this.phoneRule.test(this.form.loginPhone)) {
            this.err.login_m_err = "手机号码格式错误";
            this.classHandel("errAdd", "login_m_err");
          } else {
            this.classHandel("errRemove", "login_m_err");
          }
        }
      } else {
        if (this.form.loginPassword == "") {
          this.classHandel("labelRemova", "loginPassL");
          this.err.login_p_err = "密码不能为空";
          this.classHandel("errAdd", "login_p_err");
        } else {
          this.classHandel("errRemove", "login_p_err");
        }
      }
    },
    // 登录聚焦样式变化
    loginFocus(e) {
      if (e.target.id == "loginMobile") {
        this.classHandel("labelAdd", "loginMobileL");
      } else {
        this.classHandel("labelAdd", "loginPassL");
      }
    },
    // 注册失焦样式变化
    regBlur(e) {
      if (e.target.id == "regMobile") {
        if (this.form.regPhone == "") {
          this.classHandel("labelRemova", "regMobileL");
          this.err.reg_m_err = "手机号不能为空";
          this.classHandel("errAdd", "reg_m_err");
        } else {
          // 判断是否为电话号码
          if (!this.phoneRule.test(this.form.regPhone)) {
            this.err.reg_m_err = "手机号码格式错误";
            this.classHandel("errAdd", "reg_m_err");
          } else {
            this.classHandel("errRemove", "reg_m_err");
          }
        }
      } else if (e.target.id == "regPassword") {
        if (this.form.regPassword == "") {
          this.classHandel("labelRemova", "regPassL");
          this.err.reg_p_err = "密码不能为空";
          this.classHandel("errAdd", "reg_p_err");
        } else {
          this.classHandel("errRemove", "reg_p_err");
        }
      } else {
        if (this.form.regSamePass == "") {
          this.classHandel("labelRemova", "regSamePassL");
          this.err.reg_cp_err = "确认密码不能为空";
          this.classHandel("errAdd", "reg_cp_err");
        } else {
          if (this.form.regPassword != this.form.regSamePass) {
            this.err.reg_cp_err = "密码不匹配";
            this.classHandel("errAdd", "reg_cp_err");
          } else {
            this.classHandel("errRemove", "reg_cp_err");
          }
        }
      }
    },
    // 注册聚焦样式变化
    regFocus(e) {
      if (e.target.id == "regMobile") {
        this.classHandel("labelAdd", "regMobileL");
      } else if (e.target.id == "regPassword") {
        this.classHandel("labelAdd", "regPassL");
      } else {
        this.classHandel("labelAdd", "regSamePassL");
      }
    },
    // 发送数据去vuex执行登录请求
    loginSubmit() {
      const values = {
        modile: this.form.loginPhone,
        password: this.form.loginPassword,
      };
      if (this.form.loginPhone == "" && this.form.loginPassword == "") {
        this.err.login_m_err = "手机号不能为空";
        this.err.login_p_err = "密码不能为空";
        this.classHandel("errAdd", "login_p_err");
        this.classHandel("errAdd", "login_m_err");
        // Toast.fail("请填写账号密码");
      } else if (this.form.loginPassword == "") {
        this.err.login_p_err = "密码不能为空";
        this.classHandel("errAdd", "login_p_err");
        // Toast.fail("请填写密码");
      } else if (this.form.loginPhone == "") {
        this.err.login_m_err = "手机号不能为空";
        this.classHandel("errAdd", "login_m_err");
        // Toast.fail("请填写手机号");
      } else if (
        this.phoneRule.test(this.form.loginPhone) &&
        this.form.loginPassword != ""
      ) {
        // 执行
        this.$store.dispatch("loginStore/loginResquest", values);
      }
    },
    // 注册请求
    async regiaterSubmit() {
      const regValues = {
        modile: this.form.regPhone,
        password: this.form.regPassword,
      };
      if (
        this.form.regPhone == "" &&
        this.form.regPassword == "" &&
        this.form.regSamePass == ""
      ) {
        this.err.reg_m_err = "手机号不能为空";
        this.err.reg_p_err = "密码不能为空";
        this.err.reg_cp_err = "确认密码不能为空";
        this.classHandel("errAdd", "reg_m_err");
        this.classHandel("errAdd", "reg_p_err");
        this.classHandel("errAdd", "reg_cp_err");
      } else if (this.form.regPhone == "" && this.form.regPassword == "") {
        this.err.reg_m_err = "手机号不能为空";
        this.err.reg_p_err = "密码不能为空";
        this.classHandel("errAdd", "reg_m_err");
        this.classHandel("errAdd", "reg_p_err");
      } else if (this.form.regPhone == "" && this.form.regSamePass == "") {
        this.err.reg_m_err = "手机号不能为空";
        this.err.reg_cp_err = "确认密码不能为空";
        this.classHandel("errAdd", "reg_m_err");
        this.classHandel("errAdd", "reg_cp_err");
      } else if (this.form.regPassword == "" && this.form.regSamePass == "") {
        this.err.reg_p_err = "密码不能为空";
        this.err.reg_cp_err = "确认密码不能为空";
        this.classHandel("errAdd", "reg_p_err");
        this.classHandel("errAdd", "reg_cp_err");
      } else if (this.form.regPhone === "") {
        this.err.reg_m_err = "手机号不能为空";
        this.classHandel("errAdd", "reg_m_err");
      } else if (this.form.regPassword === "") {
        this.err.reg_p_err = "密码不能为空";
        this.classHandel("errAdd", "reg_p_err");
      } else if (this.form.regSamePass == "") {
        this.err.reg_cp_err = "密码不匹配";
        this.classHandel("errAdd", "reg_cp_err");
      } else if (this.form.regPassword != this.form.regSamePass) {
        this.err.reg_cp_err = "密码不匹配";
        this.classHandel("errAdd", "reg_cp_err");
      } else if (
        this.phoneRule.test(this.form.regPhone) &&
        this.form.regPassword === this.form.regSamePass
      ) {
        // 执行
        try {
          const res = await this.$store.dispatch(
            "loginStore/registerResquest",
            regValues
          );
          // 获得注册返回的账号密码执行登录
          this.$store.dispatch("loginStore/loginResquest", res);
        } catch (error) {
          return false;
        }
      }
    },
    // 回车登录
    keyEnter() {
      document.onkeydown = (e) => {
        if (e.key === "Enter" && this.$refs.loginBtn) {
          this.loginSubmit();
        } else if (e.key === "Enter" && this.$refs.regBtn) {
          this.regiaterSubmit();
        } else {
          return true;
        }
      };
    },
    // 返回
    back() {
      if (this.hasBackHistory) {
        this.$router.back(1);
      } else {
        this.$router.push("/home");
      }
    },
    // 登录密码点击是否显示密码
    loginEye(e) {
      this.eyeHandle(e, "loginRef");
    },
    // 注册密码点击是否显示密码
    regPassEye(e) {
      this.eyeHandle(e, "regPassRef");
    },
    // 确认密码点击是否显示密码
    regSameEye(e) {
      this.eyeHandle(e, "regSameRef");
    },
    // 菜单栏
    onSelect(action, index) {
      switch (index) {
        case 0:
          this.$router.push("/");
          break;
        case 1:
          this.$router.push("/category");
          break;
        case 2:
          this.$router.push("/shop");
          break;
        case 3:
          this.$router.push("/home");
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  padding: 10px;
  // 登录页面头部
  header {
    .login_head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        font-size: 18px;
        font-weight: 700;
      }
      .head_back {
      }
      .head_text {
        font-size: 16px;
        line-height: 40px;
      }
      .head_option {
      }
    }
    .logo {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 50px 0;
      img {
        max-width: 200px;
        height: 100%;
      }
    }
  }
  // 登录页面主体
  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ::v-deep .van-tabs {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .van-tabs__wrap {
        width: 80%;
        // border: 1px solid #000;
        border-radius: 20px;
        .van-tabs__nav {
          background-color: rgba(240, 240, 240, 1);
        }
        .van-tab {
          width: 50%;
          .van-tab__text {
            font-size: 16px;
          }
        }
      }
      .van-tabs__content {
        width: 100%;
        margin-top: 20px;
      }
    }
    .form {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      // 错误提示样式
      .err_msg {
        position: absolute;
        bottom: -15px;
        left: 15%;
        transform: scale(0);
        transform-origin: 50% 0;
        color: #f04645;
      }
      // 错误提示变化样式
      .errChange {
        transform: scale(1);
        z-index: 10;
        transition: all 0.2s ease;
      }
      .label {
        position: absolute;
        top: 50%;
        left: 18%;
        transform: translateY(-50%);
        color: rgba(0, 0, 0, 0.4);
        font-size: 14px;
        transition: all 0.3s ease;
        pointer-events: none;
      }
      .labelActive {
        font-size: 12px;
        top: 20%;
        // color: #f04645;
        transition: all 0.2s ease;
        margin-bottom: 10px;
      }
      // 输入框
      input {
        box-sizing: border-box;
        width: 80%;
        height: 60px;
        padding: 20px 10px 10px 8%;
        background-color: rgba(240, 240, 240, 1);
        border: none;
        border-radius: 20px;
        font-size: 16px;
      }
      input::-ms-clear,
      input::-ms-reveal {
        display: none;
      }
      // icon
      i {
        position: absolute;
        right: 18%;
        top: 50%;
        transform: translateY(-50%);
        font-size: 16px;
      }
      // 按钮样式
      .btn {
        box-sizing: border-box;
        width: 80%;
        height: 50px;
        // padding: 20px 10px 10px 8%;
        background-color: rgba(240, 240, 240, 1);
        border: none;
        border-radius: 25px;
        font-size: 16px;
      }
    }
  }
  // 登录页面底部
  footer {
  }
}
</style>
