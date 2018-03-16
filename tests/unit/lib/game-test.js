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
