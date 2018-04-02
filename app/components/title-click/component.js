import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default Component.extend({
  video: service('video-transport'),

  classNames: ['title__container'],
  classNameBindings: ['clicked'],

  clicked: false,

  click() {
    this.set('clicked', true);
    // start playing with user interaction where autoplay false
    this.get('video').play();
    // pause video wait for fade out to start
    this.get('video').pause();
    // play video when fade out starts
    later(() => this.get('video').play(), 2000);
  }
});
