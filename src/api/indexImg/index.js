import http from "@/utils/http.js";
// 首页一秒选花 api

export const indexImg = (params) => {
  return http({
    url: "/classify/classifyGoods",
    method: "GET",
    params,
    headers: {
      isId: true,
    },
  });
};
