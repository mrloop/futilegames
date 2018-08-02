import Service from '@ember/service';
import { debug } from '@ember/debug';
import { later } from '@ember/runloop';

export default Service.extend({
  play() {
    this.autoplayDetection();
    this.content.play();
  },

  pause() {
    this.content.pause();
  },

  load()  {
    this.content.load();
  },

  addEventListener(name, fnc) {
    this.content.addEventListener(name, () =>{
      debug(name);
      fnc.call(this);
    })
  },

  autoplayDetection() {
    if (!this.autoplayDetectionStarted) {
      this.set('autoplayDetectionStarted', true);
      this.addEventListener('play', () => {
        if (!this.autoplayDetectionEnded) {
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
