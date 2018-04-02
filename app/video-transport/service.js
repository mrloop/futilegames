import Service from '@ember/service';
import { debug } from '@ember/debug';
import { later } from '@ember/runloop';

export default Service.extend({
  play() {
    this.autoplayDetection();
    this.get('content').play();
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
