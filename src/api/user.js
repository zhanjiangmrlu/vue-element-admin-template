import request from "../utils/request";

//用户列表
export const getUserList = (data = {}) => {
  return request.request({
    url: "system/user_manager",
    method: "GET",
    data,
  });
};
