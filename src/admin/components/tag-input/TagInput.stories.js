import TagInput from "./TagInput.vue";

export default {
  title: "TagInput",
  component: TagInput,
};

export const defaultView = () => ({
  components: {
    TagInput,
  },
  template: `
    <TagInput />
  `,
});

defaultView.story = {
  name: "Стандартный вид",
};
