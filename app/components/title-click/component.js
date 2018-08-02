import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import { computed } from '@ember/object';

export default Component.extend({
  video: service('video-transport'),

  classNames: ['title__container'],
  classNameBindings: ['hide', 'fadeOut', 'showBegin'],

  clicked: false,

  fadeOut: computed('clicked', 'showBegin', function() {
    const fadeOut = this.clicked ||
      (this.get('video.autoplayDetectionEnded') && this.get('video.autoplay'))
    later(() => this.set('hide', true), 6000)
    return fadeOut;
  }),

  showBegin: computed('video.{autoplay,autoplayDetectionEnded}', function() {
    return this.get('video.autoplayDetectionEnded') && !this.get('video.autoplay');
  }),

  click() {
    if (!this.fadeOut) {
      this.set('clicked', true);
      // start playing with user interaction where autoplay false
      this.video.play();
      // pause video wait for fade out to start
      this.video.pause();
      // play video when fade out starts
      later(() => this.video.play(), 2000);
    }
  }
});
