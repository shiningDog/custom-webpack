const path = require("path");
const fs = require("fs");
class HtmlWebpackPlugin {
  constructor(option) {
    this.option = option;
    this.outputPath = path.resolve(process.cwd(), "./dist/index.html");
    const { template } = this.option;
    const fileSrc = path.resolve(process.cwd(), template);
    const htmlContent = fs.readFileSync(fileSrc, {
      encoding: "utf-8",
    });
    this.html = htmlContent;
  }
  apply(compiler) {
    compiler.hooks.assetEmitted.tapAsync("HtmlWebpackPlugin", (file) => {
      const [sHtmlContent, eHtmlContent] = this.html.split("</body>");
      const jss = `<script src="./${file}"></script>\n`;
      this.html = `${sHtmlContent}${jss}</body>${eHtmlContent}`;
      fs.writeFileSync(this.outputPath, this.html);
    });
  }
}

module.exports = HtmlWebpackPlugin;
