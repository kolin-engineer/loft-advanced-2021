import iconedBtn from "../../button.vue";
import { action } from "@storybook/addon-actions";
import { withKnobs, number } from "@storybook/addon-knobs";

const methods = {
  onClick: action("onClick"),
};

export default {
  title: "button/iconed",
  component: iconedBtn,
  decorators: [withKnobs],
};

export const defaultView = () => ({
  components: { iconedBtn },
  props: {
    size: {
      default: number("size", 2),
    },
  },
  template: `
    <iconed-btn :size='size' type="iconed" @click="onClick" title="Заголовок" />
  `,
  methods,
});

defaultView.story = {
  name: "Стандартный вид",
};
