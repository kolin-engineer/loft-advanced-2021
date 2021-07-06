import TagInput from "./TagInput.vue";

export default {
  title: "TagInput",
  component: TagInput,
};

export const defaultView = () => ({
  components: {
    TagInput,
  },
  data() {
    return {
      tags: `html5,css3,git`,
    };
  },
  template: `
    <div>
    <pre>{{ tags }}</pre>
    <TagInput v-model="tags"/>
    </div>
  `,
});

defaultView.story = {
  name: "Стандартный вид",
};
