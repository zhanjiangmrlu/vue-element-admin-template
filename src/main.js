import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/index.scss";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(ElementUI, { size: "mini" });

//全局配置时间戳转化
//时间戳转化成格式时间
Vue.prototype.formatConversion = function (te) {
  if (te == "") {
    return "";
  } else if (te.length == 10) {
    var time = new Date(te * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var y = time.getFullYear();
    var m =
      time.getMonth() < 9 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
    var d = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
    var h = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
    var mm =
      time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
    var s =
      time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
    var timedate = y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
    return timedate;
  } else {
    time = new Date(te);
    y = time.getFullYear();
    m = time.getMonth() < 9 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
    d = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
    h = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
    mm = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
    s = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
    timedate = y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
    return timedate;
  }
};
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
