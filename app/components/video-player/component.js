import Component from '@ember/component';
import { computed } from '@ember/object';
import { next, later } from '@ember/runloop';
import { debug } from '@ember/debug';

export default Component.extend({
  tagName: 'video',

  dir: 'videos',
  type: 'mp4',

  attributeBindings: ['poster'],

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
    this.element.addEventListener("canplaythrough", () => {
      this.element.play();
      // set post to end image to avoid black flash
    })
    this.element.addEventListener("ended", this.get('ended').bind(this));
    this.element.addEventListener("play", () => {
      debug(this.get('endPosterPath'));
      later(() => this.set('poster', `images/${this.get('endPosterPath')}.png`), 1000);
    });
  },
});
