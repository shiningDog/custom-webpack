/*
 * @Descripttion:
 * @Author: Weize
 * @Date: 2021-06-22 16:25:25
 * @LastEditors: Weize
 * @LastEditTime: 2021-06-22 16:36:51
 */
module.exports = function () {
  return {
    visitor: {
      Identifier(path) {
        let name = path.node.name; // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name.split("").reverse().join("");
        console.log(path.node.name);
      },
    },
  };
};
