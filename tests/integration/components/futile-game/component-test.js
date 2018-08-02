import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | futile-game", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    await render(hbs`
      {{#futile-game as |name initialPoster poster movieFinished|}}
        <div class="name-it">{{name}}</div>
      {{/futile-game}}
    `);

    assert
      .dom(this.element.getElementsByClassName("name-it")[0])
      .hasText("104-21");
  });
});
