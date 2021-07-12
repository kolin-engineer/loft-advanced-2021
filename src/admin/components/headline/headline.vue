<template lang="pug">
.headline
  .container 
    .slot-wrap
      slot(name='default')
    .title {{ title }}
    .right.btns
      button.btn(type='button' @click='logout') Выйти

</template>

<script>
export default {
  props: {
    title: String,
  },
  methods: {
    logout() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style lang="postcss" scoped src="./headline.pcss"></style>
