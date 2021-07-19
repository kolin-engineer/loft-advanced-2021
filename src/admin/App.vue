<template lang="pug">
.app
  router-view(name='login')
  router-view(name='header')
  main.app__main
    router-view(name="default")
  .notifications(:class="{active: notification.isShown}")
    BaseNotification(:text='notification.text', :type='notification.type' @click="closeNotification")

</template>

<script>
import BaseButton from "./components/button";
import BaseNotification from "./components/notification";
import { mapState } from "vuex";
export default {
  components: {
    BaseButton,
    BaseNotification,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      notification: (state) => state.notification.notification,
    }),
  },
  methods: {
    closeNotification() {
      this.$store.dispatch("notification/hide");
    },
  },
  created() {
    this.closeNotification();
  },
};
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";

body {
  color: $admin-text-color;
}
</style>

<style lang="postcss" scoped src="./app.pcss"></style>
