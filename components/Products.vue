<template>
  <div>
    <div class="card-image">
      <figure class="image is-4by3">
        <img v-bind:src="product.imgUrl" alt="Placeholder image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ product.nombre }}</p>
        </div>
      </div>
      <div class="content is-clearfix">
        <p>{{ product.descripcion }}</p>
        <div class="is-pulled-left">
          <i v-if="product.ratings === 1" class="fa fa-star"></i>
          <i v-if="product.ratings === 2" class="fa fa-star"></i>
          <i v-if="product.ratings === 2" class="fa fa-star"></i>
          <i v-if="product.ratings === 3" class="fa fa-star"></i>
          <i v-if="product.ratings === 3" class="fa fa-star"></i>
          <i v-if="product.ratings === 3" class="fa fa-star"></i>
          <i v-if="product.ratings === 4" class="fa fa-star"></i>
          <i v-if="product.ratings === 4" class="fa fa-star"></i>
          <i v-if="product.ratings === 4" class="fa fa-star"></i>
          <i v-if="product.ratings === 4" class="fa fa-star"></i>
          <i v-if="product.ratings === 5" class="fa fa-star"></i>
          <i v-if="product.ratings === 5" class="fa fa-star"></i>
          <i v-if="product.ratings === 5" class="fa fa-star"></i>
          <i v-if="product.ratings === 5" class="fa fa-star"></i>
          <i v-if="product.ratings === 5" class="fa fa-star"></i>
        </div>
        <p class="is-pulled-right">
          <span class="title is-4"
            ><strong> $ {{ product.precio }} MXN</strong></span
          >
        </p>
      </div>
      <div class="card-footer btn-actions">
        <div class="card-footer-item field is-grouped">
          <div class="buttons">
            <button
              class="button is-warning"
              v-if="!product.addedToCart"
              @click="
                aniadirAlCarrito(product.nombre, product.precio, product.uuid,product.id)
              "
            >
              {{ addToCartLabel }}
            </button>
            <button
              class="button is-text"
              v-if="product.addedToCart"
              @click="removeFromCart(product.id, false)"
            >
              {{ removeFromCartLabel }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <nuxt-link
      :product="product"
      class="details"
      :to="{
        name: 'product_detail-id',
        params: {
          uuid: product.uuid,
          id: product.id
        }
      }"
    >
    </nuxt-link>
  </div>
</template>

<script>
import detalles from "../pages/product_detail/_id";
export default {
  name: "products",
  props: ["product"],
  data() {
    return {
      addToCartLabel: "Añadir al carrito",
      viewDetailsLabel: "Detalles",
      removeFromCartLabel: "Remover del carrito",
      selected: 1,
      quantityArray: []
    };
  },
  components: { detalles },
  mounted() {
    for (let i = 1; i <= 20; i++) {
      this.quantityArray.push(i);
    }
    // if (this.$props.product.quantity > 1) {
    //  this.selected = this.$props.product.quantity;
    //}
  },
  computed: {
    isUserLogged() {
      return this.$store.getters.isUserLoggedIn;
    }
  },
  methods: {
    aniadirAlCarrito(nombre, precio, id,id1) {
      let data = {
        id: id1,
        status: true
      };
      let info = {
        id: id,
        nombre: nombre,
        precio: precio,
        addedToCart: true
      };
      this.$store.commit("AniadirAlCarrito", info);
      this.$store.commit("setAddedBtn1", data);
    },

    removeFromCart(id) {
      let data = {
        id: id,
        status: false
      };
      this.$store.commit("removeFromCart", id);
      this.$store.commit("setAddedBtn1", data);
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
    },
    onSelectQuantity(id) {
      let data = {
        id: id,
        quantity: this.selected
      };
      this.$store.commit("quantity", data);
    }
  }
};
</script>

<style lang="scss" scoped>
.details {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  &:hover {
    border: 1px solid #51bafc;
  }
}
.button,
.select {
  z-index: 2;
}
.select {
  position: absolute;
  right: 15px;
  bottom: 35px;
}
.card-content {
  padding: 0;
}
.buttons {
  margin: 0;
}
</style>
