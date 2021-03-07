<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Login />
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#loginModal"
    >
      登入按鈕
    </button>
  </div>
</template>
<script>
import Login from "@/components/frontend/login";
import {mapGetters} from 'vuex';

export default {
  name: 'Index',
  components: {
    Login,
  },
  computed: {
    ...mapGetters("loadingModule", ['isLoading'])
  }
};
</script>
