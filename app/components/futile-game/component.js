import Component from '@ember/component';
import { computed } from '@ember/object';
import Game from 'futile-games/lib/game';

export default Component.extend({
  classNames: 'futile-game',

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

  posterName: computed(
    'angle',
    'game.{player0NewPos,player1NewPos}',
    function() {
    return [
      this.angle,
      '-',
      this.game.player1NewPos,
      '-',
      this.game.player0NewPos,
      '-',
    ].join('');
  }),

  initialPosterName: computed(
    'angle',
    'game.{player0Pos,player1Pos}',
    function() {
    return [
      this.angle,
      '-',
      this.game.player1Pos,
      '-',
      this.game.player0Pos,
      '-',
    ].join('');
  }),

  actions: {
    moveFinished() {
      this.game.nextMove();
    }
  }
});
