<template lang="pug">
  .tag 
    .tag__title {{ title }}
    .tag__action(v-if='!readonly')
      BaseIcon(
        symbol='cross'
        grayscale
        @click='$emit("remove", title)'
        v-on='$listeners'
      )
</template>

<script>
import BaseIcon from "../icon";
export default {
  components: {
    BaseIcon,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="postcss" scoped>
.tag {
  white-space: nowrap;
  padding: 6px 20px;
  border-radius: 50px;
  background: #f3f6f9;
  color: rgba(40, 51, 64, 0.5);
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  &__action {
    padding-left: 13px;
    margin-left: auto;
    display: flex;
  }
}
</style>
