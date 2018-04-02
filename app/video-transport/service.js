import Service from '@ember/service';
import { debug } from '@ember/debug';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Service.extend({
  videoLoader: service(),

  play() {
    this.autoplayDetection();
    this.get('content').play();
    this.cacheVideos();
  },

  pause() {
    this.get('content').pause();
  },

  load()  {
    this.get('content').load();
  },

  addEventListener(name, fnc) {
    this.get('content').addEventListener(name, () =>{
      debug(name);
      fnc.call(this);
    })
  },

  cacheVideos() {
    if (!this.get('preloaded')) {
      this.set('preloaded', true);
      const format = this.get('content.currentSrc').split('.').pop();
      this.get('videoLoader').preload(format);
    }
  },

  autoplayDetection() {
    if (!this.get('autoplayDetectionStarted')) {
      this.set('autoplayDetectionStarted', true);
      this.addEventListener('play', () => {
        if (!this.get('autoplayDetectionEnded')) {
          this.set('autoplay', true);
        }
      });
      later(() => this.set('autoplayDetectionEnded', true), 1000);
    }
  },

  debug() {
    [
      'canplay',
      'playing',
      'error',
      'abort',
      'loadstart',
      'loadeddata',
      'waiting',
    ].forEach((name) => this.addEventListener(name, () => debug(name)));
  },
});
