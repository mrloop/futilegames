import Service from "@ember/service";
import Game from "futile-games/lib/game";

export default Service.extend({
  init() {
    this._super();
    this.set("game", Game.create());
  },
});
