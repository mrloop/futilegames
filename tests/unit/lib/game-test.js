import { module, test } from 'qunit';
import Game from 'futile-games/lib/game';

module("Unit | Lib | game");

test("game.randomInt", function(assert) {
  assert.expect(5);
  const game = new Game();
  Array
    .from({length: 100}, () => game.randomInt(5))
    .reduce((arr, value) => {
      arr[value] = arr[value] + 1 || 1;
      return arr;
    }, [])
    .forEach((v) => assert.ok(v>10));
});

test("game.weightedChoice", function(assert) {
  const game = new Game();
  const choices = Array
    .from({length: 100}, () => game.weightedChoice({ banana: 8, kiwi: 2 }))
    .reduce((hsh, value) => {
      hsh[value] = hsh[value] + 1 || 1;
      return hsh;
    }, {})
  assert.ok(choices['banana'] > 70);
  assert.ok(choices['kiwi'] < 30);
});

test("game.possibleMove", function(assert) {
  const game = new Game();

  game.player0NewPos = 2;
  game.player1NewPos = 4;

  new Array(...Array(50)).forEach(() => {
    let move = game.possibleCounterMove(1);
    assert.ok([1,3].includes(move),`${move} in [1,3]`)

    move = game.possibleCounterMove(0);
    assert.ok([1,3].includes(move),`${move} in [1,3]`)
  });


  game.player0NewPos = 2;
  game.player1NewPos = 1;

  assert.equal(game.possibleCounterMove(1), 4, 4);
  assert.equal(game.possibleCounterMove(0), 3, 3);

  game.player0NewPos = 2;
  game.player1NewPos = 3;

  assert.equal(game.possibleCounterMove(1), 4, 4);
  assert.equal(game.possibleCounterMove(0), 1, 1);
});

test("game.circular", function(assert) {
  const game = new Game();
  assert.equal(game.circular(0), 4, 0);
  assert.equal(game.circular(1), 1, 1);
  assert.equal(game.circular(2), 2, 2);
  assert.equal(game.circular(3), 3, 3);
  assert.equal(game.circular(4), 4, 4);
  assert.equal(game.circular(5), 1, 5);
});
