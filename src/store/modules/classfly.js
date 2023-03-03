import { indexImg } from "@/api/indexImg";

export default {
  //开启命名空间
  namespaced: true,
  state: {
    //存放细分类组件的请求的数据
    arr: [],
    //请求的类别的名字
    // name: "",
    classId: sessionStorage.getItem("classId") || 0,
  },
  mutations: {
    // 更新请求数据
    updateClassDate(state, payload) {
      // console.log(payload);
      state.arr = payload;
    },
    updateClassIdx(state, id) {
      state.classId = id;
      sessionStorage.setItem("classId", id);
    },
  },
  actions: {
    getClassData(ctx) {
      if (!ctx.state.arr.length) {
        indexImg()
          .then((res) => {
            // console.log(res.result);
            ctx.commit("updateClassDate", res.result);
          })
          .catch();
      }
    },
  },
};
