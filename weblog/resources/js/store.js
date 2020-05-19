import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        posts: [],
        users: [],
        comments: [],
        current_user: null,
        categories: [],
    },
    mutations: {
        getAllPostsMutation(state, data) {
            state.posts = data.data
        },
        getAllCommentsMutation(state, data) {
            state.comments = data.data
        },
        getAllCategoriesMutation(state, data) {
            state.categories = data.data
        },
        getAllUsersMutation(state, data) {
            state.users = data.data
        },
        deletePostMutation(state, post) {
            state.posts.splice(state.posts.indexOf(post), 1)
        },
        deleteCommentMutation(state, comment) {
            state.comments.splice(state.comments.indexOf(comment), 1)
        },
        deleteCategoryMutation(state, category) {
            state.categories.splice(state.categories.indexOf(category), 1)
        },
        editPostMutation(state, data) {
            state.posts = data.data 
        },
        editCommentMutation(state, data) {
            state.comments = data.data
        },
        editCategoryMutation(state, data) {
            state.categories = data.data
        },
        createCommentMutation(state, data) {
            state.comments = data
        },
        createPostMutation(state, data) {
            state.posts = data
        },
        createCategoryMutation(state, data) {
            state.categories = data
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
        fetchPostMutation(state, data) {
            state.posts = [data];
        },
        filterPostsByCategoriesMutation(state, response) {
            state.posts = response.data
        }
        
    },
    actions: {
        createCommentAction(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('api/comments', payload)
                axios.get('api/comments')
                .then(({data}) => {
                    context.commit('createCommentMutation', data)
                    resolve(data)
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                })
            })
        },
        getAllPostsAction(context) {
            return axios.get('api/posts')
            .then(data => {
                context.commit('getAllPostsMutation', data)
            })
            .catch(error => {
                console.log(error);
            })
        },
        getAllCommentsAction(context) {
            return axios.get('api/comments')
            .then(data => {
                context.commit('getAllCommentsMutation', data)
            })
            .catch(error => {
                console.log(error);
            })
        },
        getAllCategoriesAction(context) {
            return axios.get('api/categories')
            .then(data => {
                context.commit('getAllCategoriesMutation', data)
            })
            .catch(error => {
                console.log(error);
            })
        },
        getAllUsersAction(context) {
            return axios.get('api/users')
            .then(data => {
                context.commit('getAllUsersMutation', data)
            })
            .catch(error => {
                console.log(error);
                
            })
        },
        deletePostAction(context, post) {
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
        deleteCommentAction(context, comment) {
            return new Promise((resolve, reject) => {
                axios.post(`api/comments/${comment.id}`, {'_method': 'DELETE'})
                .then(
                    context.commit('deleteCommentMutation', comment),
                    resolve(comment)
                )
                .catch(error => {
                    console.log(error);
                    reject(error.response.statusText)                    
                })
            })
        },
        deleteCategoryAction(context, category) {
            return new Promise((resolve, reject) => {
                axios.post(`api/categories/${category.id}`, {'_method': 'DELETE'})
                .then(
                    context.commit('deleteCategoryMutation', category),
                    resolve(category)
                )
                .catch(error => {
                    console.log(error);
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
        editCommentAction(context, payload) {
            return new Promise((resolve, reject) => {
                axios.patch(`api/comments/${payload.id}`, payload.formData)
                axios.get('api/comments')
                .then(data => {
                    context.commit('editCommentMutation', data)
                    resolve(data)
                })
                .catch(error => {
                    console.log(error);
                    reject(error.response.statusText)
                    
                })
            })
        },
        editCategoryAction(context, payload) {
            return new Promise((resolve, reject) => {
                axios.patch(`api/categories/${payload.id}`, payload.formData)
                acios.get('api/categories')
                .then(data => {
                    context.commit('editCategoryMutation', data)
                    resolve(data)
                })
                .catch(error => {
                    console.log(error);
                    reject(error.response.statusText)
                })
            })
        },
        fetchPostAction(context, id) {
            return new Promise((resolve, reject) => {
                axios.get(`api/posts/${id}`)
                    .then(({data}) => {
                        context.commit('fetchPostMutation', data);
                        resolve(data); 
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error);
                    });
            });
        },
        createPostAction(context, formData) {
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
        createCategoryAction(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('api/categories', payload)
                axios.get('api/categories')
                .then(({data}) => {
                    context.commit('createCategoryMutation', data)
                    resolve(data)
                })
                .catch(error => {
                    console.log(error);
                    reject(error.response.statusText)
                })
            })
        },
        signupUserAction(context, formData) {
            return axios.post('api/users', formData)
            .then(data => {
                context.commit('signupUserMutation', data);
            })
            .catch(error => {
                console.log(error);
            })
            
        },
        loginUserAction(context, formData) {            
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
        },
        filterPostsByCategoriesAction(context, payload) {
            return new Promise((resolve, reject) => {
                console.log(payload);
                axios.get('/api/posts', {params: { category_ids: payload.join() }}
                  )
                  .then(function (response) {
                    context.commit('filterPostsByCategoriesMutation', response)
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            })
        }
    },
    getters: {
        getPostsFromLoggedInUser: (state, getters) => {
            return getters.authIsAuth ? state.posts.filter((post) => post.user_id == state.current_user.id) : [];
        },
        authIsAuth: (state) => {
            return !!state.current_user;
        },
        getSinglePost: (state) => {
            return state.posts.length > 0 ? state.posts[0] : false;
        },
        getCommentsByID: (state) => (postID) => {
            return state.comments.filter(function(comment) {return comment.post_id == postID})
        },
        getCommentsFromLoggedInUser: (state) => {
            return state.comments.filter((comment) => comment.user_id == state.current_user.id)
        }
    },
});