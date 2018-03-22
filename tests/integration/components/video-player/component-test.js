import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | video-player', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{video-player initialPoster='1-4-1-'}}`);
    const src = this.element.firstElementChild.firstElementChild.getAttribute('src')
    assert.equal('images/1-4-1-.png', src);
  });
});
