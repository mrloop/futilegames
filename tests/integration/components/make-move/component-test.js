import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | make-move", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders polygon", async function(assert) {
    await render(
      hbs`{{make-move pos=3 angle=1 points="0,0, 10,0 10,10 0,10"}}`
    );

    assert.equal(this.element.getElementsByTagName("polygon").length, 1);
  });

  test("it renders path", async function(assert) {
    await render(hbs`{{make-move pos=3 angle=1 path="0,0, 10,0 10,10 0,10"}}`);

    assert.equal(this.element.getElementsByTagName("path").length, 1);
  });
});
