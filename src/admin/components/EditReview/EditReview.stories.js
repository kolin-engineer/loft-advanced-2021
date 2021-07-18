import EditReview from "./EditReview.vue";

export default {
  title: "EditReview",
  component: EditReview,
};

export const defaultView = () => ({
  components: {
    EditReview,
  },
  template: `<EditReview />`,
});
