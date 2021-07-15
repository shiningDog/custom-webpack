const rimraf = require("rimraf");
const path = require("path");
class ClearDirPlugin {
  constructor(option) {
    console.log("ClearDirPlugin 初始化");
    this.option = option;
  }
  apply(compiler) {
    compiler.hooks.environment.tap("ClearDirPlugin", () => {
      console.log("ClearDirPlugin 执行了");
      const { dir } = this.option;
      const dirSrc = path.resolve(process.cwd(), dir);
      console.log("需要移除的目录路径", dirSrc);
      rimraf.sync(dirSrc);
    });
  }
}
module.exports = ClearDirPlugin;
