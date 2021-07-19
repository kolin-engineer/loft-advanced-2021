import Vue from "vue";

import config from "../../env.paths.json";
import axios from "axios";
axios.defaults.baseURL = config.BASE_URL;

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
      currentImgId: "",
    };
  },
  created() {
    this.initCurrentImgId();
  },
  methods: {
    initCurrentImgId() {
      // Get first id from Gallery
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
    gallery() {
      return this.portfolio.reduce((acc, current) => {
        acc.push({
          id: current.id,
          filename: current.photo,
        });
        return acc;
      }, []);
    },
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
};

new Vue({
  el: "#slider-widget",
  template: "#t-slider",
  data() {
    return {
      portfolio: [],
    };
  },
  components: {
    SliderPreview,
  },
  methods: {
    resolvePhotoPath(works) {
      this.portfolio = works.map((work) => {
        return { ...work, photo: config.BASE_URL + work.photo };
      });
    },
    async fetchWorks() {
      try {
        const { data } = await axios.get("/works/467");
        this.resolvePhotoPath(data);
      } catch (error) {
        console.warn(error);
      }
    },
  },
  created() {
    this.fetchWorks();
  },
});
