<template lang="pug">
.login-page
  .content
    .modal
      LoginForm
      

</template>

<script>
import BaseCard from "components/card";
import BaseInput from "components/input";
import BaseIcon from "components/icon";
import BaseButton from "components/button";
import LoginForm from "components/login-form";

export default {
  components: {
    LoginForm,
  },
};
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.modal {
  position: relative;
  width: auto;
  height: auto;
  @include tablets {
    width: 100%;
    height: 100%;
  }
}
.login-page {
  height: 100vh;
  position: relative;
  background: url("~images/content/bg-admin.jpg") center / cover no-repeat;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(45, 60, 78, 0.8);
  }
}
</style>
