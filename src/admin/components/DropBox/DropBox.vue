<template lang="pug">
.component
  .preview(v-if="previewImg")
    .img-wrap
      img(:src='previewImg')
    BaseButton.btn.reset(title='Изменить превью' plain @click='previewImg=""') 
  label(
    v-else
    :class='["dropbox", {dragover}]'
    @drop='handleUpload'
    @dragover.prevent='dragover = true'
    @dragleave='dragover = false'
  )
    .content
      .title Перетащите или загрузите для #[br] загрузки изображения
      BaseButton.button(title='Загрузить' typeAttr='file' @change='handleUpload')
  .tooltip(v-if='errorMessage')
    tooltip(:text="errorMessage")
</template>

<script>
import BaseButton from "../button";
import tooltip from "components/tooltip";

export default {
  components: {
    BaseButton,
    tooltip,
  },
  model: {
    prop: "photo",
    event: "change",
  },
  props: {
    photo: {
      type: String | {},
      default: "",
    },
    errorMessage: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      dragover: false,
      previewImg: this.photo,
    };
  },
  methods: {
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
    renderFile(file) {
      if (!this._isImage(file)) return;
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
      this.dragover = false;
      const file = ev.dataTransfer
        ? ev.dataTransfer.files[0]
        : ev.target.files[0];
      this.renderFile(file);
      this.$emit("change", file);
    },
  },
};
</script>

<style lang="postcss" scoped>
.component {
  position: relative;
}
.dropbox {
  min-height: 280px;
  height: 100%;
  border: 1px dashed #a1a1a1;
  background-color: #dee4ed;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.33;

  &.dragover {
    background-color: rgba(#dee4ed, 0.2);
    box-shadow: inset 2px 2px 5px rgba(#000, 0.2);
  }
}

.title {
  color: rgba(grey, 0.6);
  font-weight: 600;
  line-height: 20px;
  margin-bottom: 40px;
}
.btn {
  &.reset {
    color: #383bcf;
  }
}
.preview {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img-wrap {
  max-height: 250px;
  max-width: ;
}
</style>
