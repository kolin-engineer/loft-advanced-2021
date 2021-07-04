<template lang="pug">
form.edit-row(@submit.prevent)
  .title
    BaseInput(noSidePaddings v-model.trim='currentTitle' :readonly="isReadOnlyMode" placeholder='Название новой группы')
  .actions
    BaseIcon(symbol='pencil'  @click="updateTitle" v-if="isReadOnlyMode" grayscale).action
    BaseIcon(symbol='tick'    @click="approve"     v-if="!isReadOnlyMode").action
    BaseIcon(symbol='cross'   @click="$emit('remove')"      v-if="!isReadOnlyMode").action
</template>

<script>
import BaseInput from "../input";
import BaseIcon from "../icon";

export default {
  emits: ["approve", "remove"],
  components: {
    BaseInput,
    BaseIcon,
  },
  props: {
    title: {
      type: String,
      require: true,
    },
    readonly: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isReadOnlyMode: this.readonly,
      currentTitle: this.title,
    };
  },
  methods: {
    _toogleMode() {
      this.isReadOnlyMode = !this.isReadOnlyMode;
    },
    updateTitle() {
      this._toogleMode();
      this.$emit("update-title", this.currentTitle);
    },
    cancel() {
      this.currentTitle = this.title;
      this._toogleMode();
    },
    approve() {
      if (this.currentTitle !== this.title) {
        this.$emit("approve", this.currentTitle);
      }
      this._toogleMode();
    },
  },
};
</script>

<style lang="postcss" scoped>
.edit-row {
  display: flex;
  justify-content: space-between;
}
.action * {
  & + & {
    margin-left: 19px;
  }
}
</style>
