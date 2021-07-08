<template lang="pug">
.title 
  .title__text {{ title }}
  .title__slot
    slot
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Admin",
    },
  },
};
</script>
<style lang="postcss" scoped>
.title {
  padding: 50px 0;
  display: flex;
  &__text {
    margin-right: 54px;
    font-size: 21px;
    line-height: 28px;
    font-weight: 700;
  }
  &__slot {
  }
}
</style>
