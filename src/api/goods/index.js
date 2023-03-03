import http from "@/utils/http.js";
// 商品 api
// 样品
export const logoSwiper = (params) => {
  return http({
    url: `/carousel/${params}`,
    method: "GET",
    headers: {
      isToken: true,
    },
  });
};

// 获取单个商品信息
export const goodsDataApi = (id) => {
  return http({
    url: `/goods/${id}`,
    method: "GET",
  });
};
