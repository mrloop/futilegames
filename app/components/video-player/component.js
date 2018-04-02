import Component from '@ember/component';
import { computed } from '@ember/object';
import { next, later } from '@ember/runloop';
import { debug } from '@ember/debug';
import { inject as service } from '@ember/service';

export default Component.extend({
  assetMap: service('asset-map'),
  video: service('video-transport'),

  classNames: 'video-player',

  dir: 'videos',
  type: 'mp4',

  src: computed('dir', 'name', function() {
    next(() => {
      this.get('video').load();
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
    this.set('video.content', this.element.getElementsByTagName('video')[0]);
    this.set('imgSrc', this.get('initialPosterImgPath'));
    this.detectAutoplay();
  },

  detectAutoplay(){
    this.addVideoEventListeners();
  },

  addVideoEventListeners() {
    this.get('video').addEventListener('canplaythrough', () => this.get('video').play());
    this.get('video').addEventListener("ended", this.get('ended').bind(this));
    this.get('video').addEventListener("play", () => {
      debug(this.get('poster'));
      later(() => this.set('imgSrc', this.get('posterImgPath')), 1000);
    });
    this.get('video').debug();
  },

  posterImgPath: computed('poster', function() {
    return this.get('assetMap')
      .resolve(`images/${this.get('poster')}.png`);
  }),

  initialPosterImgPath: computed('initialPoster', function() {
    return this.get('assetMap')
      .resolve(`images/${this.get('initialPoster')}.png`);
  }),
});
