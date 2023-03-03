import http from "@/utils/http.js";
// 轮播图 api

// 详情页轮播图
export const detailSwipe = (params) => {
  return http({
    url: "/carousel",
    method: "GET",
    params,
    headers: {
      isId: true,
    },
  });
};
// 获取轮播图单个信息
export const logoSwiper = (params) => {
  return http({
    url: `/carousel/${params}`,
    method: "GET",
    headers: {
      isToken: true,
    },
  });
};
