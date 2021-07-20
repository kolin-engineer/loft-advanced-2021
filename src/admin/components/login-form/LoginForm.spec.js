import LoginForm from "./LoginForm.vue";
import { mount } from "@vue/test-utils";

let wrapper, actions, store;
beforeEach(() => {
  localStorage.clear();
  localStorage.setItem.mockClear();
  // jest.clearAllMocks();
  wrapper = mount(LoginForm);
});

afterEach(() => {
  wrapper.destroy();
  store = {};
});

jest.mock("axios", () => ({
  defaults: {
    headers: {},
  },
  interceptors: {
    response: {
      use: () => {},
    },
  },
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        user: {
          id: 1,
          name: "dummyJest",
        },
      },
    })
  ),
  post: jest.fn(() =>
    Promise.resolve({
      data: {
        token: "validToken",
      },
    })
  ),
}));

it("valiate input", async () => {
  await wrapper.vm.$nextTick();
  wrapper.setData({ login: { value: "login" }, pass: { value: "pass" } });
  expect(wrapper.vm.isValid()).toBeTruthy();
  wrapper.setData({ login: { value: "" }, pass: { value: "" } });
  expect(wrapper.vm.isValid()).toBeFalsy();
  wrapper.setData({ login: { value: "Name" }, pass: { value: "12" } });
  expect(wrapper.vm.isValid()).toBeFalsy();
});

it("set token to localStorate", async () => {
  wrapper.setData({ login: { value: "login" }, pass: { value: "pass" } });
  await wrapper.vm.onSubmit();
  expect(localStorage.getItem("token")).toBe("validToken");
});
