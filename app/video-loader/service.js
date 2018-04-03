import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Service.extend({
  assetMap: service('asset-map'),

  preload(format) {
    debug(`Loading: ${format}`);
    const arr = Object.values(this.get('assetMap.map')).filter((url) => {
      return url.split(".").pop() === format;
    });
    let it = this.iterator(arr);
    this.fetchNext(it);
  },

  fetchNext(it) {
    const i = it.next();
    if (!i.done) {
      fetch(new Request(i.value, { mode: 'cors' }))
        .then(() => this.fetchNext(it))
        .catch(() => this.fetchNext(it));
    }
  },

  iterator(array) {
    let nextIndex = 0;
    return {
      next() {
        return nextIndex < array.length ?
        { value: array[nextIndex++], done: false } :
        { done: true };
      }
    }
  },
});
