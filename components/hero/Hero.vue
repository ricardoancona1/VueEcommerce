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
   img: 'https://cdn-ssl.s7.disneystore.com/is/content/ShopDisney/mb_toys-price-point_20200508'
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