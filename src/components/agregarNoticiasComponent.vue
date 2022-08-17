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
              name="titulo"
              class="form-control mb-3"
              required
            />
            <label for="mensaje" class="form-label"> Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              class="form-control mb-5"
              rows="4"
              cols="50"
            ></textarea>
            <input class="form-control mb-3" type="file" id="formFile" />
            <hr />

            <div class="contenedor_archivos">
              <div class="archivo">hoja de calculo</div>
              <div class="archivo">hoja de calculo</div>
            </div>
          </form>
        </div>

        <div style="position: absolute; right: 10px; bottom: 10px">
          <div>
            <button class="btn btn-primary">Publicar Noticia</button>
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
export default {
  name: "NoticiasComponent",
  components: {
    vueHeadful,
  },
  data() {
    return {
      title: "Noticias",
    };
  },
};
</script>