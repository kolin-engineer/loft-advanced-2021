import EditCase from "./EditCase.vue";

export default {
  title: "EditCase",
  component: EditCase,
};

export const defaultView = () => ({
  components: {
    EditCase,
  },

  data() {
    return {
      work: {
        title: "Покорение космоса",
        link: "mks.fly",
        desc: "Покорение космоса. Преодоление сверх звуковых барьеров и т.д.",
        tags: "Space, Hello",
      },
    };
  },
  template: `
    <EditCase :workProp='work'/>
  `,
});

defaultView.story = {
  name: "Стандартный вид",
};
