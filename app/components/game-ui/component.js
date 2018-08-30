import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { and, alias } from "@ember/object/computed";

export default Component.extend({
  gameState: service(),

  game: alias("gameState.game"),

  init() {
    this._super(...arguments);
    window.gui = this;
  },

  attributeBindings: ["xmlns", "viewBox"],
  xmlns: "http://www.w3.org/2000/svg",
  tagName: "svg",
  classNames: "game-ui",
  viewBox: "0 0 788 576",

  isVisible: and("isMoveFinished", "game.isNextPlayerHuman"),
});
