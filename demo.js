// webpack内部实现
(function (modules) {
  console.log(modules);
  /**
   * 1.按顺序执行模块
   * 2.存值
   * 3.取值
   */
  const installedModules = {}; //存值

  function require(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    const module = (installedModules[moduleId] = {
      exports: {}, //当前模块存的值
      executed: false, //是否执行过
      i: moduleId,
    });
    modules[moduleId].call(module.exports, module, require);
    // modules[moduleId](module, require);
    module.executed = true;
    console.log(moduleId, module.exports);
    return module.exports;
  }

  require(0);
})([
  //module 仓库
  function (module, require) {
    const name = require(1);
    function getName() {
      console.log("getName", name);
    }
    getName();
  },
  function (module, require) {
    const name = "lxy";
    module.exports = name;
  },
]);
