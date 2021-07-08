<template lang="pug">
div
  PageTitle(title='Блок "Обо мне"')
    BaseButton.action(type='iconed' @click="showBlankSkillsGroup=true" v-if='!showBlankSkillsGroup' title='Добавить в группу') 
  .app__content
    .skills-grid
      SkillsGroup.skill-group(
        v-if='showBlankSkillsGroup'
        isBlank
        @remove='showBlankSkillsGroup=false'
      )
      SkillsGroup.skill-group(
        v-for='(skills, group) in skillsJSON'
        :key='group'
        :groupName='group'
        :groupSkills="skills")
</template>

<script>
import SkillsGroup from "components/skills-group";
import PageTitle from "components/page-title";
import BaseButton from "components/button";

export default {
  components: {
    SkillsGroup,
    PageTitle,
    BaseButton,
  },
  data: () => ({
    skillsJSON: {},
    showBlankSkillsGroup: false,
  }),
  created() {
    this.skillsJSON = require("data/skills.json");
  },
};
</script>
<style lang="postcss">
.app__content {
  padding-bottom: 30px;
}
.skills-grid {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
  margin-left: -24px;
  margin-bottom: -24px;
}
.skill-group {
  flex: 0 1 calc(50% - 24px);
  margin-left: 24px;
  margin-bottom: 24px;
  height: 100%;
}
.action {
  color: $admin-action-color;
}
</style>
