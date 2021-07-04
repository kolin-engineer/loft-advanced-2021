import user from "./user.vue";
// import avatar from "../avatar";

export default {
  title: "user",
  components: { user },
};

export const defaultView = () => ({
  data() {
    return {
      dummyUser: {
        name: "Николай Колин",
        img: "https://picsum.photos/300/300",
      },
    };
  },
  components: {
    user,
    // avatar,
  },
  template: `
    <user :user="dummyUser"/>
  `,
});

defaultView.story = {
  name: "Default View",
};

export const lightView = () => ({
  data() {
    return {
      dummyUser: {
        name: "Николай Колин",
        img: "https://picsum.photos/300/300",
      },
    };
  },
  components: {
    user,
    // avatar,
  },
  template: `
    <user :user="dummyUser" mode='light'/>
  `,
});

lightView.story = {
  name: "Light View",
};

export const hasPositionView = () => ({
  data() {
    return {
      dummyUser: {
        name: "Николай Колин",
        img: "https://picsum.photos/300/300",
        position: "Developer",
      },
    };
  },
  components: {
    user,
    // avatar,
  },
  template: `
    <user :user="dummyUser"/>
  `,
});

hasPositionView.story = {
  name: "With Position View",
};
