<template lang="pug">
BaseCard.group
  template(slot='title')
    EditRow(
      :title='currentGroupName'
      :readonly='!isBlank'
      @approve='updateTitle'
      @remove="$emit('remove', $event)"
    )
  template(slot='content')
    .content(v-if="!isBlank")
      .skills-list
          SkillRow(
            v-for='skill in currentSkills'
            :key='skill.id'
            :skill='skill'
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
    groupName: String,
    groupSkills: Array,
    isBlank: Boolean,
  },
  data() {
    return {
      newGroupName: "",
      group: "",
      currentSkills: this.groupSkills,
      currentGroupName: this.groupName,
    };
  },

  methods: {
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
    updateTitle() {
      this.$emit("update-group-name", {
        id: this.groupName,
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
