<template>
  <div style="background-color:whitesmoke;height:2000px;margin-top:-70px">
 
    <vue-headful :title="title" />
    <br />
    <center>
        <br><br><br>
        
          <img
            width="300px"
            src="../assets/images/unknow_page.png"
            alt=""
          />
          <br>
             <h1 style="font-size:40px;margin-top:30px">ERROR 404</h1>
      
        
     

      
    </center>
  </div>
</template>
<script>
import vueHeadful from "vue-headful";
export default {
  name: "HomeComponent",
  components: {
    vueHeadful,
  },
  data() {
    return {
      title: "Error 404",
    };
  },
};
</script>