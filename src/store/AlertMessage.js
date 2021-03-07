export default {
    namespaced: true,
    state: {
        message: []
    },
    mutations: {
        MESSAGE(state, payload) {
            state.message.push(payload);
        }
    },
    actions: {
        updateMessage(context, {message, status}) {
            const timestamp = Math.floor(new Date() / 1000);
            context.commit('MESSAGE', { message, status, timestamp });
            context.dispatch('removeMessage', timestamp);
        },
        removeMessage(context, timestamp) {
            let message = context.state.message;
            setTimeout(() => {
                message.forEach((item, i) => {
                    if(item.timestamp = timestamp){
                        context.state.message.splice(i, 1);
                    }
                })
            }, 3000);
        }
    },
    getters: {
        message: state => state.message
    }
}