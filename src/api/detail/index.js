/* eslint-disable prettier/prettier */
import http from "@/utils/http.js";
export const consondend = (id) => {
  return http({
    url: `goods/${id}`,
    method: "GET",
  });
};
