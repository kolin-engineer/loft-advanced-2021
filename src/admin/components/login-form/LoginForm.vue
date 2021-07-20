<template lang="pug">
BaseCard(simple).form-wrap
  form(@submit.prevent='onSubmit').login-form
    //- BaseIcon(symbol='cross' grayscale @click='$emit("close-form", $event)').login-form__close
    .login-form__title Авторизация
    BaseInput.login-form__login(icon="user" title='Логин' :errorMessage="login.error" v-model.trim="login.value" novalidate)
    //- errorMessage="Ошибка"
    BaseInput.login-form__pass(icon="key" title='Пароль' :errorMessage="pass.error"   v-model.trim="pass.value" type='password' novalidate) 
    .login-form__submit
      BaseButton(title='Отправить' :disabled='disableSubmit') 
    .login-form__errors

      
</template>
<script>
import BaseCard from "components/card";
import BaseInput from "components/input";
import BaseIcon from "components/icon";
import BaseButton from "components/button";
import useValidate from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import $axios from "../../requests";

const mixinField = {
  value: "",
  error: "",
};

export default {
  emits: ["close-form"],
  setup() {
    return { v$: useValidate() };
  },
  components: {
    BaseCard,
    BaseInput,
    BaseIcon,
    BaseButton,
  },
  data: () => ({
    disableSubmit: false,
    login: {
      ...mixinField,
    },
    pass: {
      ...mixinField,
    },
  }),
  validations() {
    return {
      login: {
        value: {
          required: helpers.withMessage("Поле не может быть пустым", required),
        },
      },
      pass: {
        value: {
          required: helpers.withMessage("Поле не может быть пустым", required),
          minLength: helpers.withMessage(
            "Пароль должен содержать не менее 3 символов",
            minLength(3)
          ),
        },
      },
    };
  },

  methods: {
    resetForm() {
      this.login = {
        ...mixinField,
      };
      this.pass = {
        ...mixinField,
      };
    },
    isValid() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        this.login.error = this.v$.login.$error
          ? this.v$.login.$errors[0].$message
          : "";
        this.pass.error = this.v$.pass.$error
          ? this.v$.pass.$errors[0].$message
          : "";
        return;
      }
      this.v$.$reset();
      this.login.error = "";
      this.pass.error = "";
      return true;
    },

    async onSubmit() {
      const user = {
        name: this.login.value,
        password: this.pass.value,
      };
      if (this.isValid()) {
        this.disableSubmit = true;
        try {
          const {
            data: { token },
          } = await $axios.post("/login", user);
          this.resetForm();
          localStorage.setItem("token", token);
          $axios.defaults.headers["Authorization"] = `Bearer ${token}`;
          $axios.get("/user").then((res) => {
            const {
              data: { user },
            } = res;
            this.$store.commit("auth/login", user);
            this.$router.replace({ name: "About" });
          });
        } catch (error) {
          console.warn(error);
          this.$store.dispatch("notification/show", {
            text: error.response.data.error,
            type: "error",
          });
        } finally {
          this.disableSubmit = false;
        }
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
@import "../../../styles/mixins.pcss";
.form-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  padding: 45px 77px 72px;
  @include tablets {
    padding: 10% 10%;
  }

  &__close {
    position: absolute;
    right: 30px;
    top: 30px;
  }
  &__title {
    font-size: 36px;
    line-height: 49px;
    margin-bottom: 29px;
    text-align: center;
  }
  &__login {
    margin-bottom: 39px;
  }
  &__pass {
    margin-bottom: 49px;
  }
  &__submit {
    text-align: center;
  }
}
</style>
