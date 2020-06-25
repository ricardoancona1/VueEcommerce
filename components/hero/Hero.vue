<template> <!--HTML5 -->
<div>
 <navbar></navbar>
 
   <!--div>
  <nuxt-link to="/nuestrosProductos">Nuestros Productos </nuxt-link>
  </div-->
  <img v-bind:src="img" alt="">
  <br>
  <br>
</div>

</template>

<script>
//import tab from '@/components/others/tab.vue'
//import tabs from '@/components/others/tabs.vue'
//import nuestrosProductos from '@/pages/nuestrosProductos.vue'
import navbar from '../others/navbar'
export default {
  components:{
    navbar
//tab,
//tabs,
//nuestrosProductos
  },
  data(){

  return{
   img: 'https://www.lego.com/cdn/cs/set/assets/blt6a73e8c21a7f6ee9/01-1508-Vehicles-Homepage--200511--Hero-Standard-Large-KeyVisual.jpg?fit=crop&format=jpg&quality=80&auto=webp&width=1600&height=500&dpr=1'
  }
},
methods:{
mostrarNuestrosProductos(){
this.$router.push({ name: 'test' });

}

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
</style>