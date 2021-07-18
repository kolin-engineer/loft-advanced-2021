<template lang="pug">
.page-reviews
  PageTitle(title='Мои отзывы')
  .edit-review
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

import { mapActions } from "vuex";

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
    mapReviews(raw) {
      const baseURL = "https://webdev-api.loftschool.com/";
      return raw.map((review) => {
        return { ...review, photo: `${baseURL}${review.photo}` };
      });
    },
  },
  computed: {
    reviews() {
      const rawReviews = this.$store.state.review.reviews;
      return this.mapReviews(rawReviews);
    },
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
  display: block;
  flex-wrap: wrap;
  /* margin-right: -28px; */
}
.review {
  margin-right: 28px;
  margin-bottom: 28px;
  @media screen and (max-width: 768px) {
    flex-basis: 100%;
  }
  @media screen and (max-width: 1200px) {
    flex-basis: cacl(33% - 28px);
  }
}
</style>
