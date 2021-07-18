import DropBox from "./DropBox.vue";

export default {
  title: "DropBox",
  component: DropBox,
};

export const defaultView = () => ({
  components: {
    DropBox,
  },
  template: `
    <div class='wrapper' style='height: 300px'>
    <DropBox />
    </div>
  `,
});
