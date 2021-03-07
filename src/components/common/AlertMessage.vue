<template>
  <div class="message-alert">
    <div class="alert alert-danger alert-dismissible fade show" role="alert" v-for="(item, i) in message">
      <strong>{{ item.message }}</strong>
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "AlertMessage",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("alertModule", ["message"]),
  },
  created() {},
};
</script>
<style scoped>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 200px;
  z-index: 1100;
}
</style>