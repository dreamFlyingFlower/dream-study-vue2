export default {
  function get(url, data) {
    // 再返回一个Pormise,可以进行链式调用,就是写代码时好看...
    return new Promise((resolve, reject) => {
      // 方法调用,可以将成功的结果放到resolve中,失败的结果放到reject中
      // 成功之后的resolve可以利用then进行链式调用
      $.ajax({
        url: url,
        method: "get",
        data: data,
        success: function(resp) {
          resolve(resp);
        },
        error: function(error) {
          reject(error);
        }
      });
    });
  }
}

// 每次返回一个Promise,可以利用then进行链式调用
// 参数resp就是上次Promise调用成功的结果,注意该参数并不仅仅是后台返回的结果,还有一些其他属性
get(url, {}).then(resp => {
  return new Promise((resolve, reject) => {
    // 方法调用,可以将成功的结果放到resolve中,失败的结果放到reject中
    // 成功之后的resolve可以利用then进行链式调用
    $.ajax({
      url: url,
      method: "get",
      data: data,
      success: function(resp) {
        resolve(resp);
      },
      error: function(error) {
        reject(error);
      }
    });
  });
}).then(resp => {
  return new Promise((resolve, reject) => {
    // 方法调用,可以将成功的结果放到resolve中,失败的结果放到reject中
    // 成功之后的resolve可以利用then进行链式调用
    $.ajax({
      url: url,
      method: "get",
      data: data,
      success: function(resp) {
        resolve(resp);
      },
      error: function(error) {
        reject(error);
      }
    });
  });
})
