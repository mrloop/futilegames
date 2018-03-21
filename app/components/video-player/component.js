import Component from '@ember/component';
import { computed } from '@ember/object';
import { next, later } from '@ember/runloop';
import { debug } from '@ember/debug';
import { inject as service } from '@ember/service';

export default Component.extend({
  assetMap: service('asset-map'),

  classNames: 'video-player',

  dir: 'videos',
  type: 'mp4',

  src: computed('dir', 'name', function() {
    next(() => {
      this.video.load();
      debug('video.load()');
    });
    const src = `${this.get('dir')}/${this.get('name')}`;
    debug(`src: ${src}`);
    return src;
  }),

  srcWebm: computed('src', function() {
    return this.get('assetMap').resolve(`${this.get('src')}.webm`);
  }),

  srcMp4: computed('src', function() {
    return this.get('assetMap').resolve(`${this.get('src')}.mp4`);
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
      later(() => this.set('imgSrc', this.get('posterImgPath')), 1000);
    });
    this.set('imgSrc', this.get('initialPosterImgPath'));
    this.debugVideo();
  },

  posterImgPath: computed('poster', function() {
    return this.get('assetMap')
      .resolve(`images/${this.get('poster')}.png`);
  }),

  initialPosterImgPath: computed('initialPoster', function() {
    return this.get('assetMap')
      .resolve(`images/${this.get('initialPoster')}.png`);
  }),

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

  click() {
    this.video.play();
  }
});
