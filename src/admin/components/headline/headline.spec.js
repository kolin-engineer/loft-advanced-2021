import headline from "./headline.vue";
import { mount } from "@vue/test-utils";

it("headline span", () => {
  const wrapper = mount(headline);

  expect(wrapper.element).toMatchSnapshot();
});
