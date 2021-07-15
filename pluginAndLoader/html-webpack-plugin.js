const path = require("path");
const fs = require("fs");
class HtmlWebpackPlugin {
  constructor(option) {
    // 初始化插件
    this.option = option;
    // 设置输出目录文件
    this.outputPath = path.resolve(process.cwd(), "./dist/index.html");
    // 获取默认html模板
    const { template } = this.option;
    // 生成模板路径
    const fileSrc = path.resolve(process.cwd(), template);
    // 获取模板内容
    this.html = fs.readFileSync(fileSrc, {
      encoding: "utf-8",
    });
  }
  apply(compiler) {
    // 在 asset 被输出时执行。此钩子可以访问被输出的 asset 的相关信息，例如它的输出路径和字节内容。
    compiler.hooks.assetEmitted.tapAsync("HtmlWebpackPlugin", (file) => {
      // 分割模板
      const [sHtmlContent, eHtmlContent] = this.html.split("</body>");
      // 创建js脚本块
      const jss = `<script src="./${file}"></script>\n`;
      // 生成新的html模板
      this.html = `${sHtmlContent}${jss}</body>${eHtmlContent}`;
      // html写出
      fs.writeFileSync(this.outputPath, this.html);
    });
  }
}

module.exports = HtmlWebpackPlugin;
