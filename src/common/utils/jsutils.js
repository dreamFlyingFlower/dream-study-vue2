// jshint esversion:6
// jshint node:true
import FileSaver from 'file-saver';
import XLSX from 'xlsx';

export default {
  exportExcel,
  exportExcelObj,
  exportExcelArr,
  joinUrl,
  transTime,
  getNow,
  checkUser
};

const oneDay = 86400000; //一天的毫秒数
/**
 * 结合eliment-ui的el-table标签,导出表格的数据成一个excel文件,只能导出单页的excel
 * @param  {[type]} tag 表格所在的dom节点
 */
function exportExcel(tag, name) {
  var wb = XLSX.utils.table_to_book(document.querySelector(tag));
  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  });
  if (!name) {
    name = "sheet.xls";
  }
  if (!name.endsWith('.xls')) {
    name += ".xls";
  }
  try {
    FileSaver.saveAs(new Blob([wbout], {
      type: 'application/octet-stream'
    }), name);
  } catch (e) {
    if (typeof console !== 'undefined') {
      console.log(e, wbout);
    }
  }
  return wbout;
}
/**
 * 前端导出所有数据excel
 * @param list 需要导出的数据,数组对象集合,每个对象中的key需要个filterVal中的一一对应
 * @param header excel第一行显示的中文字段说明
 * @param filterVal 需要对原始数据进行拦截分类的字段,是一个数组["stationName","inTot","outTot"];
 * @param name 需要导出的文件名字,不需要带xls或xlsx
 */
function exportExcelObj(list, header, filterVal, name) {
  if((header && header.length === 0) || (list && list.length === 0 || (filterVal && filterVal.length === 0))) {
    return;
  }
  if(header.length !== filterVal.length){
    return;
  }
  if(!name){
    name = "表格数据";
  }
  require.ensure([],()=>{
    const {export_json_to_excel} = require("../vendor/Export2Excel");
    const data = list.map(v => filterVal.map(j => v[j]));
    export_json_to_excel(header, data, name);
  });
}

/**
 * 前端导出所有数据excel
 * @param list 需要导出的数据,数组的集合,是一个二维数组,每一个子数组中有多个元素
 * @param header excel第一行显示的中文字段说明
 * @param name 需要导出的文件名字,不需要带xls或xlsx
 */
function exportExcelArr(list, header, name) {
  if((header && header.length === 0) || (list && list.length === 0 || (filterVal && filterVal.length === 0))) {
    return;
  }
  if(!name){
    name = "表格数据";
  }
  require.ensure([],()=>{
    const {export_json_to_excel} = require("../vendor/Export2Excel");
    export_json_to_excel(header, list, name);
  });
}

/**
 * 拼接参数到url后面
 * @param uri
 * @param params 对象参数
 */
function joinUrl(url, params) {
  if (typeof params !== "object") {
    return url;
  } else {
    let param = [];
    for (let k in params) {
      param.push(k + "=" + params[k]);
    }
    return encodeURI(url + "?" + param.join("&"));
  }
}

/**
 * 判断是否为闰年
 */
function isLeapYear() {
  if ((yyyy % 4 == 0 && yyyy % 100 != 0) || yyyy % 400 == 0) {
    return true;
  }
  return false;
}
/**
 * 获得某个月的最后一天
 */
function getLastDay(month) {
  switch (month) {
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    default:
      return 31;
  }
}
/**
 * 获得yyyy-MM-dd格式的年月日时间
 * @param  {[Date]} date [一个Date类型参数]
 * @return [yyyy-MM-dd的字符串]
 */
function getYmd(date) {
  if (!date) {
    return;
  }
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return date.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day);
}

/**
 * 今日,本周,本月时间转换,转换为开始时间,结束时间
 */
function transTime(type) {
  // 今天凌晨到23:59:59
  if (type === 1) {
    let today = getYmd(new Date());
    return {
      beginTime: today + " 00:00:00",
      endTime: today + " 23:59:59"
    };
    // 本周
  } else if (type === 2) {
    let date = new Date();
    let week = date.getDay();
    if (week === 0) {
      let monday = date.getTime() - 6 * oneDay;
      return {
        beginTime: getYmd(new Date(monday)) + " 00:00:00",
        endTime: getYmd(new Date(date)) + " 23:59:59"
      };
    } else {
      let monday = date.getTime() - (week - 1) * oneDay;
      let sunday = date.getTime() + (7 - week) * oneDay;
      return {
        beginTime: getYmd(new Date(monday)) + " 00:00:00",
        endTime: getYmd(new Date(sunday)) + " 23:59:59"
      };
    }
    // 本月
  } else if (type === 3) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    let lastDay = getLastDay(month);
    if (month === 2) {
      lastDay = isLeapYear(year) ? 29 : 28;
    }
    return {
      beginTime: year + "-" + month + "-" + "01" + " 00:00:00",
      endTime: year + "-" + month + "-" + lastDay + " 23:59:59"
    };
    // 本季度
  } else if (type === 4) {
    // 本年
  } else if (type === 5) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1 > 9 ? date.getMonth() : "0" + date.getMonth();
    return {
      beginTime: year + "-01-01 00:00:00",
      endTime: year + "-12-31 23:59:59"
    };
  }
}
/**
 * 获得当前时间的字符串,yyyy-MM-dd HH:mm:ss
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
function getNow(date) {
  let today = getYmd(date);
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  return today + " " + (hour > 9 ? hour : "0" + hour) + ":" + (minute > 9 ? minute : "0" + minute) +
    ":" + (second > 9 ? second : "0" + second);
}

/**
 * 检测用户信息
 */
function checkUser() {
  let userInfo = localStorage.getItem("user");
  if (userInfo) {
    try {
      return JSON.parse(userInfo);
    } catch (error) {
      console.log(error);
      this.$message.error("用户信息错误,请重新登录");
      this.$router.push({
        path: "/"
      });
    }
  } else {
    this.$message("登录超时,请重新登录");
    this.$router.push({
      path: "/"
    });
  }
}
