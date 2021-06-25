import Vue from "vue";

const SliderNav = {
  template: "#t-slider-nav",
  emits: ["change-slide"],
  methods: {
    changeSlide(direction) {
      this.$emit("change-slide", direction);
    },
  },
};

const SliderItem = {
  template: "#t-slider-item",
  props: {
    filename: String,
  },
};
//
const SliderThumbItem = {
  template: "#t-slider-thumb-item",
  props: {
    filename: String,
    id: String | Number,
    showImgId: String | Number,
  },
};
//
const SliderThumbList = {
  template: "#t-slider-thumb-list",
  components: {
    SliderThumbItem,
  },
  emits: ["set-slide"],
  props: ["gallery", "showImgId"],
  methods: {
    setSlide(id) {
      this.$emit("set-slide", id);
    },
  },
};

const SliderList = {
  name: "SliderList",
  template: "#t-slider-list",
  components: {
    SliderItem,
  },
  props: {
    gallery: Array,
    showImgId: String | Number,
  },
};
//
const TagItem = {
  name: "TagItem",
  template: `<div class='tag'>{{ tag }}</div>`,
  props: ["tag"],
};
const SliderDesc = {
  template: "#t-slider-desc",
  props: ["portfolio", "showWorkId"],
  components: {
    TagItem,
  },
};

const SliderPreview = {
  template: "#t-slider-preview",
  components: {
    SliderList,
    SliderThumbList,
    SliderNav,
    SliderDesc,
  },
  props: {
    portfolio: Array,
  },
  data() {
    return {
      gallery: [],
      currentImgId: "",
    };
  },
  methods: {
    _initGallery() {
      const gallery = this.portfolio.reduce((acc, current) => {
        acc.push({
          id: current.id,
          filename: current.img,
        });
        return acc;
      }, []);
      this.gallery = gallery;
    },
    _initCurrentImgId() {
      // Get first id sfrom Gallery
      try {
        if (!this.gallery.length) throw Error("Gallery must not be empty");
        this.currentImgId = this.gallery[0].id;
      } catch (err) {
        console.warn(err);
      }
    },
    changeSlide(direction) {
      let newIndex = this.currentImgIndex + direction;
      if (newIndex >= this.gallery.length) {
        this.currentImgIndex = newIndex - this.gallery.length;
      } else if (newIndex < 0) {
        this.currentImgIndex = this.gallery.length + newIndex;
        // do:
      } else {
        this.currentImgIndex = newIndex;
      }
    },
    setSlide(id) {
      this.currentImgId = id;
    },
  },
  computed: {
    currentImgIndex: {
      set: function(index) {
        this.currentImgId = this.gallery[index].id;
      },
      get: function() {
        return this.gallery.findIndex((el) => el.id === this.currentImgId);
      },
    },
    currentImgOrder() {
      return 1 + this.currentImgIndex;
    },
  },
  created() {
    this._initGallery();
    this._initCurrentImgId();
  },
};

new Vue({
  el: "#slider-widget",
  template: "#t-slider",
  data: {
    portfolio: [],
  },
  components: {
    SliderPreview,
  },
  data: {},
  methods: {
    _initPortfolio() {
      const dbName = "portfolio.json";
      let portfolioJSON;
      try {
        portfolioJSON = require("../data/" + dbName);
      } catch (err) {
        console.warn(err || "Couldn't get data from " + dbName);
      }
      this.portfolio = this._resolveImgsPath(portfolioJSON.portfolio);
    },
    _resolveImgsPath(dataArr) {
      dataArr.map((item) => {
        item.img = require("../images/content/" + item.img).default;
      });
      return dataArr;
    },
  },
  created() {
    this._initPortfolio();
  },
});
