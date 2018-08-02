import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Helper | valid-move", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders true", async function(assert) {
    await render(hbs`{{#if (valid-move move=3 angle=1)}}hot potato{{/if}}`);

    assert.dom(this.element).hasText("hot potato");
  });

  test("it renders false", async function(assert) {
    await render(
      hbs`{{#if (valid-move move=1 angle=1)}}hot potato{{else}}ghost{{/if}}`
    );

    assert.dom(this.element).hasText("ghost");
  });
});
