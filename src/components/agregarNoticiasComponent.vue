<template>
  <div>
    <div class="contenedor_menu">
      <vue-headful :title="title" />
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
            <hr />

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

      <div
        class="contenedorDerechoPersona"
        style="width: 65% !important; height: 49rem; position: relative"
      >
        <h4>Listado de Noticias</h4>
        <div class="p-4">
          <div>
            <label for="fecha" class="form-label">Filtrar por fecha :</label>
            <input type="date" name="fecha" id="fecha" />
          </div>
          <div class="contenedor_principal_noticias">
            <div class="mt-2 contenedor_secundario_noticias scroller_noticias">
              <div
                class="contenedor_noticia"
                v-for="noticia in todasNoticias"
                :key="noticia.data.id"
              >
                <button
                  class="btn btn-info"
                  @click="borrarNoticia(noticia.data)"
                  v-if="usuario.username == noticia.data.idUsuario"
                >
                  Borrar
                </button>
                <div class="noticia_seccion_izquierda">
                  <img
                    :src="returnIMGB64(noticia.data.profile_picture)"
                    style="width: 60px; height: 60px; border-radius: 50%"
                  />
                </div>
                <div class="noticia_seccion_derecha">
                  <h4>{{ noticia.data.titulo }}</h4>
                  <br />
                  <p v-for="img in noticia.imagenes" :key="img.id">
                    <center>
                      <img :src="returnIMGB64(img)" alt="" width="100px" />
                    </center>
                    {{ noticia.data.mensaje }}
                  </p>
                  <p>
                    {{ noticia.data.mensaje }}
                  </p>
                  <div class="contenedor_archivos">
                    <div
                      class="archivo"
                      v-for="archivo in noticia.archivos"
                      :key="archivo.id"
                    >
                      <span
                        style="cursor: pointer"
                        @click="descargarPDF(archivo)"
                      >
                        {{ archivo }}</span
                      >
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
    returnIMGB64(img) {
      return "data:image/png;base64," + img;
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