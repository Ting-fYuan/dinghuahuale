import http from "@/utils/http.js";
// 购物车 api

// 添加商品到购物车
export const addShopCar = (data) => {
  return http({
    url: "/shoppingCart",
    method: "POST",
    data,
    headers: {
      isToken: true,
      isId: true,
    },
  });
};

// 获取用户购物车
export const getShopCarApi = (params) => {
  return http({
    url: "/shoppingCart",
    method: "GET",
    params,
    headers: {
      isToken: true,
      isId: true,
    },
  });
};

// 获取热门商品(猜你喜欢)
export const guessLikeApi = (params) => {
  return http({
    url: "/goods/hotGoods",
    method: "GET",
    params,
    headers: {
      isId: true,
    },
  });
};

// 删除购物车
export const delShopCarApi = ($id) => {
  return http({
    url: `/shoppingCart/${$id}`,
    method: "DELETE",
    headers: {
      isToken: true,
      isId: true,
    },
  });
};
