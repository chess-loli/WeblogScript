import './bootstrap';
import store from './store';
import router from './routes';
import App from './pages/App.vue';

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
