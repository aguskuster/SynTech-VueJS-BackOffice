import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import FlashMessage from "@smartweb/vue-flash-message";


import HomeComponent from './components/HomeComponent.vue';
import listarUsuariosComponent from './components/listarUsuariosComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import agregarUsuarioComponent from './components/agregarUsuarioComponent.vue';
import eliminarUsuarioComponent from './components/eliminarUsuarioComponent.vue';
import modificarUsuarioComponent from './components/modificarUsuarioComponent.vue';
import ErrorComponent from './components/ErrorComponent.vue';


Vue.config.productionTip = false

Vue.use(FlashMessage);
Vue.use(VueRouter);
Vue.use(Vuelidate);

//acá declaramos todas nuestras rutas de navegación
const routes = [
    { path: '/', redirect: '/login' },
    { path: '/home', name: 'home', component: HomeComponent },
    { path: '/listarUsuarios', name: 'listarUsuarios', component: listarUsuariosComponent },
    { path: '/login', name: 'login', component: LoginComponent },
    { path: '/usuario', name: 'usuarioAgregar', component: agregarUsuarioComponent },
    { path: '/eliminarUsuario/:user', name: 'listar-usuario-eliminar', component: eliminarUsuarioComponent },
    { path: '/modificarUsuario/:user', name: 'listar-usuario-modificar', component: modificarUsuarioComponent },
    { path: '*', name: 'error404', component: ErrorComponent} 
];


const router = new VueRouter({ routes, mode: 'history' });

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')