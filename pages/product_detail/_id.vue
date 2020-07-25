<template>
  <div class="section">
    <div class="card is-clearfix columns">
      <figure class="card-image is-480x480 column is-one-thirds">
        <img v-bind:src="producto.imgUrl" alt="Placeholder image" />
      </figure>
      <div class="card-content column is-two-thirds">
        <div class="card-content__title">
          <h2 class="title is-4">
            {{ producto.nombre }}
            <!--button class="button is-small" :title="removeFromFavouriteLabel" v-show="product.isFavourite" @click="removeFromFavourite(product.id)">
                <span class="icon is-small">
                  <i class="fa fa-heart"></i>
                </span>
              </button-->
            <!--button class="button is-small" :title="addToFavouriteLabel" v-show="!product.isFavourite" @click="saveToFavorite(product.id)">
                <span class="icon is-small">
                  <i class="fa fa-heart-o"></i>
                </span>
              </button-->
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
        <!--div class="card-content__ratings" v-if="product.rating === 1">
            <i class="fa fa-star"></i>
          </div>
          <div class="card-content__ratings" v-else-if="product.rating === 2">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
          <div class="card-content__ratings" v-else-if="product.rating === 3">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
          <div class="card-content__ratings" v-else-if="product.rating === 4">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
          <div class="card-content__ratings" v-else-if="product.rating === 5">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div-->
        <div class="card-content__reviews">
          <div class="is-pulled-left"></div>
          <!--div class="select is-rounded is-small is-pulled-right">
            <!--select @change="onSelectQuantity(product.id)" v-model="selected">
                <option v-for="quantity in quantityArray" :value="quantity">{{ quantity }}</option>
              </select>
          </div-->
        </div>
        <div class="card-content__price is-pulled-left">
          <span class="title is-3"
            ><strong> ${{ producto.precio }} MXN</strong></span
          >
        </div>
        <div class="card-content__btn is-pulled-right">
          <!--button
            class="button is-warning"
            v-if="!isAddedBtn"
            @click="addToCart(product.id)"
          >
            {{ addToCartLabel }}
          </button-->
          <button
            class="button is-warning"
            v-if="!agregadoAlCarrito"
            @click="
              aniadirAlCarrito(producto.nombre, producto.precio)
            "
          >
            Añadir al carrito
          </button>
          <button
            class="button is-text"
            v-if="agregadoAlCarrito"
            @click="removeFromCart(producto.id)"
          >
            {{ removeFromCartLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { withVersioning, VersioningStrategy } from "axios-api-versioning";
let uuid;
export default {
  name: "product_detail-id",

  validate({ params }) {
    //console.log(params.uuid)

    return /^\d+$/.test(params.id);
  },

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
      id:this.$route.params.id
    };
  },

  mounted() {
    let uuid;
    uuid = this.$route.params.id;
    
    console.log("route params",this.$route.params)

    axios
      .get(`http://127.0.0.1:3000/v1/product/${uuid}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        this.producto = response.data;
      });

    this.product = this.$store.getters.getProductById(this.$route.params.id);
    //this.agregadoAlCarrito=product.addedToCart
    //  this.selected = this.product.quantity;

    for (let i = 1; i <= 20; i++) {
      this.quantityArray.push(i);
    }
  },

  computed: {
    isAddedBtn() {
      return this.product.isAddedBtn;
    }
  },

  methods: {
    aniadirAlCarrito(nombre, precio) {
      this.id=this.$route.params.uuid
      console.log("id: ",this.id)
      let producto=this.$store.state.productos
      this.agregadoAlCarrito=producto[0].find(product => product.uuid == this.id);
      console.log( "aqui",this.agregadoAlCarrito.addedToCart)
      let data = {
        id: this.id,
        status: true
      };
      let info = {
        id:this.id,
        nombre: nombre,
        precio: precio,
        addedToCart:true
      };
      this.$store.commit("AniadirAlCarrito", info);
       this.$store.commit("setAddedBtn1", data);
    },
    addToCart(id) {
      let data = {
        id: id,
        status: true
      };
      this.$store.commit("addToCart", id);
      this.$store.commit("setAddedBtn1", data);
    },
    removeFromCart(id) {
    this.$store.commit("removeFromCart", id);
    this.$store.commit("setAddedBtn1", data);
    },
    getAddedToCart(id){

    },
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
