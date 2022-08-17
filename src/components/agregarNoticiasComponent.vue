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

            <div style="display: flex; flex-wrap: wrap; justify-content:space-around;">
              <div style="background-color: blue; padding: 10px; color: white;margin-bottom:5px">
                hoja de calculo
              </div>
              <div style="background-color: blue; padding: 10px; color: white;margin-bottom:5px">
                hoja de calculo
              </div>
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

        <div class="d-flex justify-content-center mt-4"></div>
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