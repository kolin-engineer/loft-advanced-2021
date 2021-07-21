<template lang="pug">
.tag-input
  BaseCard
    template(slot='title')
      BaseInput(:error-message="errorMessage" title='Добавление тега' v-model='tags' @input="$emit('change', tags)") 
    template(slot='content')
      .tag-input__list
        BaseTag(
          v-for="(tag, index) in tagsArr"
          :title='tag'
          :key="tag + index" 
          @remove='removeTag'
          )
  

</template>

<script>
import BaseCard from "../card";
import BaseInput from "../input";
import BaseTag from "../tag";
export default {
  components: {
    BaseInput,
    BaseCard,
    BaseTag,
  },
  props: {
    "error-message": {
      type: String,
      default: "",
    },
    tagsProp: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      tags: this.tagsProp,
    };
  },
  model: {
    prop: "tagsProp",
    event: "change",
  },
  computed: {
    tagsArr() {
      let tagsArr = [];
      tagsArr = this.tags.split(/,*\s*,+\s*/gm).filter((el) => !!el);
      this.tags = this.tags.replace(/\s{2,}/, " ");
      this.tags = this.tags.replace(/,{2,}/, ",");
      return tagsArr;
    },
  },
  methods: {
    removeTag(tag) {
      this.tags = this.tagsArr.filter((el) => el !== tag).join(",");
    },
  },
};
</script>

<style>
.tag-input {
  position: relative;
}
.error {
  border: 1px solid red;
}
</style>
