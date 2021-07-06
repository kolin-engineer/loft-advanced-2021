<template lang="pug">
form.form(@submit.prevent :class='{"blocked" : blocked}')
  BaseInput(v-model='newSkill.tech' :error-message="error" placeholder='Новый навык').form__tech
  BaseInput(v-model='newSkill.depth' type="number" min=0 max=100).form__depth
  BaseButton(type='iconed' :size='4' title='' @click='addSkill').form__action
</template>
<script>
import BaseButton from "../button";
import BaseInput from "../input";
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
      newSkill: {
        tech: "",
        depth: 100,
      },
      error: "",
    };
  },
  methods: {
    addSkill() {
      this.error = "";
      if (this.newSkill.tech === "") {
        this.error = "Укажите навык";
        return;
      }
      this.$emit("add-skill", this.newSkill);
      this.newSkill = {
        tech: "",
        depth: 100,
      };
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
