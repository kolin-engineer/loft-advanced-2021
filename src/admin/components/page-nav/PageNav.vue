<template lang="pug">
.nav.container
  router-link.nav__link(:to="{name: 'About'}") Обо мне
  router-link.nav__link(:to="{name: 'Cases'}") Мои работы
  router-link.nav__link(:to="{name: 'Testimonials'}") Отзывы
</template>

<script>
import { routes } from "@/router";

export default {
  created() {
    this.navs = routes.filter((route) => route.path !== "/");
  },
};
</script>

<style lang="postcss" scoped>
.nav {
  background-color: white;
  display: flex;
  padding: 4px 0;
  &__link {
    line-height: 22px;
    padding: 27px;
    border-bottom: 3px solid transparent;
    &:hover {
      color: $admin-action-color;
      font-weight: 600;
      border-bottom-color: $admin-action-color;
    }
  }
}
.router-link-exact-active {
  color: $admin-action-color;
  font-weight: 600;
  border-bottom-color: $admin-action-color;
}
</style>
