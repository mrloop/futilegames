import Component from '@ember/component';
import { computed } from '@ember/object';
import Game from 'futile-games/lib/game';

export default Component.extend({
  classNames: 'futile-game',

  init(){
    this._super();
    this.set('game', new Game());
  },

  videoName: computed(
    'game.{angle,currentPlayer,player0Pos,player1Pos,player0Move,player1Move}',
    function() {
    return [
      this.game.angle,
      this.game.currentPlayer,
      this.game.player1Pos,
      this.game.player1Move,
      this.game.player0Pos,
      this.game.player0Move,
   ].join('');
  }),

  posterName: computed(
    'game.{angle,player0NewPos,player1NewPos}',
    function() {
    return [
      this.game.angle,
      '-',
      this.game.player1NewPos,
      '-',
      this.game.player0NewPos,
      '-',
    ].join('');
  }),

  initialPosterName: computed(
    'game.{angle,player0Pos,player1Pos}',
    function() {
    return [
      this.game.angle,
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
