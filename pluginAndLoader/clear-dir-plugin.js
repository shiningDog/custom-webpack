const rimraf = require("rimraf");
const path = require("path");
class ClearDirPlugin {
  constructor(option) {
    this.option = option;
  }
  apply(compiler) {
    // 在编译器准备环境时调用，时机就在配置文件中初始化插件之后触发
    compiler.hooks.environment.tap("ClearDirPlugin", () => {
      // 获取配置的移除的目录路径
      const { dir } = this.option;
      // 获取完整路径
      const dirSrc = path.resolve(process.cwd(), dir);
      // 删除该目录
      rimraf.sync(dirSrc);
    });
  }
}
module.exports = ClearDirPlugin;
