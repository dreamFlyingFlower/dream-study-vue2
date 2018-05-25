// jshint esversion:6
// jshint node:true
import FileSaver from 'file-saver';
import XLSX from 'xlsx';

export default {
  exportExcel,
  transTime
};

const oneDay = 86400000;//一天的毫秒数
/**
 * 结合eliment-ui的el-table标签,导出表格的数据成一个excel文件
 * @param  {[type]} tag 表格所在的dom节点
 */
function exportExcel(tag) {
  var wb = XLSX.utils.table_to_book(document.querySelector(tag));
  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  });
  try {
    FileSaver.saveAs(new Blob([wbout], {
      type: 'application/octet-stream'
    }), 'sheetjs.xlsx');
  } catch (e) {
    if (typeof console !== 'undefined') {
      console.log(e, wbout);
    }
  }
  return wbout;
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