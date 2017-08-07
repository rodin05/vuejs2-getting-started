import Vue from 'vue';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Toast,Button } from 'mint-ui'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import App from './App.vue';
import InfiniteLoad from './infiniteload.vue';
import Home from './Home.vue';
import Tables from './tables.vue';
import Mintuiexa from './mintuiexa.vue';
import Boot from './boot.vue';
import {ClientTable, Event} from 'vue-tables-2';

Vue.use(MintUI);
// Vue.component(Toast.name, Toast)
// Vue.component(Button.name, Button)
// Vue.use(Toast);
// Vue.use(Button);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ClientTable);
Vue.use(Event);

const routes = [
    {path: '/infiniteLoad', component: InfiniteLoad},
    {path: '/', component: Home},
    {path: '/tables', component: Tables},
    {path: '/mintuiexa', component: Mintuiexa},
    {path: '/boot', component: Boot}
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
