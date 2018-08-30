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
    if (namedArgs.angle === this.game.angle) {
      return (
        ["d", "f"].includes(namedArgs.move) || this.game.isValid(namedArgs)
      );
    }
  },
});
