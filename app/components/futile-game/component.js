import Component from "@ember/component";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import { alias, not, and } from "@ember/object/computed";

export default Component.extend({
  gameState: service(),

  classNames: "futile-game",
  autoPlayer0: true,
  autoPlayer1: true,

  game: alias("gameState.game"),

  videoName: computed(
    "game.{angle,currentPlayer,player0Pos,player1Pos,player0Move,player1Move}",
    function() {
      return [
        this.get("game.angle"),
        this.get("game.currentPlayer"),
        this.get("game.player1Pos"),
        this.get("game.player1Move"),
        this.get("game.player0Pos"),
        this.get("game.player0Move"),
      ].join("");
    }
  ),

  posterName: computed("game.{angle,player0NewPos,player1NewPos}", function() {
    return [
      this.get("game.angle"),
      "-",
      this.get("game.player1NewPos"),
      "-",
      this.get("game.player0NewPos"),
      "-",
    ].join("");
  }),

  initialPosterName: computed("game.{angle,player0Pos,player1Pos}", function() {
    return [
      this.get("game.angle"),
      "-",
      this.get("game.player1Pos"),
      "-",
      this.get("game.player0Pos"),
      "-",
    ].join("");
  }),

  isUiVisible: and("moveFinished", "isNextPlayerHuman"),

  isNextPlayerHuman: not("isNextPlayerAuto"),

  isNextPlayerAuto: computed("game.nextPlayer", function() {
    return this.get(`autoPlayer${this.get("game.nextPlayer")}`);
  }),

  actions: {
    moveFinished() {
      this.set("moveFinished", true);
      if (this.get("isNextPlayerAuto")) {
        this.game.nextMove();
        this.set("moveFinished", false);
      }
    },

    togglePlayer(player) {
      this.toggleProperty(`autoPlayer${player}`);
    },

    move(move) {
      this.move(move);
    },
  },

  move(move) {
    if (this.moveFinished) {
      this.set("moveFinished", !this.game.move(move));
    }
  },

  didInsertElement() {
    this.set("_keyDown", this.keyDown.bind(this));
    document.addEventListener("keydown", this._keyDown);
  },

  willDestroyElement() {
    document.removeEventListener("keydown", this._keyDown);
  },

  keyDown(event) {
    switch (event.key || event.keyCode) {
      case "1":
      case 49:
        this.toggleProperty("autoPlayer1");
        break;
      case "2":
      case 50:
        this.toggleProperty("autoPlayer0");
        break;
      case "ArrowLeft":
      case 37:
        this.move("4");
        break;
      case "ArrowUp":
      case 38:
        this.move("1");
        break;
      case "ArrowRight":
      case 39:
        this.move("2");
        break;
      case "ArrowDown":
      case 40:
        this.move("3");
        break;
      case "d":
      case 68:
        this.move("d");
        break;
      case "f":
      case 70:
        this.move("f");
        break;
      case "t":
      case 84:
        this.move("t");
        break;
    }
  },
});
