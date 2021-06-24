import Vue from "vue";

const SliderItem = {
  template: "#t-slider-item",
  props: {
    filename: String,
  },
};
//
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
const SliderPreview = {
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
  },
  computed: {
    currentImgOrder() {
      return 1 + this.gallery.findIndex((el) => el.id === this.currentImgId);
    },
  },
  created() {
    this._initGallery();
    this._initCurrentImgId();
  },
  template: "#t-slider-preview",
  components: {
    SliderList,
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
      this.portfolio = portfolioJSON.portfolio;
    },
  },
  created() {
    this._initPortfolio();
  },
});
