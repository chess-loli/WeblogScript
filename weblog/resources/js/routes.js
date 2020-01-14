import VueRouter from 'vue-router';
import store from './store';


let routes = [
    {
        path: '/',
        component: require('./components/PostsComponent').default,
        meta: { public: true },
    },
    {
        path: '/create',
        component: require('./components/CreatePostComponent').default,
        meta: { private: true }
    },
    {
        path: '/created',
        redirect: '/',
        meta: { private: true }
    },
    {
        path: '/posts/:id/edit',
        name: 'posts.edit',
        component: require('./components/EditPostComponent').default,
        meta: { private: true }
    },
    {
        path: '/users/login',
        name: 'users.login',
        component: require('./components/LoginComponent').default,
        meta: { public: true }
    },
    {
        path: '/users/signup',
        name: 'users.signup',
        component: require('./components/SignupComponent').default,
        meta: { public: true }
    },
    {
        path: '/users/logout',
        name: 'users.logout',
        component: require('./components/LogoutComponent').default,
        meta: { private: true }
    },
    {
        path: '/users/profile',
        name: 'users.profile',
        component: require('./components/ProfilePage').default,
        meta: { private: true }
    },
];


const router = new VueRouter({
    routes,
    linkActiveClass: 'is-active',
});

router.beforeEach((to, from, next) =>
{
    const authRequired = !to.matched.some(record => record.meta.public);
    const loggedIn = store.getters['authIsAuth'];

    if (authRequired && !loggedIn)
    {
        return next({ name: 'users.login' });
    }
    next();
});

export default router;
