import AddSkill from "./AddSkill.vue";
import { action } from "@storybook/addon-actions";

const methods = {
  onAddSkill: action("onAddSkill"),
};
export default {
  title: "AddSkill",
  component: AddSkill,
};

export const defaultView = () => ({
  components: {
    AddSkill,
  },
  methods,
  template: `
    <AddSkill @add-skill='onAddSkill'/>
  `,
});

defaultView.story = {
  name: "Add Skill",
};
