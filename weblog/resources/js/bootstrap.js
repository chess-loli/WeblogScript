import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import Form from './utilities/Form';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import router from './routes';


window.axios = axios;

window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
};

axios.interceptors.request.use(config => 
    {
        let token = window.localStorage.getItem('token');
        if (token)
        {
            config.headers['Authorization'] = 'Bearer' + token;
        }
        return config;
    })
axios.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status === 401) {
        router.push('/users/login')
    }
        return Promise.reject(error);
    }
)
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);


window.Vue = Vue;
window.Form = Form;