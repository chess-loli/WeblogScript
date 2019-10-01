import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import Form from './utilities/Form';

window.axios = axios;

window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
};

window.Vue = Vue;
Vue.use(VueRouter);
window.Form = Form;