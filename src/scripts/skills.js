import Vue from "vue";
import config from "../../env.paths.json";
import axios from "axios";
axios.defaults.baseURL = config.BASE_URL;

// Vue Components
const SkillsItem = {
  template: "#skills-item",
  props: {
    title: String,
    percent: Number,
  },
  computed: {
    strokeDashoffset() {
      return 256 - (256 * parseInt(this.percent)) / 100;
    },
  },
};

const SkillsGroup = {
  template: "#skills-group",
  components: {
    SkillsItem,
  },
  props: {
    category: String,
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
    categories: [],
  },
  async created() {
    // this.skills = require("../data/skills.json");
    try {
      const { data } = await axios.get("/categories/467");
      this.categories = data;
    } catch (error) {
      console.warn(error);
    }
  },
  template: "#skills-list",
});
