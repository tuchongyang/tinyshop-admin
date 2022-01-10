export function deepClone(source) {
  if (!source || typeof source !== "object" || source instanceof Date || source instanceof File) {
    return source
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function getFileSize(val = 0) {
  var map = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB", "DB", "NB"]
  var index = 0
  var result = val
  while (result > 1000) {
    result = result / 1000
    index++
  }
  let finalVal = result.toFixed(2).replace(/(\.0+|0+)$/, "")
  finalVal = amountFilter(finalVal)
  return {
    value: finalVal,
    unit: map[index],
  }
}
export function amountFilter(num, digit = 2) {
  if (typeof num === "undefined") return "--"
  if (!num) {
    return "0." + new Array(digit).fill("0").join("")
  }
  num = parseFloat(num).toFixed(digit) //-0.0005返回仍然是-0.00
  let parts = num.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  if (num == "-0" || num == "-0.00") {
    parts[0] = 0
  }
  return parts.join(".")
}
