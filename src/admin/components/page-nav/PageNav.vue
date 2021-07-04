<template lang="pug">
.nav.container
  a.nav__link(href='' v-for='link in navs' :key='link' :class='{active: link === activeLink}') {{ link }}

</template>

<script>
export default {
  props: {
    navs: Array,
    activeLink: String,
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
    &:hover,
    &.active {
      color: $admin-action-color;
      font-weight: 600;
      border-bottom-color: $admin-action-color;
    }
  }
}
</style>
