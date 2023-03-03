import http from "@/utils/http.js";
// 文件上传 api
// 单文件上传
export const SingleFile = (data) => {
  return http({
    url: "/update",
    method: "POST",
    data,
    headers: {
      isToken: false,
      "Content-Type": "multipart/form-data",
    },
  });
};
