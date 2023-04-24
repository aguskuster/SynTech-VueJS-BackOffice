<template>
  <div>
    <div class="contenedor_menu">
      <vue-headful :title="title" />
      <h2>Noticias</h2>
    </div>
    <center v-if="loading" style="margin-top: 3rem; font-size: 230px">
      <div
        class="spinner-border text-primary"
        role="status"
        style="color: #13111e !important"
      ></div>
    </center>
    <div v-else class="contenedorGeneral" style="justify-content: space-evenly">
      <div
        class="contenedorIzquierdo"
        style="width: 30% !important; height: 49rem; position: relative"
      >
        <h4>Crear Noticia</h4>
        <div class="m-2 p-2">
          <form action="" class="p-4">
            <label for="titulo" class="form-label">
              Titulo de la Noticia <em>*</em></label
            >
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
               accept=".jpg, .png , .jpeg"
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
              accept=".pdf, .doc"
              id="formFile2"
            />
            <hr />

            <div class="contenedor_archivos">
              <div
                class="archivo eplipis"
                v-for="archivo in noticia.archivos"
                :key="archivo.id"
              >
                <img src="/img/file.f66d58b2.svg" alt="My Happy SVG" />
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
   
        <div
          class="p-4"
          style="max-height: 650px; overflow-y: auto"
          v-if="noData"
        >
          <center>
            <p>No se publicaron noticias en la fecha {{ fecha }}</p>
            <p style="text-align: center">
              <a href="" @click="traerNoticias">Borrar flitros</a>
            </p>
          </center>
        </div>
        <div class="p-4" style="max-height: 650px; overflow-y: auto" v-else>
          <div class="contenedor_principal_noticias">
            <div
              class="accordion"
              id="accordionExample"
              v-for="noticia in todasNoticias"
              :key="noticia.data.id"
              style="width: 85%; margin: auto"
            >
              <div class="card" style="padding: 0.5rem 1rem">
                <div class="" id="headingOne">
                  <h2 class="mb-0">
                    <button
                      class="btnCustom btn-block text-left atr"
                      type="button"
                      data-toggle="collapse"
                      :data-target="'#col' + noticia.data.id"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <div
                        style="
                          display: flex;
                          flex-direction: row;
                          position: relative;
                        "
                      >
                        <div>
                          <img
                            :src="returnIMGB64(noticia.data.imagenEncabezado)"
                            alt=""
                            width="100px"
                            height="86px"
                            style="object-fit: cover"
                          />
                        </div>
                        <div
                          style="
                            margin-left: 1rem;
                            display: flex;
                            flex-direction: column;
                          "
                        >
                          <p>{{ noticia.data.titulo }}</p>
                          <small style="margin-top: 24px">
                            Publicado por {{ noticia.data.nombreAutor }}</small
                          >
                        </div>
                        <small
                          style="
                            position: absolute;
                            right: 0;
                            display: flex;
                            flex-direction: column;
                            align-items: end;
                          "
                        >
                          <i
                            class="fas fa-times"
                            style="
                              color: red;
                              font-size: 20px;
                              margin-bottom: 44px;
                            "
                            @click="comprobarOpcionEliminar(noticia.data)"
                          ></i>
                          {{ momentFechaParaHumanos(noticia.data.fecha) }}
                        </small>
                      </div>
                    </button>
                  </h2>
                </div>

                <div
                  :id="'col' + noticia.data.id"
                  class="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div class="card-body" style="padding: 10px">
                    <p>{{ noticia.data.mensaje }}</p>
                    <div v-if="noticia.archivos != ''">
                      <hr />
                      <div style="display: flex">
                        <div
                          class="archivo eplipis"
                          v-for="archivo in noticia.archivos"
                          :key="archivo.id"
                        >
                          <span
                            style="cursor: pointer"
                            @click="descargarPDF(archivo)"
                          >
                            <img
                              src="../assets/images/file.svg"
                              alt="My Happy SVG"
                            />
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
  </div>
</template>
<script>
import vueHeadful from "vue-headful";
import { Global } from "../Global";
import axios from "axios";
import moment from "moment";
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
      fecha: "",
      noticia: {
        titulo: "",
        mensaje: "",
        archivos: [],
      },
      loading: true,
      noData: false,
    };
  },
  mounted() {
    this.traerNoticias();
  },
  methods: {
    comprobarOpcionEliminar(id) {
      this.$swal
        .fire({
          title: "Seguro que quieres eliminar la noticia?",
          showDenyButton: true,
          confirmButtonText: "Eliminar",
          denyButtonText: "Cancelar",
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.borrarNoticia(id);
          }
        });
    },
    momentFechaParaHumanos(fecha) {
      moment.locale("ES");
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
        this.$swal.fire(
          "El archivo que estas intentando subir es muy pesado",
          "",
          "info"
        );
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
          this.$swal.fire(
            "El archivo que estas intentando subir es muy pesado",
            "",
            "info"
          );
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
          this.loading = false;
        }
      });
    },
    filterByDate() {
      let noticias = [];

      for (let noticia of this.todasNoticias) {
        if (
          moment(noticia.data.fecha)
            .format("YYYY-MM-DD")
            .indexOf(this.fecha) !== -1
        ) {
          noticias.push(noticia);
        }
      }

      if (noticias.length == 0) {
        this.noData = true;
      } else {
        this.noData = false;
      }

      this.todasNoticias = noticias;
    },

    descargarPDF(label) {
       
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
          const blob = new Blob([response.data], { type: "application/pdf" });
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
        .delete(Global.url + "noticia/"+noticia.id, {
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
            this.$swal.fire({
            icon: "success",
            text: "Noticia eliminada con exito",
          });

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

      if (this.noticia.titulo == "" || this.noticia.mensaje == "") {
        this.$swal.fire({
          icon: "warning",
          title: "Faltan capos por completar",
        });
        return;
      }

      axios
        .post(Global.url + "noticia", formData, config)
        .then((res) => {
          if (res.status == 200) {
            this.$swal.fire({
              icon: "success",
              title: "Noticia publicada",
            });
            this.traerNoticias();
            this.limpiarCampos();
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
    limpiarCampos() {
      this.noticia.titulo = "";
      this.noticia.mensaje = "";
      this.noticia.archivos = [];
      this.imgEncabezado.img = "";
      this.imgEncabezado.nombre = "";
      document.getElementById("formFile").value = "";
      document.getElementById("formFile2").value = "";
    },
  },
};
</script>