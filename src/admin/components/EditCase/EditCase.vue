<template lang="pug">
.edit-case
  BaseCard(:title="title" )
    template(slot="content")
      form.grid(@submit.prevent='onSave' ref='form')
        DropBox.drop(v-model='work.photo' :error-message="errorFor(`photo`)")
        .fieldset
          BaseInput(title='Название' v-model.trim='work.title' :error-message='errorFor(`title`)')
          BaseInput(title='Ссылка' v-model.trim='work.link' :error-message='errorFor(`link`)')
          BaseInput(title='Описание' fieldType="textarea" v-model.trim='work.description' :error-message='errorFor(`description`)' )
          TagInput(v-model='work.techs' :error-message="errorFor(`techs`)")
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
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

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
  setup() {
    return { v$: useValidate() };
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
  validations() {
    return {
      work: {
        title: {
          required: helpers.withMessage("Поле не может быть пустым", required),
        },
        link: {
          required: helpers.withMessage("Поле не может быть пустым", required),
        },
        description: {
          required: helpers.withMessage("Поле не может быть пустым", required),
        },
        techs: {
          required: helpers.withMessage("Поле не может быть пустым", required),
        },
        photo: {
          required: helpers.withMessage("Поле не может быть пустым", required),
        },
      },
    };
  },
  computed: {
    errorFor: function() {
      const vm = this;
      return (field) => {
        return vm.v$.work[field].$error
          ? vm.v$.work[field].$errors[0].$message
          : "";
      };
    },
  },
  methods: {
    onSave() {
      this.v$.$touch();
      if (this.v$.$invalid) return;
      this.$emit("save", this.work);
    },
  },
};
</script>

<style lang="postcss" scoped src="./editcase.pcss"></style>
