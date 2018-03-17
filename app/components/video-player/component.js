import Component from '@ember/component';
import { computed } from '@ember/object';
import { next, later } from '@ember/runloop';
import { debug } from '@ember/debug';

export default Component.extend({
  classNames: 'video-player',

  dir: 'videos',
  type: 'mp4',

  src: computed('dir' ,'ext', 'name', function() {
    next(() => this.video.load());
    return `${this.get('dir')}/${this.get('name')}.${this.get('ext')}`;
  }),

  ext: computed('type', function() {
    return 'mp4';
  }),

  ended() {
    if (this.moveFinished) {
      this.moveFinished();
    }
  },

  didInsertElement() {
    this.set('video', this.element.getElementsByTagName('video')[0]);
    window.video = this.video;
    this.video.addEventListener("canplaythrough", () => this.video.play());
    this.video.addEventListener("ended", this.get('ended').bind(this));
    this.video.addEventListener("play", () => {
      debug(this.get('poster'));
      later(() => this.set('imgSrc', `images/${this.get('poster')}.png`), 1000);
    });
  },
});
