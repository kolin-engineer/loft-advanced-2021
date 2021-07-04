<template lang="pug">
  .app
    header.app__header
      headline(title='Панель администратора')
        user(mode='light' :user='user')
      PageNav(:navs='navs' :activeLink="navs[0]")
    main.app__main
      .container
        .app__title-wrap
          .app__title Блок "Обо мне"
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
import headline from "./components/headline";
import user from "./components/user";
import PageNav from "./components/page-nav";
import BaseButton from "./components/button";
import SkillsGroup from "./components/skills-group";

export default {
  components: {
    headline,
    user,
    PageNav,
    BaseButton,
    SkillsGroup,
  },
  data() {
    return {
      showBlankSkillsGroup: false,
      user: {
        name: "Кирилович Николай",
        img: require("../images/content/kolin.jpg").default,
      },
      navs: ["Обо мне", "Cases", "Отзывы"],
      skillsJSON: {},
    };
  },
  created() {
    this.skillsJSON = require("../data/skills.json");
  },
};
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";

body {
  color: $admin-text-color;
}
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
</style>

<style lang="postcss" scoped src="./app.pcss"></style>
