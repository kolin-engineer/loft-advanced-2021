<template lang="pug">
.edit-testimonial
  BaseCard(:title='title')
    template(slot="content")
      form.form(@submit.prevent='onSubmit')
        label.avatar 
          .preview(:style="{background: previewImg ? `no-repeat url(${previewImg}) center / 100%` : `` } ")
          .loadlink 
            span.loadlink__anchor(v-text='previewImg ? `Изменить фото` : `Добавить фото` ')
            input.visible-hide.loadlink__input(type="file" @change='handleUpload')
        .fields
          .author.row
            BaseInput.name(title='Имя автора' v-model='review.author')
            BaseInput.occ(title='Титул автора' v-model='review.occ')
          .row
            BaseInput.col(title='Сообщение' fieldType="textarea" v-model='review.text')
          .row
            .col.btns
              BaseButton(title='Отменить' plain @click='$emit(`cancel`)')
              BaseButton(title='Сохранить')
</template>

<script>
import BaseCard from "components/card";
import BaseInput from "components/input";
import BaseButton from "components/button";
export default {
  emits: ["cancel", "save"],
  components: {
    BaseCard,
    BaseInput,
    BaseButton,
  },
  props: {
    reviewProp: {
      type: Object,
      default: () => ({
        photo: "",
        author: "",
        occ: "",
        text: "",
      }),
    },
  },

  data() {
    return {
      title: this.reviewProp.id ? "Редактирование отзыва" : "Новый отзыв",
      review: {
        ...this.reviewProp,
      },
      previewImg: this.reviewProp.photo,
    };
  },
  methods: {
    onSubmit() {
      this.$emit("save", this.review);
    },
    _isImage(file) {
      const isImage = file.type.match(/image\/*/);
      if (!isImage) {
        this.$store.dispatch("notification/show", {
          text: "Допустимые файлы: *.png, *.jpg, *.jpeg, *.gif",
          type: "warning",
        });
        return;
      }
      return true;
    },
    renderPhoto(file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImg = reader.result;
      };
      reader.onerror = () => {
        this.$store.dispatch("notification/show", {
          text: "Произошла ошибка при загрузке картинки",
          type: "error",
        });
      };
      reader.onabort = () => {
        this.$store.dispatch("notification/show", {
          text: "Загрузка файла прервана",
          type: "error",
        });
      };
      reader.readAsDataURL(file);
    },
    handleUpload(ev) {
      ev.preventDefault();
      const file = ev.target.files[0];
      this.review.photo = file;
      if (!this._isImage(file)) return;
      this.renderPhoto(file);
    },
  },
};
</script>
<style lang="postcss" scoped>
.form {
  padding: 46px 0 55px;
  max-width: 875px;
  display: flex;
}
.visible-hide {
  position: absolute;
  top: 0;
  left: -9999px;
  height: 1px;
  width: 1px;
  overflow: hidden;
}
.loadlink {
  &__input {
  }
  &__anchor {
    display: inline-block;
    padding: 20px;
    color: #383bcf;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
    }
  }
}
.fields {
  flex: 1;
}
.avatar {
  padding: 0 33px;
  text-align: center;
}
.row {
  & + & {
    margin-top: 35px;
  }
}
.btns {
  text-align: right;
  color: #383bcf;
}

.author {
  display: flex;
  justify-content: space-between;
  & > * {
    flex-basis: 48%;
  }
}
.preview {
  width: 200px;
  height: 200px;
  background: #dee4ed no-repeat
    svg-load("user.svg", fill= #ffffff, width=100%, height=100%) center / auto
    60%;
  border-radius: 50%;
}
</style>
