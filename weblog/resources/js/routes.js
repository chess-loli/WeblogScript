import VueRouter from 'vue-router';

let routes = [
    {
        path: '/',
        component: require('./components/PostsComponent').default
    },
    {
        path: '/create',
        component: require('./components/CreatePostComponent').default,
    },
    {
        path: '/created',
        redirect: '/'
    },
    {
        path: '/posts/:id/edit',
        name: 'posts.edit',
        component: require('./components/EditPostComponent').default
    },
    {
        path: '/users/login',
        name: 'users.login',
        component: require('./components/loginComponent').default
    },
    {
        path: '/users/signup',
        name: 'users.signup',
        component: require('./components/signupComponent').default
    }
];


export default new VueRouter({
    routes,
    linkActiveClass: 'is-active',
});