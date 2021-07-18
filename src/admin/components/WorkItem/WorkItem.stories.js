import WorkItem from "./WorkItem.vue";
export default {
  title: "WorkItem",
  component: WorkItem,
};

export const defaultView = () => ({
  components: {
    WorkItem,
  },
  template: `
    <WorkItem />
  `,
});

export const blockedView = () => ({
  components: {
    WorkItem,
  },
  template: `
    <WorkItem blocked />
  `,
});

blockedView.story = {
  name: "Заблокированный",
};
