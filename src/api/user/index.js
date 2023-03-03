import http from "@/utils/http";
// 用户 api

// 登录
export const login = (data) => {
  return http({
    url: "/login",
    method: "POST",
    data,
  });
};

// 退出登录
export const logout = () => {
  return http({
    url: "/logout",
    method: "POST",
    headers: {
      isToken: true,
    },
  });
};

// 注册
export const register = (data) => {
  return http({
    url: "/register",
    method: "POST",
    data,
  });
};

// 更新用户信息
export const uqdateUserInfo = (userID, data) => {
  return http({
    url: `/user/${userID}`,
    method: "PUT",
    data,
    headers: {
      isToken: true,
    },
  });
};
