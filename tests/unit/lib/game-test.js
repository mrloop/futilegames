import { module, test } from "qunit";
import Game from "futile-games/lib/game";

let game = undefined;

module("Unit | Lib | game", function(hooks) {
  hooks.beforeEach(function() {
    game = Game.create();
  });

  test("game.randomInt", function(assert) {
    assert.expect(5);
    Array.from({ length: 100 }, () => game.randomInt(5))
      .reduce((arr, value) => {
        arr[value] = arr[value] + 1 || 1;
        return arr;
      }, [])
      .forEach(v => assert.ok(v > 10));
  });

  test("game.weightedChoice", function(assert) {
    const choices = Array.from({ length: 100 }, () =>
      game.weightedChoice({ banana: 8, kiwi: 2 })
    ).reduce((hsh, value) => {
      hsh[value] = hsh[value] + 1 || 1;
      return hsh;
    }, {});
    assert.ok(choices["banana"] > 70);
    assert.ok(choices["kiwi"] < 30);
  });

  test("game.possibleCounterMoves", function(assert) {
    game.player0NewPos = 2;
    game.player1NewPos = 4;

    let moves = game.possibleCounterMoves(1);
    assert.deepEqual(moves.sort(), [1, 3], `${moves} eq [1,3]`);

    moves = game.possibleCounterMoves(0);
    assert.deepEqual(moves.sort(), [1, 3], `${moves} eq [1,3]`);

    game.player0NewPos = 2;
    game.player1NewPos = 1;

    assert.deepEqual(game.possibleCounterMoves(1), [4], [4]);
    assert.deepEqual(game.possibleCounterMoves(0), [3], [3]);

    game.player0NewPos = 2;
    game.player1NewPos = 3;

    assert.deepEqual(game.possibleCounterMoves(1), [4], [4]);
    assert.deepEqual(game.possibleCounterMoves(0), [1], [1]);
  });

  test("game.possibleMoves", function(assert) {
    game.player0NewPos = 2;
    game.player1NewPos = 4;

    let moves = game.possibleMoves({ forPlayer: 1, nextPlayer: 1, angle: 1 });
    assert.deepEqual(
      moves,
      { "1": 5, "3": 5, d: 1, f: 1, t: 1 },
      JSON.stringify(moves)
    );

    moves = game.possibleMoves({ forPlayer: 1, nextPlayer: 1, angle: 3 });
    assert.deepEqual(moves, { "1": 1, "3": 1 }, JSON.stringify(moves));

    moves = game.possibleMoves({ forPlayer: 1, nextPlayer: 0, angle: 1 });
    assert.deepEqual(moves, { "-": 10, d: 1, t: 1 }, JSON.stringify(moves));

    moves = game.possibleMoves({ forPlayer: 1, nextPlayer: 0, angle: 3 });
    assert.deepEqual(moves, { "-": 1 }, JSON.stringify(moves));
  });

  test("game.isValid", function(assert) {
    game.player0NewPos = 2;
    game.player1NewPos = 4;

    [1, 3, "3", "1", "t", "f", "d"].forEach(move => {
      assert.ok(game.isValid({ move, player: 1, angle: 1 }));
    });

    [1, 3, "3", "1"].forEach(move => {
      assert.ok(game.isValid({ move, player: 1, angle: 3 }));
    });

    ["-", "2", "4", 2, 4, -1, 5].forEach(move => {
      assert.notOk(game.isValid({ move, player: 1, angle: 1 }));
    });

    ["-", "2", "4", 2, 4, -1, 5, "t", "f", "d"].forEach(move => {
      assert.notOk(game.isValid({ move, player: 1, angle: 3 }));
    });
  });

  test("game.circular", function(assert) {
    assert.equal(game.circular(0), 4, 0);
    assert.equal(game.circular(1), 1, 1);
    assert.equal(game.circular(2), 2, 2);
    assert.equal(game.circular(3), 3, 3);
    assert.equal(game.circular(4), 4, 4);
    assert.equal(game.circular(5), 1, 5);
  });
});
