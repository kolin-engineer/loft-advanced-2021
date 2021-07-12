<template lang="pug">
div
  PageTitle(title='Блок "Обо мне"')
    BaseButton.action(type='iconed' @click="showBlankSkillsGroup=true" v-if='!showBlankSkillsGroup' title='Добавить в группу') 
  .app__content
    //- pre {{ categories }}
    .skills-grid
      //- Blank
      SkillsGroup(
        class='skill-group'
        v-if='showBlankSkillsGroup'
        isBlank
        @create-group='createGroup'
        @delete-group='deleteGroup' 
      )
      SkillsGroup(
        class='skill-group'
        v-for='group in groups'
        :key="group.id"
        :group="group"
        @update-group='updateGroup'
        @delete-group='deleteGroup'
        @create-skill='createSkill'
        @update-skill='updateSkill'
        @delete-skill='deleteSkill'
        )
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
  methods: {
    _hideBlankForm() {
      this.showBlankSkillsGroup = false;
    },
    createGroup(title) {
      this.$store.dispatch("group/create", { title });
      this._hideBlankForm();
    },
    updateGroup({ id, title }) {
      this.$store.dispatch("group/update", { id, title });
    },
    deleteGroup(id) {
      if (id !== "") {
        this.$store.dispatch("group/delete", { id });
        return;
      }
      this._hideBlankForm();
    },
    createSkill(skill) {
      this.$store.dispatch("skill/create", skill);
    },
    updateSkill(skill) {
      this.$store.dispatch("skill/update", skill);
    },
    deleteSkill(skill) {
      this.$store.dispatch("skill/delete", skill);
    },
  },
  computed: {
    groups() {
      return this.$store.state.group.all;
    },
  },
  async created() {
    await this.$store.dispatch("group/fetch");
    await this.$store.dispatch("auth/fetchUser");
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
