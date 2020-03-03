import VueRouter from 'vue-router';
import store from './store';


let routes = [
    {
        path: '/',
        component: require('./components/PostsComponent').default,
        meta: { public: true, layout: 'posts' },
    },
    {
        path: '/create',
        component: require('./components/CreatePostComponent').default,
        meta: { private: true , layout: 'posts'}
    },
    {
        path: '/created',
        redirect: '/',
        meta: { private: true , layout: 'posts'}
    },
    {
        path: '/posts/:id/edit',
        name: 'posts.edit',
        component: require('./components/EditPostComponent').default,
        meta: { private: true , layout: 'posts'}
    },
    {
        path: '/comments/:id/edit',
        name: 'comments.edit',
        component: require('./components/EditCommentComponent').default,
        meta: { private: true , layout: 'posts'}
    },
    {
        path: '/posts/:id/show',
        name: 'posts.show',
        component: require('./components/ShowPostComponent').default,
        meta: { public: true , layout: 'posts'}
    },
    {
        path: '/users/login',
        name: 'users.login',
        component: require('./components/LoginComponent').default,
        meta: { public: true , layout: 'users'}
    },
    {
        path: '/users/signup',
        name: 'users.signup',
        component: require('./components/SignupComponent').default,
        meta: { public: true , layout: 'users'}
    },
    {
        path: '/users/logout',
        name: 'users.logout',
        component: require('./components/LogoutComponent').default,
        meta: { private: true , layout: 'users'}
    },
    {
        path: '/users/profile',
        name: 'users.profile',
        component: require('./components/ProfilePage').default,
        meta: { private: true , layout: 'users'}
    },
    {
        path: '/admin',
        name: 'admin.page',
        component: require('./components/AdminDashboard').default,
        meta: { private: true, admin: true , layout: 'admin'}
    },
    {
        path: '/categories',
        name: 'categories.page',
        component: require('./components/CategoriesComponent').default,
        meta: { private:true, admin: true, layout: 'admin' }
    },
    {
        path: '/categories/create',
        name: 'categories.create',
        component: require('./components/CreateCategoryComponent').default,
        meta: { private: true, admin: true, layout: 'admin' }
    },
];


const router = new VueRouter({
    routes,
    linkActiveClass: 'is-active',
});

router.beforeEach((to, from, next) =>
{
    const currentUser = store.state.current_user;
    const authRequired = !to.matched.some(record => record.meta.public);
    const loggedIn = store.getters['authIsAuth'];
    const mustBeAdmin = to.matched.some(record => record.meta.admin);

    if (authRequired)
    {
        if(!loggedIn) {
            return next({ name: 'users.login' });
        }
        if(mustBeAdmin && currentUser.role != 'admin') {
            return next({ name: 'users.login' });
        }
    }

    next();
});

export default router;
