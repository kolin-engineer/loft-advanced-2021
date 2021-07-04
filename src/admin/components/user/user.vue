<template lang="pug">
.u(:class='mode')
  .u__img
    avatar(:src='user.img')
  .u__about
    .u__name {{ user.name }}
    .u__position(v-if='user.position') {{ user.position }}

  
</template>

<script>
import avatar from "../avatar";
export default {
  components: {
    avatar,
  },
  props: {
    user: Object,
    mode: {
      type: String,
      require: false,
      default: "",
    },
  },
};
</script>

<style lang="postcss" scoped>
.u {
  color: $admin-text-color;
  display: flex;
  align-items: center;
  &__img {
    margin-right: 18px;
  }
  &__name {
    font-size: 18px;
    line-height: 24px;
    font-weight: 700;
  }
  &__position {
    color: rgba($admin-text-color, 0.5);
    font-size: 16px;
    line-height: 21px;
    font-weight: 600;
  }
  &.light {
    color: white;
    &__position {
      color: rgba(#fff, 0.5);
    }
  }
}
</style>
