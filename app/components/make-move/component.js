import Component from "@ember/component";
import { and } from "@ember/object/computed";

export default Component.extend({
  tagName: "",

  actions: {
    move(m) {
      this.move(m);
    },
  },

  circle: and("cx", "cy", "r"),
});
