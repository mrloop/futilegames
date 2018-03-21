import { setProperties } from '@ember/object';
import { debug } from '@ember/debug';

let i = 0;

export default class Game {
/*
 board in video

 red - player0
 black -player1

  |1|
 4| |2
  |3|

 e.g. 101d2d
 index
 0 - angle
 1 - current player
 2 - player 1 start position
 3 - player 1 move
 4 - player 0 start position
 5 - player 0 move

*/
  constructor() {
    this.demo = true;
    this.currentPlayer = '0';
    this.player0Pos = 2;
    this.player1Pos = 4;
    this.player0Move = '1';
    this.player1Move = '-';
    // for end poster
    this.player0NewPos = 1;
    this.player1NewPos = 4;
  }

  toString() {
    return [
      this.currentPlayer,
      this.player1Pos,
      this.player1Move,
      this.player0Pos,
      this.player0Move,
    ].join('');
  }

  nextMove() {
    const player = this.nextPlayer();
    const player0Pos = this.playerNewPos(this.player0Pos, this.player0Move);
    const player1Pos = this.playerNewPos(this.player1Pos, this.player1Move);
    const [player0Move, player1Move] = this.playersMoves(player);
    const player0NewPos = this.playerNewPos(player0Pos, player0Move);
    const player1NewPos = this.playerNewPos(player1Pos, player1Move);
    setProperties(this, {
      currentPlayer: player,
      player0Pos,
      player1Pos,
      player0Move,
      player1Move,
      player0NewPos,
      player1NewPos,
    });
    debug(`${this.toString()}  move: ${i++}`);
  }

  playersMoves(player) {
    // must be new move
    for(;;) {
      const player0Move = this.playerMove(0, player);
      const player1Move = this.playerMove(1, player);
      if(player0Move != this.player0Move ||
          player1Move != this.player1Move) {
        return [player0Move, player1Move];
      }
    }
  }

  playerMove(thisPlayer, nextPlayer) {
    const choices = {'d': 1, 't': 1};
    if (thisPlayer != nextPlayer) {
      choices['-'] = 10;
    } else {
      choices['f'] = 1;
      choices[this.possibleMove(nextPlayer)] = 10;
    }
    return this.weightedChoice(choices);
  }

  possibleMove(player) {
    const player0Pos = this.playerNewPos(this.player0Pos, this.player0Move);
    const player1Pos = this.playerNewPos(this.player1Pos, this.player1Move);
    let myCounter = player == 0 ? player0Pos : player1Pos;
    let otherCounter = player == 1 ? player0Pos : player1Pos;
    let v = myCounter - otherCounter;
    if (v == -2 || v == 2) {
      v = this.randomInt(1) ? -1 : 1;
    } else if (v == -3) {
      v = 1;
    } else if (v == 3) {
      v = -1;
    }
    return this.circular(parseInt(myCounter) + v)
  }

  circular(pos) {
    if (pos == 5) {
      return 1;
    } else if (pos == 0) {
      return 4;
    }
    return pos;
  }

  playerNewPos(playerPos, playerMove) {
    if (parseInt(playerMove)) {
      return playerMove;
    }
    return playerPos
  }

  player0NewPos() {
    if (parseInt(this.player0Move)){
      return this.player0Move;
    }
    return this.player0Pos;
  }

  nextPlayer() {
    if (this.currentPlayerTurnComplete()) {
      return this.otherPlayer();
    }
    return this.currentPlayer;
  }

  chooseNextPlayer() {
    let choices = {};
    choices[this.currentPlayer] = 1;
    choices[this.otherPlayer()] = 20;
    return this.weightedChoice(choices);
  }

  otherPlayer() {
    return this.currentPlayer == 0 ? 1 : 0;
  }

  currentPlayerTurnComplete() {
    return (this.currentPlayer == 0 &&
      (parseInt(this.player0Move) || this.player0Move === 'f')) ||
      (parseInt(this.player1Move) || this.player1Move === 'f');
  }

  weightedChoice(opts) {
    const total = Object.values(opts).reduce((sum, v) => sum + v, 0);
    const choice = this.randomInt(total);
    let count = 0;
    return Object.entries(opts).find(([, weight]) => {
      return choice >= count && choice < (count += weight);
    })[0];
  }

  randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }
}
