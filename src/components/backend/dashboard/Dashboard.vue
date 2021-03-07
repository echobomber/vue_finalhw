<template>
  <div>
    <Alert />
    <Navbar />
    <div class="container-fluid">
      <div class="row">
        <Sidebar />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
import Alert from '../../common/AlertMessage.vue';

export default {
  components: {
    Navbar,
    Sidebar,
    Alert
  },
  created() {
    // 取出 cookies
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // axios 的方法，所有的 API 都會被設定到。往後端送 (後端路徑的設定在哪?)
    this.$http.defaults.headers.common.Authorization = `${token}`;
  },
};
</script>