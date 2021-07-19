<template lang="pug">
.skill-row(@keydown.enter='approve')
  BaseInput(:readonly='readonly' :error-message="techErr" noSidePaddings v-model.trim="tech").tech
  BaseInput(:readonly='readonly' :error-message="depthErr" v-model.number='depth' unit='%' type='number').depth
  .actions
    BaseIcon(symbol='pencil' grayscale v-if='readonly' @click='editMode')
    BaseIcon(symbol="tick" v-else @click='approve')
    BaseIcon(symbol='trash' grayscale v-if='readonly' @click=`$emit("remove", skill)` )
    BaseIcon(symbol='cross' v-else @click='cancel')

</template>
<script>
import BaseInput from "../input";
import BaseIcon from "../icon";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, between } from "@vuelidate/validators";

export default {
  name: "SkillRow",
  components: {
    BaseInput,
    BaseIcon,
  },
  emits: ["update-skill", "remove-skill"],
  props: {
    skill: {
      type: Object,
      require: true,
    },
  },
  setup() {
    return { v$: useVuelidate() };
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
  data() {
    return {
      readonly: true,
      tech: this.skill.title,
      depth: this.skill.percent,
      techErr: "",
      depthErr: "",
    };
  },
  methods: {
    _toogleMode() {
      this.readonly = !this.readonly;
    },
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
    _isChanged() {
      return (
        this.skill.title !== this.tech || this.skill.percent !== this.depth
      );
    },
    editMode() {
      this._toogleMode();
    },
    readOnlynoSave() {
      this._toogleMode();
      this.currentSkill = {
        ...this.skill,
      };
    },

    approve() {
      if (!this._isChanged()) {
        this._toogleMode();
        return;
      }
      if (this._isValidForm()) {
        this.$emit("update-skill", {
          ...this.skill,
          title: this.tech,
          percent: this.depth,
        });
        this._toogleMode();
      }
    },
    cancel() {
      this.tech = this.skill.title;
      this.depth = this.skill.percent;
      this._toogleMode();
    },
  },
};
</script>

<style lang="postcss">
.skill-row {
  display: flex;
  justify-content: space-between;
}
.tech {
  flex: 1;
}
.depth {
  margin-left: auto;
  flex: 0 0 75px;
}
.actions > * + * {
  margin-left: 19px;
}
</style>
