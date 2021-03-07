<template>
  <div class="col-md-9 col-lg-10 ml-sm-auto px-md-4">
    <loading :active.sync="isLoading"></loading>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary my-4 float-right"
      data-toggle="modal"
      data-target="#editModal"
      @click.prevent="openModal((isNew = true))"
    >
      新增產品
    </button>
    <table class="table">
      <thead>
        <tr>
          <th width="120" scope="col">分類</th>
          <th scope="col">產品名稱</th>
          <th width="150" scope="col">原價</th>
          <th width="150" scope="col">售價</th>
          <th width="150" scope="col">是否啟用</th>
          <th width="150" scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products">
          <th scope="row">{{ item.category }}</th>
          <td>{{ item.title }}</td>
          <td>{{ item.origin_price | currency }}</td>
          <td>{{ item.price | currency }}</td>
          <td><span v-if="item.is_enabled" class="text-success">啟用</span></td>
          <td>
            <button
              type="button"
              data-toggle="modal"
              data-target="#editModal"
              class="btn btn-outline-primary mr-1"
              @click.prevent="openModal((isNew = false), item)"
            >
              編輯
            </button>
            <button
              type="button"
              data-toggle="modal"
              data-target="#deleteModal"
              class="btn btn-outline-primary"
              @click.prevent="openDeleteModel(item)"
            >
              刪除
            </button>
          </td>
        </tr>
        <Pagination :pagination="pagination"></Pagination>
      </tbody>
    </table>
    <!-- 新增 Modal -->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">新增產品</h5>
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
              <div class="form-row">
                <div class="col-md-4 mb-3">
                  <div class="form-group">
                    <label for="imgUrl">輸入圖片網址</label>
                    <input
                      v-model="tempProduct.imageUrl"
                      type="text"
                      class="form-control is-valid"
                      id="imgUrl"
                      required
                    />
                    <div class="valid-feedback">網址輸入正確</div>
                    <div class="invalid-feedback">網址輸入錯誤</div>
                  </div>
                  <div class="form-group">
                    <label for="imgUpload">
                      <i
                        class="fas fa-spinner fa-spin"
                        v-if="status.fileUploading"
                      ></i>
                      上傳圖片
                    </label>
                    <input
                      type="file"
                      ref="files"
                      @change="uploadFile"
                      class="form-control is-invalid"
                      id="imgUpload"
                      required
                    />
                    <div class="valid-feedback">圖片格式正確</div>
                    <div class="invalid-feedback">圖片格式錯誤</div>
                    <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
                  </div>
                </div>
                <div class="col-md-8 mb-3">
                  <div class="form-group">
                    <label for="productTitle">請輸入標題</label>
                    <input
                      v-model="tempProduct.title"
                      type="text"
                      class="form-control is-valid"
                      id="productTitle"
                      placeholder="請輸入標題"
                    />
                  </div>
                  <div class="form-row">
                    <div class="col-6 form-group">
                      <label for="productCategary">分類</label>
                      <input
                        v-model="tempProduct.category"
                        type="text"
                        id="productCategary"
                        class="form-control is-valid"
                        placeholder="請輸入分類"
                      />
                    </div>
                    <div class="col-6 form-group">
                      <label for="productUnit">單位</label>
                      <input
                        v-model="tempProduct.unit"
                        type="text"
                        class="form-control is-valid"
                        id="productUnit"
                        placeholder="請輸入單位"
                      />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-6 form-group">
                      <label for="OriginPrice">原價</label>
                      <input
                        v-model="tempProduct.origin_price"
                        type="number"
                        class="form-control is-valid"
                        id="OriginPrice"
                        placeholder="請輸入原價"
                      />
                    </div>
                    <div class="col-6 form-group">
                      <label for="productPrice">售價</label>
                      <input
                        v-model="tempProduct.price"
                        type="number"
                        class="form-control is-valid"
                        id="productPrice"
                        placeholder="請輸入售價"
                      />
                    </div>
                  </div>
                  <hr />
                  <div class="form-group">
                    <label for="productDecription">請輸入產品描述</label>
                    <textarea
                      v-model="tempProduct.description"
                      class="form-control"
                      id="productDecription"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="productContent">請輸入產品說明內容</label>
                    <textarea
                      v-model="tempProduct.content"
                      class="form-control"
                      id="productContent"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <input
                      v-model="tempProduct.is_enabled"
                      id="isEnabled"
                      :true-value="1"
                      :false-value="0"
                      type="checkbox"
                      aria-label=""
                      class="mr-2"
                    />
                    <label for="isEnabled">是否啟用</label>
                  </div>
                </div>
              </div>
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
              @click.prevent="addProduct()"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除 Modal -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">刪除產品</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">確定要刪除 {{ tempProduct.title }} ?</div>
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
              @click.prevent="deleteProduct()"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { mapActions, mapGetters } from "vuex";
import Pagination from "@/components/common/Pagination";

export default {
  name: "Products",
  components: {
    Pagination,
  },
  data() {
    return {
      tempProduct: {},
      isNew: false,
      status: {
        fileUploading: false,
      },
    };
  },
  methods: {
    openModal(isNew, item) {
      const vm = this;
      if (isNew) {
        vm.tempProduct = {};
      } else {
        vm.tempProduct = {
          category: item.category,
          content: item.content,
          description: item.description,
          id: item.id,
          image: item.image,
          is_enabled: item.is_enabled,
          origin_price: item.origin_price,
          price: item.price,
          title: item.title,
          unit: item.unit,
          num: item.num,
          imageUrl: item.imageUrl,
        };
      }
    },
    addProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      this.$http.post(api, { data: vm.tempProduct }).then((response) => {
        vm.getProducts();
        $("#editModal").modal("hide");
        vm.tempProduct = {};
      });
    },
    openDeleteModel(item) {
      const vm = this;
      vm.tempProduct = {
        id: item.id,
        title: item.title,
      };
    },
    deleteProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api).then((response) => {
        vm.getProducts();
        $("#deleteModal").modal("hide");
        vm.tempProduct = {};
      });
    },
    uploadFile() {
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      vm.status.fileUploading = true;
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      this.$http
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
          } else {
            const message = response.data.message;
            const status = "alert-danger";
            this.updateMessage({message, status});
          }
          vm.status.fileUploading = false;
        });
    },
    ...mapActions("productsModule", ["getProducts"]),
    ...mapActions("alertModule", ["updateMessage"])
  },
  computed: {
    ...mapGetters("productsModule", ["products", "pagination"]),
    ...mapGetters("loadingModule", ["isLoading"]),
  },
  created() {
    this.getProducts(1);
  },
};
</script>
