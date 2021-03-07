import axios from 'axios';

export default {
    namespaced: true,
    state: {
        products: [],
        pagination: {},
    },
    mutations: {
        PRODUCTS(state, payload) {
            state.products = payload;
        },
        PAGINATION(state, payload) {
            state.pagination = payload;
        },
    },
    actions: {
        getProducts(context, payload) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${payload}`;
            context.commit('loadingModule/LOADING', true, { root: true });
            axios.get(api).then((response) => {
                // console.log(response);
                context.commit('PRODUCTS', response.data.products);
                context.commit('PAGINATION', response.data.pagination);
                context.commit('loadingModule/LOADING', false, { root: true });
            });
        },
    },
    getters: {
        products: state => state.products,
        pagination: state => state.pagination
    }
}