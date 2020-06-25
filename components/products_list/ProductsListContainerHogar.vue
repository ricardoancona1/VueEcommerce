<template>
  <div class="columns is-centered is-multiline">
    <div class="card column is-one-quarter" v-for="product in productos" :key="product.id">
      <VmProducts :product="product"   ></VmProducts>
    </div>
    <div class="section" v-if="products.length === 0">
      <p>{{ noProductLabel }}</p>
    </div>
  </div>
</template>

<script>
import VmProducts from '../Products';
import { getByTitle } from '@/assets/filters';
import axios from "axios";
import { withVersioning, VersioningStrategy } from "axios-api-versioning";
export default {
  name: 'productsList',
  
  components: { VmProducts },
  
  data () {
    return {
      id: '',
      noProductLabel: 'No product found',
      productsFiltered: [],
      productos:[]
    };
  },
  mounted(){
    axios
      .get("http://127.0.0.1:3000/v1/categoria/Hogar", {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        this.productos = response.data.productos;
        
      });


  },
  computed: {
    products () {
      if (this.$store.state.userInfo.hasSearched) {
        return this.getProductByTitle();
      } else {
        return this.productos;
      }
    }
  },
  methods: {
    getProductByTitle () {
      let listOfProducts = this.$store.state.products,
          titleSearched = this.$store.state.userInfo.productTitleSearched;
      
      return this.productsFiltered = getByTitle(listOfProducts, titleSearched);
    }
  }
};
</script>

<style lang="scss" scoped>
  .card {
    margin: 10px;
  }
</style>