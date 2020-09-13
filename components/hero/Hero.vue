<template> <!--HTML5 -->
<div>
 <navbar ></navbar>
  <img v-bind:src="img" alt="No se encontro la imagen" class="column is-12 shadows">
  <br>
  <br>
</div>

</template>

<script>
import navbar from '../others/navbar'
export default {
  components:{
    navbar
  },
  data(){
  return{
   img:'http://192.168.1.77:3000/v1/settings/image'
  }
},
methods:{


}
} //JavaScript
</script>

<style lang="scss" scoped>
    .hero {
      background: rgb(4,72,135);

    }
    h1, h2 {
      color: black;
      
    }
    .shadows{
        margin-right: 14px;
  display: block;
  box-shadow: 3px 3px 1px #ccc;
  -webkit-box-shadow: 3px 3px 1px #ccc;
  -moz-box-shadow: 3px 3px 1px #ccc;
    }
</style>