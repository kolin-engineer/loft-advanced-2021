<template lang="pug">
BaseCard.group
  template(slot='title')
    EditRow(
      :title='group.name'
      :readonly='!isBlank'
      @approve='approve'
      @remove='$emit("remove-group", group.id)'
    )
  template(slot='content')
    .content(v-if="!isBlank")
      .skills-list
          SkillRow(
            v-for='skill in group.skills'
            :key='skill.id'
            :skill='skill.name'
            @update-skill='updateSkill'
            @remove-skill='removeSkill'
            ) 
    .footer
      AddSkill(@add-skill='addSkill' :blocked="isBlank")
      
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
      default: () => ({ name: "", id: "", skills: "" }),
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
    approve(newTitle) {
      if (this.isBlank) {
        this.$emit("create-group", newTitle);
        return;
      }

      this.$emit("update-group", { id: this.group.id, title: newTitle });
    },
    removeSkill(id) {
      this.currentSkills = this.currentSkills.filter((el) => el.id !== id);
    },
    addSkill(skill) {
      this.currentSkills.push({
        ...skill,
        id: Date.now(),
      });
    },
    updateSkill(skill) {
      this.$emit("update-skill", {
        skill: {
          ...skill,
        },
        groupName: this.currentGroupName,
      });
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
