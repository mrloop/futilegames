import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | futile-game', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      {{#futile-game as |name initialPoster poster movieFinished|}}
        {{name}}
      {{/futile-game}}
    `);

    assert.equal(this.element.textContent.trim(), '104-21');
  });
});
