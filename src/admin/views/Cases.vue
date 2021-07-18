<template lang="pug">
.page-cases
  //- Page Title Component
  PageTitle(title='Мои работы')
  EditCase.edit-case(@save='onSave' @cancel='resetEdit' :workProp="edit.work" v-if='edit.state')
  //- Cases List Component
  .work-list
    .work-item
      BaseButton(type="square" title="Добавить" @click='edit.state = true')
    WorkItem(
      class='work-item'
      @edit='onEdit'
      @delete='onDelete'
      :blocked="work.id === edit.work.id"
      v-for='work in works'
      :key='work.id'
      :work="{...work, photo: baseURL+work.photo }")

</template>

<script>
import PageTitle from "components/page-title";
import EditCase from "components/EditCase";
import WorkItem from "components/WorkItem";
import BaseButton from "components/button";

export default {
  components: {
    PageTitle,
    EditCase,
    WorkItem,
    BaseButton,
  },
  data() {
    return {
      baseURL: "https://webdev-api.loftschool.com/",
      edit: {
        state: false,
        work: {},
      },
    };
  },
  methods: {
    onSave(work) {
      const formData = new FormData();
      for (const [name, value] of Object.entries(work)) {
        formData.append(name, value);
      }

      if (work.id) {
        this.$store.dispatch("work/update", formData);
      } else {
        this.$store.dispatch("work/create", formData);
      }
      this.resetEdit();
    },
    onEdit(work = null) {
      this.edit.state = true;
      if (work) {
        this.edit.work = work;
      }
    },
    onDelete(work) {
      this.$store.dispatch("work/delete", work.id);
    },
    resetEdit() {
      this.edit = {
        state: false,
        work: {},
      };
    },
  },
  computed: {
    works() {
      const works = this.$store.state.work.works;
      this.edit.state = works.length ? false : true;
      return works;
    },
  },
  created() {
    this.$store.dispatch("work/fetch");
  },
};
</script>

<style lang="postcss" scoped>
.edit-case {
  margin-bottom: 26px;
}
.work-list {
  display: flex;
  flex-wrap: wrap;
  margin-right: -20px;
  margin-bottom: -20px;
  @media screen and (max-width: 767px) {
    display: block;
  }
}
.work-item {
  flex: 0 0 calc(33% - 28px);
  margin-right: 28px;
  margin-bottom: 28px;
  @media screen and (max-width: 1199px) {
    flex: 0 0 calc(50% - 28px);
  }
  @media screen and (max-width: 767px) {
    margin-right: 0;
  }
}
</style>
