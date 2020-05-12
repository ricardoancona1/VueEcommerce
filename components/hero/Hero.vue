<template> <!--HTML5 -->
<div>
  <tabs>
    <tab name="Hogar" :selected="true">

    </tab>
    <tab name="Belleza">
 
    </tab>
    <tab name="Nuestros Productos">
   
    </tab>
    <tab name="Accesorios">

       </tab>
    <tab name="Quiénes somos">

       </tab>
    <tab name="Contáctanos">

    </tab>
  </tabs>
  
<img v-bind:src="img" alt="">
</div>
</template>

<script>
import tab from '@/components/others/tab.vue'
import tabs from '@/components/others/tabs.vue'
export default {
  components:{
tab,
tabs

  },
  data(){

  return{
   img: 'https://www.lego.com/cdn/cs/set/assets/blt6a73e8c21a7f6ee9/01-1508-Vehicles-Homepage--200511--Hero-Standard-Large-KeyVisual.jpg?fit=crop&format=jpg&quality=80&auto=webp&width=1600&height=500&dpr=1'
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