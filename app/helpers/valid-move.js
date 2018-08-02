import Helper from "@ember/component/helper";
import { inject as service } from "@ember/service";
import { observer } from "@ember/object";
import { alias } from "@ember/object/computed";

export default Helper.extend({
  gameState: service(),

  game: alias("gameState.game"),

  afterMove: observer("game.currentPlayer", function() {
    this.recompute();
  }),

  compute(params, namedArgs) {
    if (namedArgs.move === "d") {
      return true;
    }
    return this.game.isValid(namedArgs) && namedArgs.angle === this.game.angle;
  },
});
