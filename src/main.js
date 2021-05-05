import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import FlashMessage from "@smartweb/vue-flash-message";


import HomeComponent from './components/HomeComponent.vue';
import listarUsuariosComponent from './components/listarUsuariosComponent.vue';
import ServiciosComponent from './components/ServiciosComponent.vue';
import ServiciosDetalleComponent from './components/ServiciosDetalleComponent.vue';
import ContactoComponent from './components/ContactoComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import ErrorComponent from './components/ErrorComponent.vue';


Vue.config.productionTip = false

Vue.use(FlashMessage);
Vue.use(VueRouter);
Vue.use(Vuelidate);

//acá declaramos todas nuestras rutas de navegación
const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: HomeComponent },
    { path: '/listarUsuarios', name: 'listarUsuarios', component: listarUsuariosComponent },
    { path: '/servicios', name: 'servicios', component: ServiciosComponent },
    { path: '/servicios-detalle/:slug', name: 'servicios-detalle', component: ServiciosDetalleComponent },
    { path: '/contacto', name: 'contacto', component: ContactoComponent },
    { path: '/login', name: 'login', component: LoginComponent },
    { path: '*', name: 'error404', component: ErrorComponent} 
];


const router = new VueRouter({ routes, mode: 'history' });

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')