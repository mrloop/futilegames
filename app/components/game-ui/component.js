import Component from "@ember/component";

export default Component.extend({
  attributeBindings: ["xmlns", "viewBox"],
  xmlns: "http://www.w3.org/2000/svg",
  tagName: "svg",
  classNames: "game-ui",
  viewBox: "0 0 788 576",
});
