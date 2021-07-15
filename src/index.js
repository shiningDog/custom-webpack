import Vue from "vue";
import info from "./info.tmp";
const Button = require("element-ui/lib/button.js");
Vue.use(Button);
new Vue({
  el: "#app",
  methods: {
    onClick() {
      const div = document.createElement("div");
      div.innerHTML = info({ name: "魏泽", age: "18" });
      document.body.append(div);
    },
  },
  render(h) {
    return h(
      "button",
      {
        on: {
          click: this.onClick,
        },
      },
      "添加info"
    );
  },
});
