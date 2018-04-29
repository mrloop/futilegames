import Component from '@ember/component';
import { computed } from '@ember/object';
import Game from 'futile-games/lib/game';

export default Component.extend({
  classNames: 'futile-game',
  autoPlayer0: true,
  autoPlayer1: true,

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
      this.set('moveFinished', true);
      if(this.get(`autoPlayer${this.get('game').nextPlayer()}`)) {
        this.game.nextMove();
      }
    },
  },

  move(move) {
    if(this.get('moveFinished')) {
      this.set(
        'moveFinished',
        !this.game.move(move)
      );
    }
  },

  didInsertElement() {
    this.set('_keyDown', this.keyDown.bind(this))
    document.addEventListener('keydown', this.get('_keyDown'));
  },

  willDestroyElement() {
    document.removeEventListener('keydown', this.get('_keyDown'));
  },

  keyDown(event) {
    switch (event.key || event.keyCode) {
      case '1':
      case 49:
        this.toggleProperty('autoPlayer1');
        break;
      case '2':
      case 50:
        this.toggleProperty('autoPlayer0');
        break;
      case 'ArrowLeft':
      case 37:
        this.move('4');
        break;
      case 'ArrowUp':
      case 38:
        this.move('1');
        break;
      case 'ArrowRight':
      case 39:
        this.move('2');
        break;
      case 'ArrowDown':
      case 40:
        this.move('3');
        break;
      case 'd':
      case 68:
        this.move('d');
        break;
      case 'f':
      case 70:
        this.move('f');
        break;
      case 't':
      case 84:
        this.move('t');
        break;
    }
  },
});
