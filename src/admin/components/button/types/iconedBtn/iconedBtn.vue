<template>
  <button v-on="$listeners" class="button-component">
    <span class="plus" :style="sizeStyle"></span>
    {{ title }}
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Добавить группу",
    },
    size: {
      type: Number | String,
      default: 2,
    },
  },
  computed: {
    sizeStyle() {
      const pxls = parseInt(this.size) * 10;
      return `
        width: ${pxls}px;
        height: ${pxls}px;
        flex-basis: ${pxls}px;
        line-height: ${pxls}px;
        `;
    },
  },
};
</script>

<style lang="postcss" scoped src="./iconedBtn.pcss"></style>
