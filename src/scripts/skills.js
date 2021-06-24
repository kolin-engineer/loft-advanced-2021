// Skills Widget
import Vue from "vue";

// Vue Components
const SkillsItem = {
  template: "#skills-item",
  props: {
    tech: String,
    depth: Number,
  },
  computed: {
    strokeDashoffset() {
      return 256 - (256 * parseInt(this.depth)) / 100;
    },
  },
};

const SkillsGroup = {
  template: "#skills-group",
  components: {
    SkillsItem,
  },
  props: {
    groupName: String,
    skills: Array,
  },
};

// Vue App
new Vue({
  el: "#skills-widget",
  components: {
    SkillsGroup,
  },
  data: {
    skills: [],
  },
  created() {
    this.skills = require("../data/skills.json");
  },
  template: "#skills-list",
});
