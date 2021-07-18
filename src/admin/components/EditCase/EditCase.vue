<template lang="pug">
.edit-case
  BaseCard(:title="title" )
    template(slot="content")
      form.grid(@submit.prevent='$emit("save", work)' ref='form')
        DropBox.drop(v-model='work.photo')
        .fieldset
          BaseInput(title='Название' v-model.trim='work.title')
          BaseInput(title='Ссылка' v-model.trim='work.link')
          BaseInput(title='Описание' fieldType="textarea" v-model.trim='work.description' )
          TagInput(v-model='work.techs')
          .buttons
            BaseButton.btn.cancel(title='Отменить' plain typeAttr="button" @click="$emit(`cancel`)")
            BaseButton(title='Сохранить')
</template>

<script>
import BaseCard from "components/card";
import BaseInput from "components/input";
import TagInput from "components/tag-input";
import DropBox from "components/DropBox";
import BaseButton from "components/button";

export default {
  emits: ["cancel", "save"],
  components: {
    BaseCard,
    BaseInput,
    TagInput,
    DropBox,
    BaseButton,
  },
  props: {
    workProp: Object,
  },
  data() {
    return {
      title: this.workProp.id ? "Редактирование работы" : "Создание работы",
      work: {
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: "",
        ...this.workProp,
      },
    };
  },
};
</script>

<style lang="postcss" scoped>
.grid {
  display: grid;
  grid-gap: 35px;
  grid-template:
    "drop fieldset" 300px
    ". fieldset" auto
    / 1fr 1fr;
  @media screen and (max-width: 768px) {
    grid-template:
      "drop" 300px
      "fieldset" / 1fr;
  }
}
.fieldset {
  grid-area: fieldset;
  display: grid;
  grid-gap: 30px;
}
.drop {
  grid-area: drop;
}
.buttons {
  text-align: right;
}
.btn {
  &.cancel {
    color: #383bcf;
  }
}
</style>
