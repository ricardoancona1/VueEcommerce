<template>
  <div class="section">
  
    <div class="columns is-centered is-multiline">
      <div class="card column is-one-quarter" v-for="product in productsInWishlist" :key="product.id">
        <VmProductsList :product="product"></VmProductsList>
      </div>
 
    </div>
  </div>
</template>

<script>
import VmProductsList from '@/components/Products';
import { getByTitle } from '@/assets/filters';

export default {
	name: 'user-wishlist',

	data () {
    return {
   
    }
  },

  components: { VmProductsList },

  computed: {

    
  },

  methods: {
    getProductByTitle () {
      let listOfProducts = this.productos,
          titleSearched = this.$store.state.userInfo.productTitleSearched;
          console.log('this is a title searched',titleSearched)
      
      return this.productsFiltered = getByTitle(listOfProducts, titleSearched);
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    margin: 10px;
  }
</style>


