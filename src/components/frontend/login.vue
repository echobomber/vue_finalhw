<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="loginModal"
      tabindex="-1"
      aria-labelledby="loginModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Login</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="userAccount">Email address</label>
                <input
                  v-model="userData.username"
                  type="email"
                  class="form-control"
                  id="userAccount"
                  aria-describedby="emailHelp"
                />
                <small id="emailHelp" class="form-text text-muted"
                  >We'll never share your email with anyone else.</small
                >
              </div>
              <div class="form-group">
                <label for="userPassword">Password</label>
                <input
                  v-model="userData.password"
                  type="password"
                  class="form-control"
                  id="userPassword"
                />
              </div>
              <div class="form-group form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1"
                  >Check me out</label
                >
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="login()"
            >
              登入
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";

export default {
  data() {
    return {
      userData: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      vm.$store.commit("loadingModule/LOADING", true);
      vm.axios.post(api, vm.userData).then((response) => {
        console.log(response.data.message);
        // 因為跨域設定讓後端沒辦法直接設定 cookies，所以改成由後端發送 token, 然後前端再把 token 的內容存入 cookies
        const token = response.data.token;
        const expired = response.data.expired;
        // 存入 cookies
        document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
        vm.$router.push("/admin/products");
        $("#loginModal").modal("hide");
        vm.$store.commit("loadingModule/LOADING", false);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>