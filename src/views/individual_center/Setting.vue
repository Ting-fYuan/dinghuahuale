<!-- 设置页面 -->
<template>
  <div class="wrap">
    <!-- 头部 -->
    <com-head title="账号信息"></com-head>
    <div class="SettingPage">
      <div class="PersonResource" @click="modal">
        <div class="userInfo">
          <div class="user">
            <div class="avatar">
              <img
                :src="
                  (info.header_img ?? '') === ''
                    ? defaultAvatar
                    : info.header_img
                "
                alt="头像"
              />
            </div>
            <div class="info">
              <span class="nikeName">{{ info.name }}</span>
              <p class="mobile">手机号： {{ info.phone }}</p>
            </div>
          </div>
          <div class="icon">
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
      </div>
      <div class="ModifyPassword" @click="passwordPanel = true">
        <div class="pass">
          <p class="passInfo">修改密码</p>
          <div class="icon">
            <i class="iconfont icon-suoding"></i>
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- @confirm="putPassword" -->
    <van-dialog
      v-model="passwordPanel"
      title="修改密码"
      show-cancel-button
      :before-close="onBeforeClose"
      @cancel="clearErr"
      confirm-button-text="保存"
      theme="round-button"
      confirmButtonColor="#884e22"
    >
      <!-- 旧密码模块 -->
      <div class="form">
        <div class="label" ref="oldPassRef">旧密码</div>
        <input
          v-model="form.oldPassword"
          type="text"
          id="oldPass"
          @blur="passBlur"
          @focus="passFocus"
        />
        <!-- 错误提示 -->
        <div class="err_msg" ref="old_p_err">{{ err.old_p_err }}</div>
      </div>
      <!-- 密码模块 -->
      <div class="form">
        <div class="label" ref="newPassRef">请输入新密码</div>
        <input
          v-model="form.newPassword"
          type="password"
          id="newPass"
          @blur="passBlur"
          @focus="passFocus"
          ref="newPassR"
        />
        <!-- 错误提示 -->
        <div class="err_msg" ref="new_p_err">{{ err.new_p_err }}</div>
        <!-- 眼睛 -->
        <i class="iconfont icon-yanjing-biyan" @click="newPassEye"></i>
      </div>
      <!-- 确认密码模块 -->
      <div class="form">
        <div class="label" ref="samePassRef">请输入确认密码</div>
        <input
          v-model="form.SamePassword"
          type="password"
          @blur="passBlur"
          @focus="passFocus"
          ref="samePassL"
        />
        <!-- 错误提示 -->
        <div class="err_msg" ref="same_p_err">{{ err.same_p_err }}</div>
        <!-- 眼睛 -->

        <i class="iconfont icon-yanjing-biyan" @click="samePassEye"></i>
      </div>
    </van-dialog>
    <footer>
      <button class="btn" @click="logout">退出登录</button>
    </footer>
  </div>
</template>

<script>
// 引入更新用户信息api
import { uqdateUserInfo, logout } from "@/api/user";
// 引入加密模块文件
import { Decrypt } from "@/utils/encryption";
// 引入vant组件提示
import { Toast } from "vant";
export default {
  name: "SettingView",
  data() {
    return {
      // 模块绑定的数据
      form: {
        // 旧密码
        oldPassword: "",
        // 新密码
        newPassword: "",
        // 确认密码
        SamePassword: "",
      },
      // 模块的错误提示
      err: {
        // 旧密码错误提示
        old_p_err: "",
        // 新密码错误提示
        new_p_err: "",
        // 确认密码错误提示
        same_p_err: "",
      },
      // 控制眼睛是否显示
      eyeShow: false,
      isShow: false,
      passwordPanel: false,
      // 默认头像
      defaultAvatar:
        "https://img2.baidu.com/it/u=3072027427,2673781637&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    };
  },
  created() {
    this.info = JSON.parse(localStorage.getItem("userInfo"));
  },
  methods: {
    // 修改密码
    async putPassword($data) {
      // 加密的电话
      const phoneDecryption = this.info.mAES;
      // 解密电话号码
      const realPhone = Decrypt(phoneDecryption);
      if (
        this.form.oldPassword === "" &&
        this.form.newPassword === "" &&
        this.form.SamePassword === ""
      ) {
        this.err.old_p_err = "旧密码不能为空";
        this.err.new_p_err = "密码不能为空";
        this.err.same_p_err = "确认密码不能为空";
        this.classHandel("errAdd", "old_p_err");
        this.classHandel("errAdd", "new_p_err");
        this.classHandel("errAdd", "same_p_err");
        $data(false);
      } else if (this.form.oldPassword === "" && this.form.newPassword === "") {
        this.err.old_p_err = "旧密码不能为空";
        this.err.new_p_err = "密码不能为空";
        this.classHandel("errAdd", "old_p_err");
        this.classHandel("errAdd", "new_p_err");
        $data(false);
      } else if (
        this.form.newPassword === "" &&
        this.form.SamePassword === ""
      ) {
        this.err.new_p_err = "密码不能为空";
        this.err.same_p_err = "确认密码不能为空";
        this.classHandel("errAdd", "new_p_err");
        this.classHandel("errAdd", "same_p_err");
        $data(false);
      } else if (
        this.form.oldPassword === "" &&
        this.form.SamePassword === ""
      ) {
        this.err.old_p_err = "旧密码不能为空";
        this.err.same_p_err = "确认密码不能为空";
        this.classHandel("errAdd", "old_p_err");
        this.classHandel("errAdd", "same_p_err");
        $data(false);
      } else if (this.form.oldPassword === "") {
        this.err.old_p_err = "旧密码不能为空";
        this.classHandel("errAdd", "old_p_err");
        $data(false);
      } else if (this.form.newPassword === "") {
        this.err.new_p_err = "密码不能为空";
        this.classHandel("errAdd", "new_p_err");
        $data(false);
      } else if (this.form.SamePassword === "") {
        this.err.same_p_err = "确认密码不能为空";
        this.classHandel("errAdd", "same_p_err");
        $data(false);
      } else {
        try {
          // 性别修改
          let uqdateRes = await uqdateUserInfo(this.info.id, {
            name: this.info.name,
            phone: realPhone,
            password: this.form.newPassword,
          });
          Toast.success("修改成功");
          this.$store.commit("loginStore/updateUserInfo", uqdateRes.result);
          $data();
        } catch (error) {
          console.log(error);
          $data(false);
        }
      }
    },
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
    // 密码失焦样式变化
    passBlur(e) {
      if (e.target.id == "oldPass") {
        if (this.form.oldPassword == "") {
          this.classHandel("labelRemova", "oldPassRef");
          this.err.old_p_err = "旧密码不能为空";
          this.classHandel("errAdd", "old_p_err");
        } else {
          // 加密的密码
          const passwordDecryption = this.info.pAES;
          // 解密密码
          const realPassword = Decrypt(passwordDecryption);
          if (this.form.oldPassword != realPassword) {
            this.err.old_p_err = "密码错误";
            this.classHandel("errAdd", "old_p_err");
          } else {
            this.classHandel("errRemove", "old_p_err");
          }
        }
      } else if (e.target.id == "newPass") {
        if (this.form.newPassword == "") {
          this.classHandel("labelRemova", "newPassRef");
          this.err.new_p_err = "密码不能为空";
          this.classHandel("errAdd", "new_p_err");
        } else {
          this.classHandel("errRemove", "new_p_err");
        }
      } else {
        if (this.form.SamePassword == "") {
          this.classHandel("labelRemova", "samePassRef");
          this.err.same_p_err = "确认密码不能为空";
          this.classHandel("errAdd", "same_p_err");
        } else {
          if (this.form.newPassword != this.form.SamePassword) {
            this.err.same_p_err = "密码不匹配";
            this.classHandel("errAdd", "same_p_err");
          } else {
            this.classHandel("errRemove", "same_p_err");
          }
        }
      }
    },
    // 密码聚焦样式变化
    passFocus(e) {
      if (e.target.id == "oldPass") {
        this.classHandel("labelAdd", "oldPassRef");
      } else if (e.target.id == "newPass") {
        this.classHandel("labelAdd", "newPassRef");
      } else {
        this.classHandel("labelAdd", "samePassRef");
      }
    },
    // 新密码点击是否显示密码
    newPassEye(e) {
      this.eyeHandle(e, "newPassR");
    },
    // 确认密码点击是否显示密码
    samePassEye(e) {
      this.eyeHandle(e, "samePassL");
    },
    // 点击取消去除错误提示的
    clearErr() {
      this.form.oldPassword = "";
      this.form.newPassword = "";
      this.form.SamePassword = "";
      this.classHandel("errRemove", "old_p_err");
      this.classHandel("errRemove", "new_p_err");
      this.classHandel("errRemove", "same_p_err");
      this.classHandel("labelRemova", "oldPassRef");
      this.classHandel("labelRemova", "newPassRef");
      this.classHandel("labelRemova", "samePassRef");
    },
    // 弹出框关闭前回调
    onBeforeClose(action, done) {
      if (action === "confirm") {
        this.putPassword(done);
      } else {
        done();
      }
    },
    // 退出登录
    async logout() {
      let logoutRes = await logout({});
      if (logoutRes) {
        this.$store.commit("loginStore/clearUserInfo");
        this.$store.commit("addressStore/clearAddress");
        this.$store.commit("shopCarStore/clearShopCar");
        this.$router.push("/login");
      }
    },
    // 跳转修改页
    modal() {
      this.$router.push({
        name: "personalInfo",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  .SettingPage {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    transform: translateY(1vh);
    padding: 20px;
    .PersonResource {
      width: 100%;
      height: 70px;
      border-radius: 15px;
      margin-bottom: 10px;
      background: rgba(233, 236, 240, 1);
      display: flex;
      align-content: center;
      cursor: pointer;
      .userInfo {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        .user {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          height: 40px;
          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
            .van-image {
              width: 100%;
              height: 100%;
            }
          }
          .info {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 5vw;
            .nikeName {
              font-size: 20px;
              color: #000;
              font-weight: 500;
              font-family: "MiSans", "Blackbody";
            }
            .mobile {
              font-size: 15px;
              font-family: "MiSans", "Blackbody";
              color: rgba(0, 0, 0, 0.6);
            }
          }
        }
        .icon {
          .iconfont {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }
    }
    .ModifyPassword {
      width: 100%;
      height: 70px;
      border-radius: 15px;
      background: rgba(233, 236, 240, 1);
      display: flex;
      justify-content: center;
      align-content: center;
      margin-bottom: 10px;
      cursor: pointer;
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
          &:nth-child(1) {
            color: skyblue;
            font-size: 18px;
          }
        }
      }
      .pass {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
      }
      .passInfo {
        font-size: 16px;
        color: #000;
        font-weight: 500;
        font-family: "MiSans", "Blackbody";
      }
    }
  }
  ::v-deep .van-dialog {
    .van-dialog__header {
      padding: 20px 0;
    }
    .van-dialog__content {
      .form {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        font-size: 12px;
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
      }
    }
    .van-dialog__footer {
      padding-top: 10px;
      .van-button {
        height: 50px;
      }
    }
  }
  footer {
    width: 100%;
    position: fixed;
    bottom: 3vh;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      width: 80%;
      height: 50px;
      line-height: 50px;
      border-radius: 25px;
      background: rgba(233, 236, 240, 1);
      display: flex;
      justify-content: center;
      align-content: center;
      border: none;
      font-size: 18px;
      color: #000;
      font-weight: 500;
      font-family: "MiSans", "Blackbody";
      cursor: pointer;
    }
  }
}
</style>
