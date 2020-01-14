import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        posts: [],
        users: [],
        current_user: null,
        comments: [],
    },
    mutations: {
        getAllPostsMutation(state, data) {
            state.posts = data.data
        },
        deletePostMutation(state, post) {
            state.posts.splice(state.posts.indexOf(post), 1)
        },
        editPostMutation(state, data) {
            state.posts = data.data 
        },
        createPostMutation(state, data) {
            state.posts = data
        },
        signupUserMutation(state, data) {
            state.users = data
        },
        loginUserMutation(state, data) {
            state = state
            localStorage.setItem('token', data.data.access_token)
        },
        logoutUserMutation(state) {
            state.current_user = {}
            localStorage.removeItem('token')
        },
        fetchUserMutation(state, data) {
            state.current_user = data.data
        },
        refreshUserMutation(state, data) {
            state = state
            localStorage.setItem('token', data.access_token)
        },
        
    },
    actions: {
        getAllPostsAction(context) {
            return axios.get('api/posts')
            .then(data => {
                context.commit('getAllPostsMutation', data)
            })
            .catch(error => {
                console.log(error);
            })
        },
        deletePostAction(context, post) {
            // axios.post(`api/posts/${post.id}`, {'_method': 'DELETE'})
            // .then(context.commit('deletePostMutation', post))
            return new Promise((resolve, reject) => {
                axios.post(`api/posts/${post.id}`, {'_method': 'DELETE'})
                .then(
                    context.commit('deletePostMutation', post),
                    resolve(post)
                    )
                .catch(error => {
                    reject(error.response.statusText)
                })
            })
        },
        editPostAction(context, payload) {
            return new Promise((resolve, reject) => {
                axios.patch(`api/posts/${payload.id}`, payload.formData)
                axios.get('api/posts')
                .then(data => {
                    context.commit('editPostMutation', data)
                    resolve(data)
                })
                .catch(error => {
                    console.log(error);
                    reject(error)
                })
            })
            
        },
        createPostAction(context, formData) {
            // axios.post('api/posts', formData)
            // axios.get('api/posts').then(({data}) => context.commit('createPostMutation', data))
            return new Promise((resolve, reject) => {
                axios.post('api/posts', formData)
                axios.get('api/posts')
                .then(({data}) => {
                    context.commit('createPostMutation', data)
                    resolve(data)
                })
                .catch(error => {
                    reject(error.response.statusText)
                })
            })
        },
        signupUserAction(context, formData) {
            // axios.post('api/users', formData)
            // axios.get('api/users').then(({data}) => context.commit('signupUserMutation', data))
            return axios.post('api/users', formData);
        },
        loginUserAction(context, formData) {
            // axios.post(`api/auth/login?email=${formData.email}&password=${formData.password}`).then(({data}) => context.commit('loginUserMutation', data))
            //return new Promise((resolve, reject) => {
            
            return axios.post(`api/auth/login`, {
                    email: formData.email,
                    password: formData.password
            })
            .then(data => {
                context.commit('loginUserMutation', data)
            })
            
        },
        fetchUserAction(context) {
            return new Promise((resolve,reject) => {
                axios.get('api/auth/me')
                .then(response => {
                    context.commit('fetchUserMutation', response)
                    resolve(response)
                })
                .catch(errors => {
                    reject(errors)
                })
            })
        },
        logoutUserAction(context) {
            axios.post('api/auth/logout')
                .then(data => {
                    context.commit('logoutUserMutation', data)
                })
        },
        refreshUserAction(context) {
            return new Promise((resolve, reject) => {
                axios.post('api/auth/refresh')
                .then(data => {
                    context.commit('refreshUserMutation', data)
                    resolve(data)
                })
                .catch(error => {
                    reject(data)
                })
            })
        }
    },
    getters: {
        getPostsFromLoggedInUser: (state) => {
            return state.posts.filter((post) => post.user_id == state.current_user.id)
        },
        authIsAuth: (state) => {
            return !!state.current_user;
        },
    },

});