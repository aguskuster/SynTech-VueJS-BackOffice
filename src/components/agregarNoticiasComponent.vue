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
              <div class="archivo">hoja de calculo</div>
              <div class="archivo">hoja de calculo</div>
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

        <div class="d-flex justify-content-center p-4">
          <div class="contenedor_principal_noticias">
            <div class="mt-2 contenedor_secundario_noticias">
              <div class="contenedor_noticia">
                <div class="noticia_seccion_izquierda">
                  <img
                    src="https://media.discordapp.net/attachments/480881732724195328/1009536092212580392/unknown.png"
                    style="width: 60px; height: 60px; border-radius: 50%"
                    alt=""
                  />
                </div>
                <div class="noticia_seccion_derecha">
                  <h4>Los pelados son cada vez mas calvos</h4>
                  <br />
                  <p>
                    Chino: o pelado para decir niño en Colombia, que en
                    Argentina es un chico y puede ser un pibe, un chavo en
                    México, un gurí o botija en Uruguay, un mitaí en Paraguay,
                    un chamo en Venezuela, un patojo en Guatemala y un crío en
                    España
                  </p>
                </div>
              </div>

              <div class="contenedor_noticia">
                <div class="noticia_seccion_izquierda">
                  <img
                    src="https://media.discordapp.net/attachments/480881732724195328/1009536092212580392/unknown.png"
                    style="width: 60px; height: 60px; border-radius: 50%"
                    alt=""
                  />
                </div>
                <div class="noticia_seccion_derecha">
                  <h4>Los pelados son cada vez mas calvos</h4>
                  <br />
                  <p>
                    Chino: o pelado para decir niño en Colombia, que en
                    Argentina es un chico y puede ser un pibe, un chavo en
                    México, un gurí o botija en Uruguay, un mitaí en Paraguay,
                    un chamo en Venezuela, un patojo en Guatemala y un crío en
                    España
                  </p>
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
      usuario: JSON.parse(window.atob(localStorage.getItem("auth_token"))),
      noticia: {
        titulo: "",
        mensaje: "",
        archivos: [],
      },
    };
  },
  methods: {
    getFile(event) {
      let size = event.target.files[0].size;
      let res = size * 0.000001;
      if (res <= 50) {
        this.noticia.archivos.push(event.target.files[0]);
      } else {
        this.$swal.fire("Capo foto muy pesada , proba otra", "", "info");
      }
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
            console.log(res.data)
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