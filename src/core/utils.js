/**
 * Created by jiangyukun on 2016/11/26.
 */

/**
 * 将对象转化为地址栏参数
 * @param paramObj
 * @returns {string}
 */
export function urlParam(paramObj) {
  let paramUrl = ''
  let current = 0
  for (let param in paramObj) {
    if (paramObj.hasOwnProperty(param)) {
      if (paramObj[param]) {
        let prefix = ''
        if (current++ == 0) {
          prefix = '?'
        } else {
          prefix = '&'
        }
        paramUrl += prefix + param + '=' + paramObj[param];
      }
    }
  }
  return encodeURI(paramUrl)
}

/**
 * fetch请求 表单参数 body处理
 * @param paramObj
 * @returns {string}
 */
export function bodyParam(paramObj) {
  let paramUrl = ''
  let current = 0
  for (let param in paramObj) {
    if (paramObj.hasOwnProperty(param)) {
      if (paramObj[param]) {
        let prefix = ''
        if (current++ == 0) {
          prefix = ''
        } else {
          prefix = ','
        }
        paramUrl += prefix + param + '=' + paramObj[param]
      }
    }
  }
  return encodeURI(paramUrl)
}
