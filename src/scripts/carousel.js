import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";

import Vue from "vue";
import "swiper/swiper-bundle.css";

const CarouselControls = {
  template: "#t-carousel-controls",
  emits: ["slide"],
};

new Vue({
  el: "#carousel-widget",
  template: "#t-carousel",
  components: {
    Swiper,
    SwiperSlide,
    CarouselControls,
  },
  data() {
    return {
      testimonials: [],
      swiperOptions: {
        slidesPerView: 1,
        breakpoints: {
          460: {
            slidesPerView: 2,
          },
        },
      },
    };
  },
  methods: {
    changeSlide(direction) {
      const carousel = this.$refs["testimonials"].$swiper;
      switch (direction) {
        case `next`:
          carousel.slideNext();
          break;
        case `prev`:
          carousel.slidePrev();
          break;
      }
    },
    _resolveImgPath(data) {
      data.map((el) => {
        el.pic = require(`../images/content/${el.pic}`).default;
      });
      return data;
    },
  },
  created() {
    const testimonials = require("../data/testimonials.json").testimonials;
    this.testimonials = this._resolveImgPath(testimonials);
  },
});
