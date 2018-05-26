import Component from '@ember/component';

export default Component.extend({
  attributeBindings: ['xmlns'],
  xmlns: 'http://www.w3.org/2000/svg',
  tagName: 'svg',
  classNames: 'board-side',

  actions: {
    move(m) {
      this.move(m);
    }
  }
});
