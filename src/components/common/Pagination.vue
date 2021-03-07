<template>
  <div>
    <nav aria-label="Page navigation example mt-5">
      <ul class="pagination">
        <li class="page-item" :class="{disabled: !pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pagination.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="i in pagination.total_pages">
          <a class="page-link" href="#" @click.prevent="getProducts(i)">{{ i }}</a>
        </li>
        <li class="page-item" :class="{disabled: !pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pagination.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "Pagination",
  props: ["pagination"],
  data() {
    return {};
  },
  methods: {
    ...mapActions("productsModule", ["getProducts"]),
  },
  created() {},
};
</script>
