<template>
  <div>
    <div class="contenedor_menu">
      <vue-headful :title="title"/>
      <h2>Noticias</h2>
    </div>
    <div class="contenedorGeneral" style="justify-content: space-evenly">
      <div
          class="contenedorIzquierdo"
          style="width: 30% !important; height: 49rem; position: relative"
      >
        <h4>Crear Noticia</h4>
        <div class="m-2 p-2">
          <form action="" class="p-4">
            <label for="titulo" class="form-label"> Titulo de la Noticia</label>
            <input
                type="text"
                id="titulo"
                v-model="noticia.titulo"
                name="titulo"
                class="form-control mb-3"
                required
            />

            <label for="encabezado">Imagen Encabezado</label>
            <input
                name="encabezado"
                class="form-control mb-3"
                @change="getEncabezado"
                type="file"
                id="formFile"
            />
            <label for="mensaje" class="form-label"> Mensaje</label>
            <textarea
                id="mensaje"
                v-model="noticia.mensaje"
                name="mensaje"
                class="form-control mb-5"
                rows="4"
                cols="50"
            ></textarea>
            <input
                class="form-control mb-3"
                @change="getFile"
                type="file"
                id="formFile"
            />
            <hr/>

            <div class="contenedor_archivos">
              <div
                  class="archivo"
                  v-for="archivo in noticia.archivos"
                  :key="archivo.id"
              >
                {{ archivo.name }}
              </div>
            </div>
          </form>
        </div>

        <div style="position: absolute; right: 10px; bottom: 10px">
          <div>
            <button class="btn btn-primary" @click="publicarNoticia()">
              Publicar Noticia
            </button>
          </div>
        </div>
      </div>


      <!--      ///////-->
      <div
          class="contenedorDerechoPersona"
          style="width: 65% !important; height: 49rem; position: relative"
      >
        <h4>Listado de Noticias</h4>
        <div class="p-4">
          <div style="width: 85%;margin: auto;">
            <label for="fecha" class="form-label">Filtrar por fecha :</label>
            <input type="date" name="fecha" id="fecha"/>
          </div>

          <div class="contenedor_principal_noticias">

            <div class="accordion" id="accordionExample"
                 v-for="noticia in todasNoticias"
                 :key="noticia.data.id"
                 style="width: 85%; margin: auto;">
              <div class="card">
                <div class="card-header" id="headingOne">
                  <h2 class="mb-0">
                    <button class="btnCustom btn-block text-left atr" type="button" data-toggle="collapse"
                            :data-target="'#col'+noticia.data.id" aria-expanded="true" aria-controls="collapseOne">
                      <div style="display: flex;flex-direction: row; position: relative">
                        <div>
                          <img :src="returnIMGB64(noticia.data.imagenEncabezado)" alt="" width="100px"/>
                        </div>
                        <div style="margin-left: 1rem;display: flex;flex-direction: column">
                          <p> {{ noticia.data.titulo }}
                          </p>
                          <small> Publicado por {{ noticia.data.nombreAutor }}</small>
                        </div>
                        <small style="position: absolute;right: 0;">{{momentFechaParaHumanos(noticia.data.fecha)}}</small>
                      </div>
                    </button>
                  </h2>
                </div>

                <div :id="'col' + noticia.data.id" class="collapse " aria-labelledby="headingOne"
                     data-parent="#accordionExample">
                  <div class="card-body" style="padding: 10px;">
                    <p> {{ noticia.data.mensaje }}</p>
                    <div v-if="noticia.archivos != ''">
                      <label style="display: flex;justify-content: center;">
                        Archivos
                      </label>
                      <div class="archivo"
                           v-for="archivo in noticia.archivos"
                           :key="archivo.id">

                      <span style="cursor: pointer" @click="descargarPDF(archivo)">
                       {{ simplificarNombre(archivo) }}
                      </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import vueHeadful from "vue-headful";
import {Global} from "../Global";
import axios from "axios";
import moment from 'moment'
export default {
  name: "NoticiasComponent",
  components: {
    vueHeadful,
  },
  data() {
    return {
      title: "Noticias",
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token_BO"))),
      todasNoticias: "",
      imgEncabezado: {
        nombre: "",
        img: [],
      },
      noticia: {
        titulo: "",
        mensaje: "",
        archivos: [],
      },
      
    };
  },
  mounted() {
    this.traerNoticias();
  },
  methods: {
    momentFechaParaHumanos(fecha){
      moment.locale('ES');
      return moment(fecha).fromNow();
    },
    returnIMGB64(img) {
      return "data:image/png;base64," + img;
    },
    getEncabezado(event) {
      let size = event.target.files[0].size;
      let res = size * 0.000001;
      if (res <= 50) {
        this.imgEncabezado.img = event.target.files[0];
        this.imgEncabezado.nombre = event.target.files[0].name;
      } else {
        this.$swal.fire("Capo foto muy pesada , proba otra", "", "info");
      }
    },
    getFile(event) {
      let size = event.target.files[0].size;
      let res = size * 0.000001;

      if (this.noticia.archivos.length > 3) {
        this.$swal.fire("Maximo 4 archivos por noticia", "", "info");
      } else {
        if (res <= 50) {
          this.noticia.archivos.push(event.target.files[0]);
        } else {
          this.$swal.fire("Capo foto muy pesada , proba otra", "", "info");
        }
      }
    },
    traerNoticias() {
      let config = {
        headers: {
          "Content-Type": "application/json",
          token: Global.token,
        },
      };
      axios.get(Global.url + "noticia", config).then((res) => {
        if (res.status == 200) {
          this.todasNoticias = res.data;
        }
      });
    },

    descargarPDF(label) {
      console.log(label);
      let url = Global.url + "traerArchivo?archivo=" + label;
      axios
          .get(url, {
            responseType: "blob",
            headers: {
              "Content-Type": "multipart/form-data",
              token: Global.token,
            },
          })
          .then((response) => {
            const blob = new Blob([response.data], {type: "application/pdf"});
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = this.simplificarNombre(label);
            link.click();
            URL.revokeObjectURL(link.href);
          })
          .catch(console.error);
    },
    simplificarNombre(nombreArchivo) {
      return nombreArchivo.replace(/^([\d_^)]+)/, "");
    },

    borrarNoticia(noticia) {
      axios
          .delete(Global.url + "noticia", {
            headers: {
              "Content-Type": "application/json",
              token: Global.token,
            },
            data: {
              id: noticia.id,
              idUsuario: noticia.idUsuario,
            },
          })
          .then((response) => {
            if (response.status == 200) {
              this.$swal.fire("Noticia Eliminada", "success");

              this.traerNoticias();
            }
          })
          .catch(() => {
            this.$swal.fire({
              icon: "error",
              title: "ERROR",
              text: "Algo salio mal",
            });
          });
    },
    publicarNoticia() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          token: Global.token,
        },
      };

      let formData = new FormData();

      formData.append("idUsuario", this.usuario.username);
      formData.append("titulo", this.noticia.titulo);
      formData.append("mensaje", this.noticia.mensaje);
      if (this.imgEncabezado.nombre) {
        formData.append("nombreEncabezado", this.imgEncabezado.nombre);
        formData.append("imagenEncabezado", this.imgEncabezado.img);
      }

      for (let archivo of this.noticia.archivos) {
        formData.append("archivos[]", archivo);
      }
      for (let archivo of this.noticia.archivos) {
        formData.append("nombresArchivo[]", archivo.name);
      }
      axios
          .post(Global.url + "noticia", formData, config)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Noticia publicada",
              });
            }
          })
          .catch(() => {
            this.$swal.fire({
              icon: "error",
              title: "ERROR",
              text: "Algo salio mal",
            });
          });
    },
  },
};
</script>