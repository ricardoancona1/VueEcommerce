<template> <!--HTML5 -->
<div>
  <tabs>
    <tab name="Hogar" :selected="true">

    </tab>
    <tab name="Belleza">
 
    </tab>
    <tab name="Nuestros Productos">
   
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
   img :'https://www.marykay.com.mx/-/media/images/mk/south-america/mexico/esuite/tips-y-tendencias/lo-nuevo/2020/03/lanzamientos/festival-aromas/02-large-hero-temporada-de-aromas.jpg?h=521&w=1418&la=es-MX&hash=108A94D155157D9088736417701F45B55DCE75AE'
  }
}
} //JavaScript
</script>

<style lang="scss" scoped>
    .hero {
      background: rgb(81, 186, 252);

    }
    h1, h2 {
      color: black;
      
    }
</style>