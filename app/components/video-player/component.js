import Component from "@ember/component";
import { computed } from "@ember/object";
import { next, later } from "@ember/runloop";
import { debug } from "@ember/debug";
import { inject as service } from "@ember/service";

export default Component.extend({
  assetMap: service("asset-map"),
  video: service("video-transport"),

  classNames: "video-player",

  dir: "videos",
  type: "mp4",

  src: computed("dir", "name", function() {
    next(() => {
      this.video.load();
      debug("video.load()");
    });
    const src = `${this.dir}/${this.name}`;
    debug(`src: ${src}`);
    return src;
  }),

  srcWebm: computed("src", function() {
    return this.assetMap.resolve(`${this.src}.webm`);
  }),

  srcMp4: computed("src", function() {
    return this.assetMap.resolve(`${this.src}.mp4`);
  }),

  ended() {
    if (this.moveFinished) {
      this.moveFinished();
    }
  },

  didInsertElement() {
    this.set("video.content", this.element.getElementsByTagName("video")[0]);
    this.set("imgSrc", this.initialPosterImgPath);
    this.detectAutoplay();
  },

  detectAutoplay() {
    this.addVideoEventListeners();
  },

  addVideoEventListeners() {
    // canplaythrough not reliably fired use canplay instead
    this.video.addEventListener("canplay", () => this.video.play());
    this.video.addEventListener("ended", this.ended.bind(this));
    this.video.addEventListener("play", () => {
      debug(this.poster);
      later(() => this.set("imgSrc", this.posterImgPath), 1000);
    });
    this.video.debug();
  },

  posterImgPath: computed("poster", function() {
    return this.assetMap.resolve(`images/${this.poster}.png`);
  }),

  initialPosterImgPath: computed("initialPoster", function() {
    return this.assetMap.resolve(`images/${this.initialPoster}.png`);
  }),
});
