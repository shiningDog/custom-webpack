;(() => {
    var modules = {
      "./src/myIndex.js": function(module, exports, _require_) {
        eval(`const printA = _require_("./src/printA.js");

printA();`)
      },
"./src/printA.js": function(module, exports, _require_) {
        eval(`const printB = _require_("./src/printB.js");

module.exports = function () {
  console.log("A模块");
  printB();
};`)
      },
"./src/printB.js": function(module, exports, _require_) {
        eval(`module.exports = function () {
  console.log("B模块");
  printB();
};`)
      }
    }
    var modules_cache = {}
    var _require_ = function(moduleId) {
      if (modules_cache[moduleId]) return modules_cache[moduleId].exports

      var module = modules_cache[moduleId] = {
        exports: {}
      }
      modules[moduleId](module, module.exports, _require_)
      return module.exports
    }

    _require_('./src/myIndex.js')
  })()