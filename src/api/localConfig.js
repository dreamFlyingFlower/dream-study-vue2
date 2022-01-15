/**
 * 同步ajax请求,同步本地static/config中的配置文件,axios没办法同步
 * 慎用,控制台会出现同步警告,不用理会,也没办法消除
 */
export default {
  getLocalConfig
}

function getLocalConfig() {
  $.ajax({
    url: "http://localhost:5559/static/config.json",
    method: "get",
    async: false,
    success: function (result) {
      return result;
    }
  });
}