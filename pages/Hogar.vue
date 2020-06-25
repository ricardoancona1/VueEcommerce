<template>
<div>
  <navbar></navbar>
  <img v-bind:src="img" alt="">
  <container></container>
</div>
</template>

<script>
import navbar from '../components/others/navbar'

import container from '../components/products_list/ProductsListContainerHogar'
export default {
components:{
  navbar,
  container,

},
data(){
  return{
img: 'https://www.lego.com/cdn/cs/set/assets/blt6a73e8c21a7f6ee9/01-1508-Vehicles-Homepage--200511--Hero-Standard-Large-KeyVisual.jpg?fit=crop&format=jpg&quality=80&auto=webp&width=1600&height=500&dpr=1'

  }
}
}
</script>
<style>

</style>