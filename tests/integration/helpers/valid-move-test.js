import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | valid-move', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders true', async function(assert) {
    this.set('inputValue', '2');

    await render(hbs`{{#if (valid-move inputValue)}}hot potato{{/if}}`);

    assert.equal(this.element.textContent.trim(), 'hot potato');
  });

  test('it renders false', async function(assert) {
    this.set('inputValue', '1');

    await render(hbs`{{#if (valid-move inputValue)}}hot potato{{else}}ghost{{/if}}`);

    assert.equal(this.element.textContent.trim(), 'ghost');
  });

});