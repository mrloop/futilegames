import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import { computed } from '@ember/object';

export default Component.extend({
  video: service('video-transport'),

  classNames: ['title__container'],
  classNameBindings: ['fadeOut', 'showBegin'],

  clicked: false,

  fadeOut: computed('clicked', 'showBegin', function() {
    return this.get('clicked') ||
      (this.get('video.autoplayDetectionEnded') && this.get('video.autoplay'))
  }),

  showBegin: computed('video.{autoplay,autoplayDetectionEnded}', function() {
    return this.get('video.autoplayDetectionEnded') && !this.get('video.autoplay');
  }),

  click() {
    if (!this.get('fadeOut')) {
      this.set('clicked', true);
      // start playing with user interaction where autoplay false
      this.get('video').play();
      // pause video wait for fade out to start
      this.get('video').pause();
      // play video when fade out starts
      later(() => this.get('video').play(), 2000);
    }
  }
});
