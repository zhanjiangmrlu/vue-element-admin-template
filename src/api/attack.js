import request from "../utils/request";

// 态势报告列表
export const getAttackList = (params = {}) => {
  return request.request({
    url: "linkage/attack_report/list",
    method: "GET",
    params,
  });
};

//生成日报
export const dailplyReport = (params = {}) => {
  return request.request({
    url: "linkage/attack_report",
    method: "POST",
    params,
  });
};
