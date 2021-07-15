const printB = require("./printB");

module.exports = function printA() {
  console.log("module a!");
  printB();
};