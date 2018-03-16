import Component from '@ember/component';
import { computed } from '@ember/object';
import Game from 'futile-games/lib/game';

export default Component.extend({
  init(){
    this._super();
    this.set('game', new Game());
  },

  angle: 1,

  videoName: computed(
    'angle',
    'game.{currentPlayer,player0Pos,player1Pos,player0Move,player1Move}',
    function() {
    return [
      this.angle,
      this.game.currentPlayer,
      this.game.player1Pos,
      this.game.player1Move,
      this.game.player0Pos,
      this.game.player0Move,
   ].join('');
  }),

  actions: {
    moveFinished() {
      this.game.nextMove();
    }
  }
});
