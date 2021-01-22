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
      .get("http://someServerUrl:3000/v1/categoria/Juguetes", {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        if (this.$store.getters.carrito.length == 0) {
          for (let i = 0; i < response.data.listProducts.length; i++) {
            Object.assign(response.data.listProducts[i], {
              addedToCart: false
            });
          }
        } else {
          for (
            let index = 0;
            index < this.$store.getters.carrito.length;
            index++
          ) {
            for (let i = 0; i < response.data.listProducts.length; i++) {
              if (
                this.$store.getters.carrito[index].id ==
                response.data.listProducts[i].uuid
              ) {
                Object.assign(response.data.listProducts[i], {
                  addedToCart: true
                });
                response.data.listProducts[i].addedToCart = true;
          
              } else {
                if (!response.data.listProducts[i].addedToCart == true) {
                  Object.assign(response.data.listProducts[i], {
                    addedToCart: false
                  });
                }
              }
            }
          }
        }

        let info = response.data.listProducts;

        this.$store.commit("productos", info);
        this.productosIniciales = this.$store.commit(
          "productosIniciales",
          info
        );
        this.productos = this.$store.state.productos[0];
        
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
      let listOfProducts = this.$store.state.productos[0],
          titleSearched = this.$store.state.userInfo.productTitleSearched;
      
      return this.productos = getByTitle(listOfProducts, titleSearched);
    }
  }
};
</script>

<style lang="scss" scoped>
  .card {
    margin: 10px;
  }
</style>