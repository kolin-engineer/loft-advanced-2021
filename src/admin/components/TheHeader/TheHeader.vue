<template lang="pug">
.header
  headline(title='Панель администратора')
    TheUser(mode='light' :user='user')
  PageNav
</template>

<script>
import headline from "@/admin/components/headline";
import PageNav from "@/admin/components/page-nav";
import TheUser from "@/admin/components/user";

export default {
  components: {
    headline,
    PageNav,
    TheUser,
  },
  data() {
    return {
      user: {
        name: "Кирилович Николай",
        img: require("images/content/kolin.jpg").default,
      },
    };
  },
};
</script>
