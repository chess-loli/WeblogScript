import Vuex from 'vuex';
import axios from 'axios';
import Form from './utilities/Form';

export default new Vuex.Store({
    state: {
        posts: [],
        users: [],
        // comments: [],
    },
    mutations: {
        getAllPostsMutation(state, data) {
            state.posts = data
        },
        deletePostMutation(state, post) {
            state.posts.splice(state.posts.indexOf(post), 1)
        },
        editPostMutation(state, data) {
            state.posts = data 
        },
        createPostMutation(state, data) {
            state.posts = data
        },
        signupUserMutation(state, data) {
            state.users = data
        },
    },
    actions: {
        getAllPostsAction(context) {
            axios.get('api/posts').then(({data}) => context.commit('getAllPostsMutation', data))
        },
        deletePostAction(context, post) {
            axios.post(`api/posts/${post.id}`, {'_method': 'DELETE'})
            .then(context.commit('deletePostMutation', post))
        },
        editPostAction(context, payload) {
            axios.patch(`api/posts/${payload.id}`, payload.formData)
            axios.get('api/posts').then(({data}) => context.commit('editPostMutation', data))
            
        },
        createPostAction(context, formData) {
            axios.post('api/posts', formData)
            axios.get('api/posts').then(({data}) => context.commit('createPostMutation', data))
        },
        signupUserAction(context, formData) {
            axios.post('api/users', formData)
            axios.get('api/users').then(({data}) => context.commit('signupUserMutation', data))
        },
        loginUserAction(context, formData) {
            axios.post(`api/auth/login?email=${formData.email}&password=${formData.password}`).then(({data}) => context.commit('loginUserMutation', data))
        }
    },
    getters: {
        allPostsGetter(state) {
            // return state.posts;
        }
    },

});