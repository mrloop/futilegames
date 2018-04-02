import Service from '@ember/service';
import { debug } from '@ember/debug';

export default Service.extend({
  play() {
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
