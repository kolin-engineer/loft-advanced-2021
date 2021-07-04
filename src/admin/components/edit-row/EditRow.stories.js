import EditRow from "./EditRow.vue";
import { action } from "@storybook/addon-actions";

const methods = {
  onApprove: action("onApprove"),
};
export default {
  title: "edit-row",
  component: EditRow,
};

export const defaultView = () => ({
  components: {
    EditRow,
  },
  methods,
  template: `
      <EditRow title='Group Name' @approve='onApprove' />
    `,
});
