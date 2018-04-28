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
    this.angle = 1;
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
      this.angle,
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
    const [player0Move, player1Move, angle] = this.playersMoves(player);
    const player0NewPos = this.playerNewPos(player0Pos, player0Move);
    const player1NewPos = this.playerNewPos(player1Pos, player1Move);

    setProperties(this, {
      angle,
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
    const angle = this.chooseNextAngle();
    // must be new move
    for(;;) {
      const player0Move = this.playerMove(0, player, angle);
      const player1Move = this.playerMove(1, player, angle);
      if(player0Move != this.player0Move ||
          player1Move != this.player1Move) {
        return [player0Move, player1Move, angle];
      }
    }
  }

  playerMove(thisPlayer, nextPlayer, angle) {
    return this.weightedChoice(this.possibleMoves(thisPlayer, nextPlayer, angle));
  }

  possibleMoves(thisPlayer, nextPlayer, angle) {
    return this[`possibleAngle${angle}Moves`].call(this, thisPlayer, nextPlayer);
  }

  possibleAngle3Moves(thisPlayer, nextPlayer) {
    const choices = {};
    if (thisPlayer != nextPlayer) {
      choices['-'] = 1;
    } else {
      this.possibleCounterMoves(nextPlayer).forEach((pos) => {
        choices[pos] = 1;
      })
    }
    return choices;
  }

  possibleAngle1Moves(thisPlayer, nextPlayer) {
    const choices = {'d': 1, 't': 1};
    if (thisPlayer != nextPlayer) {
      choices['-'] = 10;
    } else {
      choices['f'] = 1;
      const pos = this.possibleCounterMoves(nextPlayer);
      pos.forEach((m) => {
        choices[m] = 10/pos.length;
      })
    }
    return choices;
  }

  possibleCounterMoves(player) {
    let myCounter = player == 0 ? this.player0NewPos : this.player1NewPos;
    let otherCounter = player == 1 ? this.player0NewPos : this.player1NewPos;
    let v = myCounter - otherCounter;
    if (v == -2 || v == 2) {
      v = [-1, 1];
    } else if (v == -3) {
      v = [1];
    } else if (v == 3) {
      v = [-1];
    } else {
      v = [v];
    }
    return v.map((i) => this.circular(parseInt(myCounter) + i));
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

  chooseNextAngle() {
    if(this.angle === 3) {
      return 1;
    } else if(this.randomInt(5) == 1) {
      return 3;
    }
    return this.angle;
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
