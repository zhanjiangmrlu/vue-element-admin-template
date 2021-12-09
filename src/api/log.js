import request from "../utils/request";

//操作日志列表页数据
export const getLogData = (params={})=>{
  return request.request({
    url:'system/log',
    method:'GET',
    params
  })
}
