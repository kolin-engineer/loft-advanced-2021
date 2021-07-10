<template lang="pug">
form.edit-row(@submit.prevent)
  .title
    BaseInput(
      v-model.trim='currentTitle'
      noSidePaddings
      :error-message="error"
      :readonly="isReadOnlyMode"
      placeholder='Название новой группы'
      @keydown.native.enter="approve"
      )
  .actions
    BaseIcon(symbol='pencil'  @click="_toogleMode" v-if="isReadOnlyMode" grayscale).action
    BaseIcon(symbol='tick'    @click='approve' v-if="!isReadOnlyMode").action
    BaseIcon(symbol='cross'   @click='$emit("remove")'  v-if="!isReadOnlyMode").action
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
      require: false,
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
      error: "",
    };
  },
  watch: {
    currentTitle() {
      this.error = "";
    },
  },
  methods: {
    _toogleMode() {
      this.isReadOnlyMode = !this.isReadOnlyMode;
    },
    cancel() {
      this.currentTitle = this.title;
      this._toogleMode();
    },
    approve() {
      this.error = "";
      if (this.currentTitle === "") {
        this.error = "Поле не может быть пустым";
        return;
      }
      this.$emit("approve", this.currentTitle);
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
