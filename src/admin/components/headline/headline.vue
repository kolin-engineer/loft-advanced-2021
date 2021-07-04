<template lang="pug">
.headline
  .container 
    .slot-wrap
      slot(name='default')
    .title {{ title }}
    .right.btns
      button.btn(type='button') Выйти

</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style lang="postcss" scoped src="./headline.pcss"></style>
