import SkillsGroup from "./SkillsGroup.vue";
import { action } from "@storybook/addon-actions";

const methods = {
  onUpdateTitle: action("onUpdateTitle"),
  onUpdateSkill: action("onUpdateSkill"),
  onRemove: action("onRemove"),
};
export default {
  title: "SkillsGroup",
  component: SkillsGroup,
};
const skills = [
  {
    id: 1,
    tech: "Python 3",
    depth: 20,
  },
  {
    id: 2,
    tech: "Django 3",
    depth: 21,
  },
  {
    id: 3,
    tech: "nginx",
    depth: 1,
  },
  {
    id: 4,
    tech: "Linux",
    depth: 12,
  },
];

export const defaultView = () => ({
  data() {
    return {
      group: {
        name: "Development",
        skills,
      },
    };
  },
  components: {
    SkillsGroup,
  },
  methods,
  template: `
    <SkillsGroup
      :groupName='group.name'
      :groupSkills='group.skills'
      @update-group-name="onUpdateTitle"
      @update-skill="onUpdateSkill"
      @remove='onRemove'
      />
  `,
});

defaultView.story = {
  name: "Стандарный вид",
};

export const blankView = () => ({
  components: {
    SkillsGroup,
  },
  methods,
  template: `
    <SkillsGroup isBlank @remove='onRemove' />
  `,
});

blankView.story = {
  name: "Пустой",
};
