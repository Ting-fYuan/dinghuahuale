import http from "@/utils/http";
// 地址 api

// 获取所有城市地址
export const getAllCityApi = (params) => {
  return http({
    url: "/city",
    method: "GET",
    params,
  });
};

// 获取用户默认地址
export const defaultAddressApi = () => {
  return http({
    url: "/defalutAddress",
    method: "GET",
    headers: {
      isToken: true,
    },
  });
};

// 获取用户地址
export const getAddressApi = () => {
  return http({
    url: "/address",
    method: "GET",
    headers: {
      isToken: true,
    },
  });
};

// 新增地址
export const addressApi = (data) => {
  return http({
    url: "/address",
    method: "POST",
    data,
    headers: {
      isToken: true,
    },
  });
};

// 设置默认地址
export const setDefaultApi = ($id) => {
  return http({
    url: `/setDefault/${$id}`,
    method: "POST",
    headers: {
      isToken: true,
    },
  });
};

// 更新地址
export const updateAddressApi = ($id, data) => {
  return http({
    url: `/address/${$id}`,
    method: "PUT",
    data,
    headers: {
      isToken: true,
    },
  });
};

// 删除地址
export const deleteAddressApi = ($id) => {
  return http({
    url: `/address/${$id}`,
    method: "DELETE",
    headers: {
      isToken: true,
    },
  });
};

// 获取自己的地址列表
export const addressList = () => {
  return http({
    url: "/address",
    method: "GET",
    headers: {
      isToken: true,
    },
  });
};
