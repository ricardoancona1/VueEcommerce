<template>
<div>
  <navbar></navbar>
  <img v-bind:src="img" alt="No se encontro la imagen" class="column is-12 shadows">
  <br><br>
  <container></container>
</div>
</template>

<script>
import navbar from '../components/others/navbar'

import container from '../components/products_list/ProductsListContainerNP'
export default {
components:{
  navbar,
  container,

},
data(){
  return{
img: 'http://someServerUrl:3000/v1/settings/image'

  }
}
}
</script>
<style>
.shadows{
        margin-right: 14px;
  display: block;
  box-shadow: 3px 3px 1px #ccc;
  -webkit-box-shadow: 3px 3px 1px #ccc;
  -moz-box-shadow: 3px 3px 1px #ccc;
    }
</style>