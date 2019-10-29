import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import Form from './utilities/Form';
import Vuex from 'vuex';

window.axios = axios;

window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
};

window.Vue = Vue;
Vue.use(VueRouter);
Vue.use(Vuex);
window.Form = Form;