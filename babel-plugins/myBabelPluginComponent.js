module.exports = function ({ types }) {
  let libraryName = "";
  // 驼峰转横线
  function umpHunderline(data) {
    return data
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .slice(1);
  }

  //创建require节点
  function creatRequire(name) {
    // 设置横线名
    const underlineName = umpHunderline(name);
    // 导出创建好的ast
    return types.VariableDeclaration("const", [
      types.VariableDeclarator(
        types.Identifier(name),
        types.CallExpression(types.Identifier("require"), [
          types.stringLiteral(`element-ui/lib/${underlineName}.js`),
        ])
      ),
    ]);
  }

  return {
    visitor: {
      // 初始块，只执行一次的代码块
      Program(_, { opts }) {
        // 获取按需引入的包名
        libraryName = opts.libraryName || "element-ui";
      },
      ImportDeclaration(path) {
        const { node } = path;
        // 判断import导入的模块是否为element-ui的模块
        if (node.source.value === libraryName) {
          // 替换 import 变成按需的 require
          path.replaceWithMultiple(
            // 获取定义的的组件名，转化node（const el = require('element-ui/lib/el.js')）
            node.specifiers.map((ImportSpecifier) =>
              creatRequire(ImportSpecifier.imported.name)
            )
          );
        }
      },
    },
  };
};
