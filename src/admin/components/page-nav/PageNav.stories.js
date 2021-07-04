import PageNav from "./PageNav.vue";

export default {
  title: "PageNav",
  component: PageNav,
};

export const defaultView = () => ({
  components: {
    PageNav,
  },
  data() {
    return {
      navs: ["Обо мне", "Cases", "Отзывы"],
    };
  },
  template: `
    <PageNav :navs="navs" activeLink="Обо мне"/>
  `,
});
