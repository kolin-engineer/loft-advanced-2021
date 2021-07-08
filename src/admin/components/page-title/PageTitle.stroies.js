import PageTitle from "./PageTitle.vue";

export default {
  title: "PageTitle",
  component: PageTitle,
};

export const defaultView = () => ({
  components: {
    PageTitle,
  },
  data() {
    return {
      title: "Обо мне",
    };
  },
  template: `
    <PageTitle :title="title">
      <span> [SLOT] </span>
    </PageTitle>
  `,
});
