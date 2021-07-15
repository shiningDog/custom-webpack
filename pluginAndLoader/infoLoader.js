module.exports = function (resource) {
  const fltTmp = resource.replace(/\n|\s/g, "");
  const options = this.getOptions();
  const result = `
  export default function tmp(data) {
    const strTmp = "${fltTmp}"
      .replace(/\{\{(.*?)\}\}/g, function (_, key) {
        return data[key];
      });
      console.log('strTmp',strTmp)
      return  '<${options.dom || "div"}>'+strTmp+'</${options.dom || "div"}>'
  }
  `;
  return result;
};
