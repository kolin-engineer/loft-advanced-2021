import headline from "./headline.vue";
import user from "../user";

export default {
  title: "headline",
  components: {
    headline,
  },
};

export const defaultView = () => ({
  components: {
    headline,
    user,
  },
  template: `
    <headline title='Панель управления'>
      [slot]
    </headline>`,
});

defaultView.story = {
  name: "Default",
};
