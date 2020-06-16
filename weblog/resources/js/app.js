import './bootstrap';
import store from './store';
import router from './routes';
import App from './pages/App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
