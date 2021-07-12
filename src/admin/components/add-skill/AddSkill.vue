<template lang="pug">
form.form(@submit.prevent :class='{"blocked" : blocked}')
  BaseInput.form__tech(
    v-model.trim='tech'
    :error-message="techErr"
    placeholder='Новый навык')
  BaseInput.form__depth(
    v-model.number='depth'
    :error-message="depthErr"
    type="number")
  BaseButton(type='iconed' :size='4' title='' @click='addSkill').form__action
</template>
<script>
import BaseButton from "../button";
import BaseInput from "../input";
import useValidate from "@vuelidate/core";
import { required, between, helpers } from "@vuelidate/validators";

export default {
  components: {
    BaseButton,
    BaseInput,
  },
  props: {
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tech: "",
      depth: "",
      techErr: "",
      depthErr: "",
    };
  },
  validations() {
    return {
      tech: {
        required: helpers.withMessage("Поле не может быть пустым", required),
      },
      depth: {
        required: helpers.withMessage("Поле не может быть пустым", required),
        between: helpers.withMessage("Некоректное значение", between(0, 100)),
      },
    };
  },
  setup() {
    return { v$: useValidate() };
  },
  methods: {
    _isValidForm() {
      this.v$.$touch();
      this.techErr = this.v$.tech.$error
        ? this.v$.tech.$errors[0].$message
        : "";
      this.depthErr = this.v$.depth.$error
        ? this.v$.depth.$errors[0].$message
        : "";
      return !this.v$.$invalid;
    },
    addSkill() {
      if (this._isValidForm()) {
        const skill = {
          tech: this.tech,
          depth: this.depth,
        };
        this.$emit("add", skill);
        this.tech = "";
        this.depth = "";
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.form {
  position: relative;
  display: flex;
  justify-content: flex-end;
  &.blocked {
    filter: grayscale(80%);
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  &__tech {
    flex-basis: 0 1 220px;
  }
  &__depth {
    flex: 0 0 75px;
    margin-left: 8px;
    position: relative;
    &:after {
      content: "%";
      position: absolute;
      top: 50%;
      right: 2px;
      font-size: 16px;
      line-height: 22px;
      transform: translateY(-50%);
      color: $admin-text-color;
    }
  }
  &__action {
    flex: 0 0 40px;
    margin-left: 30px;
  }
}
</style>
