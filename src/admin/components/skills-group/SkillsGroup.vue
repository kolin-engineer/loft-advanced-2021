<template lang="pug">
BaseCard.group
  template(slot='title')
    EditRow(
      :title='group.category'
      :readonly='!isBlank'
      @approve='approve'
      @remove='$emit("delete-group", group.id)'
    )
  template(slot='content')
    .content(v-if="!isBlank")
      .skills-list
          SkillRow(
            v-for='skill in group.skills'
            :key='skill.id'
            :skill='skill'
            @update-skill='updateSkill'
            @remove='deleteSkill'
            ) 
    .footer
      AddSkill(
        @add='createSkill' :blocked="isBlank")
      
</template>

<script>
import BaseCard from "../card";
import SkillRow from "../skill-row";

export default {
  name: "SkillsGroup",
  emit: ["update-group-name", "update-skill"],
  components: {
    BaseCard,
    SkillRow,
    EditRow: () => import("../edit-row"),
    AddSkill: () => import("../add-skill"),
  },
  props: {
    group: {
      type: Object,
      default: () => ({ category: "", id: "", skills: "" }),
      require: false,
    },
    isBlank: Boolean,
  },
  data() {
    return {
      currentSkills: this.groupSkills,
      title: this.groupName,
    };
  },

  methods: {
    createSkill(skill) {
      const newSkill = {
        category: this.group.id,
        title: skill.tech,
        percent: skill.depth,
      };
      this.$emit("create-skill", newSkill);
    },
    approve(newTitle) {
      if (this.isBlank) {
        this.$emit("create-group", newTitle);
        return;
      }

      this.$emit("update-group", { id: this.group.id, title: newTitle });
    },
    deleteSkill(skill) {
      this.$emit("delete-skill", skill);
    },
    updateSkill(skill) {
      this.$emit("update-skill", skill);
    },
  },
};
</script>

<style lang="postcss" scoped>
.group {
  min-height: 390px;
}
.footer {
  padding-top: 30px;
  margin-top: auto;
}
</style>
