import ReviewItem from "./ReviewItem.vue";

export default {
  title: "ReviewItem",
  component: ReviewItem,
};

export const defaultView = () => ({
  components: {
    ReviewItem,
  },
  data() {
    return {
      dummyReview: {
        photo: "http://loremflickr.com/p/200/200/Avatar",
        author: "Incognito",
        occ: "007",
        text:
          "LoremI never meant to give you mushrooms, girl. I never meant to bring you to my world. Now you sitting in the corner crying. And now it's my fault, my fault. I never meant to give you mushrooms, girl. I never meant to bring you to my world. Now you sitting in the corner crying. And now it's my fault, my fault.",
      },
    };
  },
  template: `<ReviewItem :reviewProp="dummyReview" />`,
});
