<!-- 个人资料 -->
<template>
  <div class="wrap">
    <header>
      <i class="iconfont icon-zuojiantou" @click="toggle"></i>
      <p>个人信息</p>
    </header>
    <main>
      <div class="avatarModify">
        <div class="avatar">
          <img
            :src="
              (userInfo.header_img ?? '') === ''
                ? defaultAvatar
                : userInfo.header_img
            "
            alt="头像"
          />
          <span>头像</span>
        </div>
        <div class="Modify">
          <van-uploader image-fit="cover" :after-read="onSelectHead" />
          <i class="iconfont icon-youjiantou"></i>
        </div>
      </div>
      <van-divider />
      <div class="basicData">
        <p>基本资料</p>
        <ul>
          <li class="nikeName" @click="showSet.namePanel = !showSet.namePanel">
            <span class="userName">昵称</span>
            <div class="nameShow">
              <span>{{ userInfo.name }}</span>
              <i class="iconfont icon-youjiantou"></i>
            </div>
          </li>
          <li class="sex" @click="showSet.sexPanel = true">
            <span class="userName">性别</span>
            <div class="nameShow">
              <span>{{ modelSet.sex }}</span>
              <i class="iconfont icon-youjiantou"></i>
            </div>
          </li>
          <li class="modile">
            <span class="userName">手机号码</span>
            <div class="nameShow">
              <span>{{ userInfo.phone }}</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- @confirm="putName" -->
      <van-dialog
        v-model="showSet.namePanel"
        title="修改昵称"
        show-cancel-button
        :before-close="onBeforeClose"
      >
        <input
          type="text"
          v-model="modelSet.nikeName"
          placeholder="请输入昵称"
        />
      </van-dialog>
      <!-- 性别选择 -->
      <van-action-sheet
        v-model="showSet.sexPanel"
        :close-on-click-action="true"
        cancel-text="取消"
        :actions="actions"
        @select="onSelectSex"
      />
    </main>
    <footer>
      <button class="btn" @click="logout">退出登录</button>
    </footer>
  </div>
</template>

<script>
// 引入更新用户信息api
import { uqdateUserInfo, logout } from "@/api/user";
// 引入文件上传api
import { SingleFile } from "@/api/upload";
// 引入加密模块文件
import { Decrypt } from "@/utils/encryption";
// 引入vant组件提示
import { Toast } from "vant";
export default {
  name: "personalView",
  data() {
    return {
      // 显示面板集合
      showSet: {
        // 头像面板是否显示
        peadPanel: false,
        // 名字面板是否显示
        namePanel: false,
        // 性别面板是否显示
        sexPanel: false,
      },
      // 双向绑定集合
      modelSet: {
        // 头像
        avatar: "",
        // 昵称
        nikeName: "",
        // 性别
        sex: "",
      },
      // 用户信息
      userInfo: {},
      // 默认头像
      defaultAvatar:
        "https://img2.baidu.com/it/u=3072027427,2673781637&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      // 性别选择
      actions: [{ name: "男" }, { name: "女" }],
    };
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.modelSet.sex = this.userInfo.sex === 1 ? "男" : "女";
  },
  methods: {
    // 封装判断是否为图片函数
    assetTypeImage($data) {
      let lastIndex = $data.lastIndexOf(".");
      let ext = $data.substr(lastIndex + 1);
      return (
        [
          "png",
          "jpg",
          "jpeg",
          "bmp",
          "gif",
          "webp",
          "psd",
          "svg",
          "tiff",
        ].indexOf(ext.toLowerCase()) !== -1
      );
    },
    // 封装用户信息函数
    async uqdateUserInfo($data, $done) {
      // 加密的电话
      const phoneDecryption = this.userInfo.mAES;
      // 加密的密码
      const passwordDecryption = this.userInfo.pAES;
      // 解密电话号码
      const realPhone = Decrypt(phoneDecryption);
      // 解密密码
      const realPassword = Decrypt(passwordDecryption);
      if ($data == "男" || $data == "女") {
        try {
          // 性别修改
          let uqdateRes = await uqdateUserInfo(this.userInfo.id, {
            name: this.userInfo.name,
            phone: realPhone,
            password: realPassword,
            header_img: this.userInfo.header_img,
            sex: $data === "男" ? 1 : 2,
          });
          Toast.success("修改成功");
          this.$store.commit("loginStore/updateUserInfo", uqdateRes.result);
        } catch (error) {
          console.log(error);
        }
      } else if (this.assetTypeImage($data)) {
        try {
          // 头像修改
          let uqdateRes = await uqdateUserInfo(this.userInfo.id, {
            name: this.userInfo.name,
            phone: realPhone,
            password: realPassword,
            header_img: $data,
          });
          Toast.success("修改成功");
          this.$store.commit("loginStore/updateUserInfo", uqdateRes.result);
        } catch (error) {
          console.log(error);
        }
      } else {
        // 昵称修改
        try {
          let uqdateRes = await uqdateUserInfo(this.userInfo.id, {
            name: $data,
            phone: realPhone,
            password: realPassword,
          });
          Toast.success("修改成功");
          this.$store.commit("loginStore/updateUserInfo", uqdateRes.result);
          $done();
        } catch (error) {
          Toast.fail("名字过短");
          $done(false);
        }
      }
    },
    // 性别修改
    onSelectSex(item) {
      this.modelSet.sex = item.name;
      // 更新vuex和本地数据
      this.uqdateUserInfo(item.name);
    },
    // 头像修改
    async onSelectHead($file) {
      let fileRes = await SingleFile({
        file: $file.file,
      });
      this.uqdateUserInfo(fileRes.result.path);
      this.userInfo.header_img = fileRes.result.path;
    },

    // 昵称修改
    onBeforeClose(action, done) {
      if (action === "confirm") {
        this.uqdateUserInfo(this.modelSet.nikeName, done);
        this.userInfo.name = this.modelSet.nikeName;
      } else {
        done();
      }
    },
    // 退出登录
    async logout() {
      let logoutRes = await logout({});
      console.log(logoutRes);
      if (logoutRes) {
        this.$store.commit("loginStore/clearUserInfo");
        this.$router.push("/login");
      }
    },
    toggle() {
      this.$router.back(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  i {
    font-size: 12px;
  }
  header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 5vh;
    ::v-deep i {
      position: absolute;
      top: 0;
      left: 5px;
      font-size: 16px;
    }
    p {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.8);
    }
  }
  main {
    box-sizing: border-box;
    padding: 0 15px;
    .avatarModify {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .avatar {
        position: relative;
        display: flex;
        align-items: center;
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 25px;
        img {
          width: 100%;
          height: 100%;
        }
        span {
          position: absolute;
          right: -100%;
          font-size: 16px;
          z-index: 999;
          color: #000;
        }
      }
      .Modify {
        display: flex;
        align-items: center;
        color: rgba(0, 0, 0, 0.5);
        ::v-deep .van-uploader {
          .van-uploader__wrapper {
            .van-uploader__upload {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 40px;
              height: 40px;
              margin: 0;
            }
          }
        }
        span {
          font-size: 15px;
          margin-right: 3px;
        }
      }
    }
    .basicData {
      p {
        box-sizing: border-box;
        padding: 5px 0;
        font-size: 13px;
        color: #8c93b0;
      }
      ul {
        li {
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-content: center;
          padding: 18px 0;
          cursor: pointer;
          div {
            display: flex;
            align-items: center;
          }
          .userName {
            font-size: 17px;
            font-family: "Blackbody";
          }
          .nameShow {
            color: rgba(0, 0, 0, 0.5);
            span {
              font-size: 15px;
              margin-right: 3px;
            }
          }
        }
      }
    }
    ::v-deep .van-dialog {
      .van-dialog__content {
        box-sizing: border-box;
        padding: 20px;
        // 输入框
        input {
          box-sizing: border-box;
          width: 100%;
          height: 50px;
          padding-left: 20px;
          background-color: rgba(240, 240, 240, 1);
          border: none;
          border-radius: 20px;
          font-size: 16px;
        }
        input::-ms-clear,
        input::-ms-reveal {
          display: none;
        }
      }
    }
  }
  .pay {
    width: 100%;
    height: 100px;
    background-color: #ccc;
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
