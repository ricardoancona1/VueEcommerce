<template>
  <div>
    <navbar></navbar>
    <div class="section">
      <div class="card is-clearfix columns">
        <figure class="card-image is-480x480 column is-one-thirds">
          <img v-bind:src="producto.imgUrl" alt="Placeholder image" />
        </figure>
        <div class="card-content column is-two-thirds">
          <div class="card-content__title">
            <h2 class="title is-4">
              {{ producto.nombre }}
            </h2>
          </div>
          <div class="card-content__text">
            <p>
              {{ producto.descripcion }}
            </p>
            <p>
              <strong> Marca: {{ producto.marca }} </strong>
            </p>
            <h2>
              <strong> Disponibles: {{ producto.disponibles }} </strong>
            </h2>
          </div>

          <div class="card-content__reviews">
            <div class="is-pulled-left"></div>
          </div>
          <div class="card-content__price is-pulled-left">
            <span class="title is-3"
              ><strong> ${{ producto.precio }} MXN</strong></span
            >
          </div>
          <div class="card-content__btn is-pulled-right">
            <button
              class="button is-warning"
              v-if="!isAddedToCarito && producto.disponibles > 0"
              @click="aniadirAlCarrito(producto.nombre, producto.precio)"
            >
              Añadir al carrito
            </button>
            <button
              class="button is-text"
              v-if="isAddedToCarito"
              @click="removeFromCart()"
            >
              {{ removeFromCartLabel }}
            </button>
            <div class="tags are-medium">
              <span
                v-if="producto.disponibles <= 0"
                class="tag is-light is-active"
                >Este producto no está disponible</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import navbar from "../../components/others/navbar";
import { withVersioning, VersioningStrategy } from "axios-api-versioning";
let uuid;
export default {
  name: "product_detail-id",

  validate({ params }) {
    //console.log(params.uuid)

    return /^\d+$/.test(params.id);
  },
  components: { navbar },
  data() {
    return {
      addToCartLabel: "Añadir al carrito",
      removeFromCartLabel: "Remover del carrito",
      product: {},
      selected: 1,
      quantityArray: [],
      productos: [],
      producto: {},
      carrito: [],
      agregadoAlCarrito: false,
      id: this.$route.params.id,
      uuid: ""
    };
  },

  mounted() {
    let id;
    id = this.$route.params.id;

    axios
      .get(`http://someServerUrl:3000/v1/productById/${id}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        this.producto = response.data;
        this.uuid = response.data.uuid;
        for (
          let index = 0;
          index < this.$store.getters.carrito.length;
          index++
        ) {
          if (this.$store.getters.carrito[index].id == response.data.uuid) {
           // this.agregadoAlCarrito = true;
           return true
          } else {
            return false
          }
        }
      });

    for (let i = 1; i <= 20; i++) {
      this.quantityArray.push(i);
    }
  },

  computed: {
    isAddedToCarito:function() {
      let carrito = [];
      carrito = this.$store.getters.carrito;
      console.log("prueba carrito", carrito);
       this.agregadoAlCarrito = false;
      this.$store.getters.carrito.forEach(el => {
        if (el.id == this.uuid) {
          this.agregadoAlCarrito = true;
        }
      });
      if(this.agregadoAlCarrito==true){
        return true
      }else{
        return false
      }
   }
  },

  methods: {
    aniadirAlCarrito(nombre, precio) {
      this.id = this.producto.uuid;

      let producto = this.$store.state.productos;
      // this.agregadoAlCarrito=producto[0].find(product => product.uuid == this.id);
      console.log(producto);
      this.agregadoAlCarrito = this.producto;

      let data = {
        id: this.id,
        status: true
      };
      let info = {
        id: this.id,
        nombre: nombre,
        precio: precio,
        addedToCart: true
      };

      this.$store.commit("AniadirAlCarrito", info);
      this.$store.commit("setAddedBtn1", data);
    },

    removeFromCart() {
      this.agregadoAlCarrito = false;
      let id = this.producto.uuid;
      let data = {
        id: id,
        status: true
      };
      this.$store.commit("removeFromCart", id);
      this.$store.commit("setAddedBtn1", data);
    },
    getAddedToCart(id) {},
    onSelectQuantity(id) {
      //para agregar varios productos a la vez
      let data = {
        id: id
        //  quantity: this.selected
      };
      //  this.$store.commit('quantity', data);
    },
    saveToFavorite(id) {
      let isUserLogged = this.$store.state.userInfo.isLoggedIn;

      if (isUserLogged) {
        this.$store.commit("addToFavourite", id);
      } else {
        this.$store.commit("showLoginModal", true);
      }
    },
    removeFromFavourite(id) {
      this.$store.commit("removeFromFavourite", id);
    }
  }
};
</script>

<style lang="scss" scoped>
.card-content {
  padding: 15px 10px 15px 0;

  &__text {
    margin: 15px 0;
  }
  &__reviews {
    display: inline-block;
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
