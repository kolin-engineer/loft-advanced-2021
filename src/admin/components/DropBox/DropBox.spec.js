import DropBox from "./DropBox.vue";
import { mount } from "@vue/test-utils";

it("snapshot dropbox", () => {
  const wrapper = mount(DropBox);

  expect(wrapper.element).toMatchSnapshot();
});
