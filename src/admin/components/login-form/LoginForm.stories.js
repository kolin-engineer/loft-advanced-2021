import LoginForm from "./LoginForm.vue";
import { action } from "@storybook/addon-actions";

const methods = {
  onClose: action("onClose"),
};
export default {
  title: "login-form",
  component: LoginForm,
};

export const defaultView = () => ({
  components: {
    LoginForm,
  },
  methods,
  template: `
    <LoginForm @close-form='onClose' />
  `,
});

defaultView.story = {
  name: "Стандартный вид",
};
