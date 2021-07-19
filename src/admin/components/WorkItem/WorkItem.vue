<template lang="pug">
.work(:class="{blocked}")
  BaseCard(simple)
    .work__header
      .work__photo-wrap
        img.work__img(:src="work.photo" v-if='work.photo')
        i(v-else) No Image
      .work__techs(v-if='work.techs')
        BaseTag(v-for="tech in work.techs.split(',')" :key='tech.id' :title='tech' readonly)
    .work__main
      .work__about
        h3.work__title {{work.title}}
        .work__description(v-text="truncate(work.description)")
      .work__footer
        a.work__link {{work.link}}
        .work__actions
          BaseIcon(title='Править' @click='$emit(`edit`, work)')
          BaseIcon(title='Удалить' symbol='cross' @click='$emit(`delete`, work)')

</template>

<script>
import BaseCard from "components/card";
import BaseIcon from "components/icon";
import BaseTag from "components/tag";
export default {
  components: {
    BaseIcon,
    BaseCard,
    BaseTag,
  },
  methods: {
    truncate(str, maxlen = 153) {
      return str.length > maxlen ? str.slice(0, maxlen - 3) + "..." : str;
    },
  },

  props: {
    emits: ["edit", "delete"],
    work: {
      type: Object,
      default: () => ({
        id: "",
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: "",
      }),
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="postcss">
.work {
  max-height: 560px;
  &.blocked {
    position: relative;
    cursor: not-allowed;
    filter: blur(0.9px);
    &::after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(white, 0.6);
    }
  }
  &__header {
    height: 190px;
    position: relative;
  }
  &__photo-wrap {
    height: 100%;
  }
  &__techs {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
  &__img {
    object-fit: cover;
    width: 100%;
  }
  &__main {
    padding: 34px 34px 44px 27px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  &__title {
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 6px;
  }
  &__description {
    line-height: 30px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(#414c63, 0.5);
  }
  &__link {
    color: #383bcf;
    font-size: 16px;
    line-height: 22px;
    font-weight: 600;
    margin-bottom: 40px;
    display: inline-block;
  }
  &__actions {
    display: flex;
    justify-content: space-between;
  }
}
</style>
