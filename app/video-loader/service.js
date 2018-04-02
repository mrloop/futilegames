import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Service.extend({
  assetMap: service('asset-map'),

  preload(format) {
    debug(format);
    Object.values(this.get('assetMap.map')).forEach((url) => {
      if (url.split(".").pop() === format) {
        debug(url);
        fetch(new Request(url, { mode: 'cors' }));
      }
    });
  },
});
