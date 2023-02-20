import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import FlashMessage from "@smartweb/vue-flash-message";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import HomeComponent from './components/HomeComponent.vue';

import listarGrupoComponent from './components/listarGrupoComponent.vue';
import modificarGrupoComponent from './components/modificarGrupoComponent.vue';
import modificarMateriaComponent from './components/modificarMateriaComponent.vue';
import ErrorComponent from './components/ErrorComponent.vue';
import listarMateriaComponent from './components/listarMateriaComponent.vue';
import agregarUsuarioGrupoComponent from './components/agregarUsuarioGrupoComponent.vue';
import historialDeAccionesComponent from './components/historialDeAccionesComponent.vue';
import modificarPerfilComponent from './components/modificarPerfilComponent.vue';
import agregarNoticiasComponent from './components/agregarNoticiasComponent.vue';

import agregarMateriaComponent from './components/agregarMateriaComponent.vue';
import listarCarreraComponent from './components/listarCarreraComponent.vue';
import agregarCarreraComponent from './components/agregarCarreraComponent.vue';



import listarUsuariosComponent from './components/Usuario/listarUsuariosComponent.vue';
import agregarUsuariosComponent from './components/Usuario/agregarUsuariosComponent.vue';
import modificarUsuarioComponent from './components/Usuario/modificarUsuarioComponent.vue';

import listarAlumnoComponent from './components/Alumno/listarAlumnoComponent.vue';
import agregarAlumnoComponent from './components/Alumno/agregarAlumnoComponent.vue';
import modificarAlumnoComponent from './components/Alumno/modificarAlumnoComponent.vue';

import listarProfesorComponent from './components/Profesor/listarProfesorComponent.vue';
import agregarProfesorComponent from './components/Profesor/agregarProfesorComponent.vue';
import modificarProfesorComponent from './components/Profesor/modificarProfesorComponent.vue';

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(FlashMessage);
Vue.use(VueRouter);
Vue.use(Vuelidate);

//acá declaramos todas nuestras rutas de navegación
const routes = [
    { path: '/', redirect: 'home' },
    { path: '/home', name: 'home', component: HomeComponent },
    
    { path: '/listarGrupo', name: 'listarGrupo', component: listarGrupoComponent },
    { path: '/modificarGrupo/:idGrupo', name: 'listar-grupo-modificar', component: modificarGrupoComponent },
    { path: '/materias', name: 'listarMateria', component: listarMateriaComponent },
    { path: '/materias/crear', name: 'agregar-materia', component: agregarMateriaComponent },
    { path: '/modificarMateria/:idMateria/:Materia', name: 'modificarMateria', component: modificarMateriaComponent },
    { path: '/miembro-grupo/:grupo', name: 'miembroGrupo', component: agregarUsuarioGrupoComponent },
    { path: '/historial', name: 'historial-acciones', component: historialDeAccionesComponent },
    { path: '/noticias', name: 'noticias', component: agregarNoticiasComponent },
    { path: '/perfil/:idUsuario', name: 'modificar-perfil', component: modificarPerfilComponent },

    { path: '/carrera', name: 'listado-carrera', component: listarCarreraComponent },
    { path: '/carrera/crear', name: 'crear-carrera', component: agregarCarreraComponent },

   

    { path: '/usuarios', name: 'listarUsuarios', component: listarUsuariosComponent },
    { path: '/usuarios/crear', name: 'usuarioAgregar', component: agregarUsuariosComponent },
    { path: '/usuarios/:user', name: 'listar-usuario-modificar', component: modificarUsuarioComponent },

    { path: '/alumnos', name: 'listarUsuarios', component: listarAlumnoComponent },
    { path: '/alumnos/crear', name: 'usuarioAgregar', component: agregarAlumnoComponent },
    { path: '/alumnos/:user', name: 'listar-usuario-modificar', component: modificarAlumnoComponent },

    { path: '/profesores', name: 'listarUsuarios', component: listarProfesorComponent },
    { path: '/profesores/crear', name: 'usuarioAgregar', component: agregarProfesorComponent },
    { path: '/profesores/:user', name: 'listar-usuario-modificar', component: modificarProfesorComponent },

    { path: '*', name: 'error404', component: ErrorComponent },
];


const router = new VueRouter({ routes, mode: 'history' });

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')