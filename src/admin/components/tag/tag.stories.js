import tag from "./tag.vue";
import { action } from "@storybook/addon-actions";

const methods = {
  onRemove: action("onRemove"),
};

export default {
  title: "tag",
  components: { tag },
};

export const defaultView = () => ({
  components: { tag },
  template: `
    <tag title="tag" @remove='onRemove' />
  `,
  methods,
});

defaultView.story = {
  name: "Стандартный вид",
  parameters: {
    backgrounds: [{ name: "grey", value: "#8395a7", default: true }],
  },
};
