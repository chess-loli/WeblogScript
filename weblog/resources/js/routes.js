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
];


export default new VueRouter({
    routes,
    linkActiveClass: 'is-active',
});