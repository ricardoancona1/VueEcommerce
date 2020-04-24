<template>
<div>
<img v-bind:src="img" alt="">
</div>
</template>

<script>

export default {
  data(){

  return{
   img :'https://www.marykay.com.mx/-/media/images/mk/south-america/mexico/esuite/tips-y-tendencias/lo-nuevo/2020/03/lanzamientos/festival-aromas/02-large-hero-temporada-de-aromas.jpg?h=521&w=1418&la=es-MX&hash=108A94D155157D9088736417701F45B55DCE75AE'
  }
}
}
</script>

<style lang="scss" scoped>
    .hero {
      background: rgb(81, 186, 252);
    }
    h1, h2 {
      color: #fff;
    }
</style>