import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import Vue from "vue";
import "swiper/swiper-bundle.css";

import config from "../../env.paths.json";
import axios from "axios";
axios.defaults.baseURL = config.BASE_URL;

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
    resolvePhotoPathes(data) {
      return data.map((el) => {
        return { ...el, photo: config.BASE_URL + el.photo };
      });
    },
  },
  async created() {
    try {
      const { data: testimonials } = await axios.get("/reviews/467");
      this.testimonials = this.resolvePhotoPathes(testimonials);
    } catch (error) {
      console.warn(error);
    }
  },
});
