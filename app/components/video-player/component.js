import Component from '@ember/component';
import { computed } from '@ember/object';
import { next } from '@ember/runloop';

export default Component.extend({
  tagName: 'video',

  dir: 'videos',
  type: 'mp4',

  src: computed('dir' ,'ext', 'name', function() {
    next(() => this.element.load());
    return `${this.get('dir')}/${this.get('name')}.${this.get('ext')}`;
  }),

  ext: computed('type', function() {
    return 'mp4';
  }),

  ended() {
    if (this.attrs.moveFinished) {
      this.attrs.moveFinished();
    }
  },

  didInsertElement() {
    window.video = this.element;
    this.element.addEventListener("canplaythrough", () => this.element.play());
    this.element.addEventListener("ended", this.get('ended').bind(this));
  },
});
