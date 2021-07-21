<template lang="pug">
.page-reviews.container
  PageTitle(title='Мои отзывы')
  .edit-review(id="edit-review")
    EditReview(
      v-if='edit.state'
      @save='onSaveForm'
      @cancel='resetEditMode'
      :reviewProp='edit.review')
  //- pre {{reviews}}
  .reviews
    .review
      BaseButton(type="square" @click='edit.state = true')
    ReviewItem.review(
      v-for='review in reviews'
      :reviewProp='review'
      :key="review.id"
      @edit="onEditItem"
      @remove="onRemoveItem")

  //- Edit review

</template>

<script>
import PageTitle from "components/page-title";
import EditReview from "components/EditReview";
import BaseButton from "components/button";
import ReviewItem from "components/ReviewItem";

import { mapActions, mapState } from "vuex";

const mapReviews = (raw) => {
  const baseURL = "https://webdev-api.loftschool.com/";
  return raw.map((review) => {
    return { ...review, photo: `${baseURL}${review.photo}` };
  });
};

export default {
  components: {
    PageTitle,
    EditReview,
    BaseButton,
    ReviewItem,
  },
  data() {
    return {
      edit: {
        state: false,
        review: {},
      },
    };
  },
  methods: {
    ...mapActions("review", {
      fetchReviews: "fetch",
      createReview: "create",
      updateReview: "update",
      deleteReview: "delete",
    }),
    resetEditMode() {
      this.edit = {
        state: false,
        review: {},
      };
    },
    onSaveForm(review) {
      const reviewFormData = new FormData();
      for (const entry of Object.entries(review)) {
        reviewFormData.append(...entry);
      }
      if (review.id) {
        this.updateReview(reviewFormData);
      } else {
        this.createReview(reviewFormData);
      }
      this.resetEditMode();
    },
    onEditItem(review) {
      this.edit = {
        state: true,
        review,
      };
    },
    onRemoveItem(id) {
      this.deleteReview(id);
    },
  },
  computed: {
    ...mapState("review", {
      reviews: (state) => mapReviews(state.reviews),
    }),
  },
  created() {
    this.fetchReviews();
  },
};
</script>

<style lang="postcss" scoped>
.edit-review {
  margin-bottom: 30px;
}
.reviews {
  display: flex;
  flex-wrap: wrap;
  margin-right: -28px;
  @media screen and (max-width: 640px) {
    display: block;
    margin-right: 0;
  }
}
.review {
  margin-right: 28px;
  margin-bottom: 28px;
  @media screen and (min-width: 1200px) {
    flex: 0 0 calc(33% - 28px);
    margin-right: 28px;
  }
  @media screen and (max-width: 1199px) {
    flex: 0 0 calc(50% - 28px);
    margin-right: 28px;
  }
  @media screen and (max-width: 640px) {
    margin-right: 0;
  }
}
.container {
  @media screen and (max-width: 640px) {
    width: 100%;
  }
}
</style>
