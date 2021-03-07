export default {
    namespaced: true,
    state: {
        isLoading: false,
    },
    mutations: {
        LOADING(state, status) {
            state.isLoading = status;
        } 
    },
    actions: {
    },
    getters: {
        isLoading: state => state.isLoading
    }
}