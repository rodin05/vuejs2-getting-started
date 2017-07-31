import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import App from './App.vue';
import InfiniteLoad from './infiniteload.vue';
import Home from './Home.vue';
import Tables from './tables.vue';
import {ClientTable, Event} from 'vue-tables-2';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ClientTable, {
    perPage: 25
})

const routes = [
    {path: '/infiniteLoad', component: InfiniteLoad},
    {path: '/', component: Home},
    {path: '/tables', component: Tables}
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
