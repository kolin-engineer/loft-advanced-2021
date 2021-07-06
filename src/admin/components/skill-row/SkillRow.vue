<template lang="pug">
.skill-row
  BaseInput(:readonly='readonly' :error-message="error" noSidePaddings v-model.trim="currentSkill.tech").tech
  BaseInput(:readonly='readonly' v-model.number='currentSkill.depth' unit='%' @dblclick='editMode').depth
  .actions
    BaseIcon(symbol='pencil' grayscale v-if='readonly' @click='editMode')
    BaseIcon(symbol="tick" v-else @click='updateSkill')
    BaseIcon(symbol='trash' grayscale v-if='readonly' @click="removeSkill")
    BaseIcon(symbol='cross' v-else @click='readOnlynoSave')

</template>
<script>
import BaseInput from "../input";
import BaseIcon from "../icon";

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
      validator: (skill) =>
        ["id", "tech", "depth"].every((key) => key in skill),
    },
  },
  data() {
    return {
      readonly: true,
      currentSkill: {},
      error: "",
    };
  },
  methods: {
    _toogleMode() {
      this.readonly = !this.readonly;
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
    removeSkill() {
      this.$emit("remove-skill", this.currentSkill.id);
    },
    updateSkill() {
      this.error = "";
      if (this.currentSkill.tech === "") {
        this.error = "Введите навык";
        return;
      }
      this.$emit("update-skill", this.currentSkill);
      this._toogleMode();
    },
  },
  created() {
    this.currentSkill = {
      ...this.skill,
    };
  },
};
</script>

<style lang="postcss">
.skill-row {
  display: flex;
  justify-content: space-between;
}
.tech {
  flex: 0 1 220px;
}
.depth {
  flex: 0 0 75px;
}
.actions > * + * {
  margin-left: 19px;
}
</style>
