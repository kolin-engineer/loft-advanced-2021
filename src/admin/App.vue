<template lang="pug">
  .app
    headline(title='Панель администратора')
      user(mode='light' :user='user')
    PageNav(:navs='navs' :activeLink="navs[0]")
    main.app__main
      .container
        router-view
        
           
</template>

<script>
import headline from "./components/headline";
import user from "./components/user";
import PageNav from "./components/page-nav";
import BaseButton from "./components/button";

export default {
  components: {
    headline,
    user,
    PageNav,
    BaseButton,
  },
  data() {
    return {
      user: {
        name: "Кирилович Николай",
        img: require("../images/content/kolin.jpg").default,
      },
      navs: ["Обо мне", "Cases", "Отзывы"],
    };
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
</style>

<style lang="postcss" scoped src="./app.pcss"></style>
