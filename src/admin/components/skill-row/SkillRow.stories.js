import SkillRow from "./SkillRow.vue";
import { action } from "@storybook/addon-actions";

export default {
  title: "SkillRow",
  component: SkillRow,
};

const methods = {
  onUpdateSkill: action("onUpdateSkill"),
};

export const readOnlyView = () => ({
  components: {
    SkillRow,
  },
  data() {
    return {
      dummySkill: {
        id: 1,
        tech: "HTML",
        depth: 95,
      },
    };
  },
  template: `
    <SkillRow :skill='dummySkill' readonly />
  `,
});
readOnlyView.story = {
  name: "Только для чтения",
};

export const editableView = () => ({
  components: {
    SkillRow,
  },
  data() {
    return {
      dummySkill: {
        id: 1,
        tech: "HTML",
        depth: 95,
      },
    };
  },
  methods,
  template: `
    <SkillRow :skill="dummySkill" @update-skill='onUpdateSkill' />
  `,
});
editableView.story = {
  name: "Изменения",
};
