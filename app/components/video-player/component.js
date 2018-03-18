import Component from '@ember/component';
import { computed } from '@ember/object';
import { next, later } from '@ember/runloop';
import { debug } from '@ember/debug';

export default Component.extend({
  classNames: 'video-player',

  dir: 'videos',
  type: 'mp4',

  src: computed('dir' ,'ext', 'name', function() {
    next(() => {
      this.video.load();
      debug('video.load()');
    });
    const src = `${this.get('dir')}/${this.get('name')}.${this.get('ext')}`;
    debug(`src: ${src}`);
    return src;
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
    this.addVideoEventListener('canplaythrough', () => this.video.play());
    this.addVideoEventListener("ended", this.get('ended').bind(this));
    this.addVideoEventListener("play", () => {
      debug(this.get('poster'));
      later(() => this.set('imgSrc', `images/${this.get('poster')}.png`), 1000);
    });
    this.debugVideo();
  },

  addVideoEventListener(name, fnc) {
    this.video.addEventListener(name, () =>{
      debug(name);
      fnc.call(this);
    })
  },

  debugVideo() {
    [
      'canplay',
      'playing',
      'error',
      'abort',
      'loadstart',
      'loadeddata',
      'waiting',
    ].forEach((name) => this.logEvent(name));
  },

  logEvent(name) {
    this.video.addEventListener(name, () => debug(name))
  },
});
