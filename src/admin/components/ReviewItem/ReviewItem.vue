<template lang="pug">
.review-item
  BaseCard
    template(slot='title')
      BaseUser(:user="user")
    template(slot='content')
      .content
        .text(v-text="truncate(reviewProp.text)")
        .btns
          BaseIcon(title='править' @click='$emit(`edit`, reviewProp)')
          BaseIcon(symbol='cross' title='удалить' @click='$emit(`remove`, reviewProp.id)' )
</template>
<script>
import BaseCard from "components/card";
import BaseUser from "components/user";
import BaseIcon from "components/icon";
export default {
  components: {
    BaseCard,
    BaseUser,
    BaseIcon,
  },
  props: {
    reviewProp: Object,
    // default: () => ({
    //   author: "",
    //   occ: "",
    //   photo: "",
    //   text: "",
    // }),
    // validator: (review) => {
    //   const isEmpty =
    //     Object.keys(review).length === 0 && review.constructor === Object;
    //   return !isEmpty;
    // },
  },
  data() {
    return {
      review: { ...this.reviewProp },
    };
  },
  methods: {
    truncate(str, maxlen = 193) {
      return str.length > maxlen ? str.slice(0, maxlen - 3) + "..." : str;
    },
  },
  computed: {
    user() {
      return {
        name: this.reviewProp.author,
        position: this.reviewProp.occ,
        img: this.reviewProp.photo,
      };
    },
  },
};
</script>

<style lang="postcss" scoped>
.review-item {
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.btns {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.text {
  flex: 1;
  font-weight: 600;
  font-size: 16px;
  line-height: 30px;
  color: rgba(65, 76, 99, 0.7);
}
</style>
