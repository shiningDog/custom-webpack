module.exports = function (resource) {
  // 生成无空格无换行模板
  const fltTmp = resource.replace(/\n|\s/g, "");
  // 获取该loader配置
  const options = this.getOptions();
  // 设置编译后的模板
  const result = `
  export default function tmp(data) {
    const strTmp = "${fltTmp}"
      .replace(/\{\{(.*?)\}\}/g, function (_, key) {
        return data[key];
      });
      return  '<${options.dom || "div"}>'+strTmp+'</${options.dom || "div"}>'
  }
  `;
  return result;
};
// // 编译模板为一个导出的方法
// export default function tmp(data) {
// // 方法内部执行模板替换
//   const strTmp = "${fltTmp}"
//   .replace(/\{\{(.*?)\}\}/g, function (_, key) {
//     return data[key];
//   });
// // 生成并导出新的模板字符串
//   return  '<${options.dom || "div"}>'+strTmp+'</${options.dom || "div"}>'
// }
