import SkillRow from "./SkillRow.vue";
import { mount } from "@vue/test-utils";

let wrapper;
beforeEach(() => {
  wrapper = mount(SkillRow);
});
afterEach(() => {
  wrapper.destroy();
});

it("has validation error", async () => {
  const tech = wrapper.find(".tech");
  const percent = wrapper.find(".depth");
  const pencil = wrapper.find(".is-pencil");
  const approve = wrapper.find(".is-tick");

  expect(tech.attributes("readonly")).not;
  expect(wrapper.find(".is-tick").exists()).toBe(false);

  // Click on button
  await pencil.trigger("click");

  expect(wrapper.find(".is-tick").exists()).toBeTruthy();
  await wrapper.find(".is-tick").trigger("click");
  expect(wrapper.find(".input__error-tooltip").exists()).toBe(true);
});

it("Some Description", async () => {
  expect(true).toBeTruthy();
});
