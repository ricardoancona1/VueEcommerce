<template>
  <div :class="[openModal ? 'is-active' : '', 'modal']">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modalTitle }}</p>
        <button
          class="delete"
          aria-label="close"
          @click="closeModal(false)"
        ></button>
      </header>
      <section class="modal-card-body">
        <div v-if="!isCheckoutSection">
          <div class="box" v-for="product in productos" :key="product.id">
            <button
              class="is-pulled-right button is-info is-inverted"
              @click="removeFromCart(product.id)"
            >
              {{ removeLabel }}
            </button>
            <p>
              {{ product.nombre }}
              {{
                product.quantity > 0 ? ` - Quantity: ${product.quantity}` : ""
              }}
            </p>
            <p>{{ product.precio }}</p>
          </div>
          <div v-if="productos.length === 0">
            <p>{{ cartEmptyLabel }}</p>
          </div>
        </div>
        <div v-if="isCheckoutSection">
          <h1>Ya casi...</h1>
          <p>
            Se te envió un correo con instrucciones para completar tu pedido!
          </p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <div v-for="product in productos" :key="product.id">
          <button
            v-show="productos.length > 0 && !isCheckoutSection"
            class="button is-info"
            @click="onNextBtn(product.id)"
          >
            {{ buyLabel }}
          </button>
        </div>
        <button
          v-if="isCheckoutSection"
          class="button is-info"
          @click="closeModal(true)"
        >
          {{ closeLabel }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "checkout",

  data() {
    return {
      modalTitle: "Tu Carrito",
      removeLabel: "Remover del carrito",
      cartEmptyLabel: "Tu carrito esta vacío",
      closeLabel: "Cerrar",
      isCheckoutSection: false,
      usuarioID: 1,
      ids: []
    };
  },

  computed: {
    products() {
      return this.$store.getters.productsAdded;
    },
    productos() {
      let carrito = this.$store.getters.carrito;
      return carrito;
    },
    openModal() {
      if (this.$store.getters.isCheckoutModalOpen) {
        return true;
      } else {
        return false;
      }
    },
    buyLabel() {
      let totalProducts = this.productos.length,
        productsAdded = this.$store.getters.carrito,
        pricesArray = [],
        productLabel = "",
        finalPrice = "",
        quantity = 1;

      productsAdded.forEach(product => {
        if (product.quantity >= 1) {
          quantity = product.quantity;
        }

        pricesArray.push(product.precio); // get the price of every product added and multiply quantity
        //console.log("array de precios",pricesArray)
      });

      finalPrice = pricesArray.reduce((a, b) => a + b, 0); // sum the prices
      if (totalProducts > 1) {
        // set plural or singular
        productLabel = "productos";
      } else {
        productLabel = "producto";
      }
      return `Comprar ${totalProducts} ${productLabel} por $ ${finalPrice} MXN`;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    }
  },

  methods: {
    comprar(id) {
      for(let i =0;i<this.productos.length;i++){
        
        this.ids[i]=this.productos[i].id
        console.log(this.ids[i])
      }
      axios

    
        .post("http://0.0.0.0:3000/v1/ventas", {

          usuarioID: 1,
          productoID:this.ids
        })
        .then(response => {});
    },
    closeModal(reloadPage) {
      this.$store.commit("showCheckoutModal", false);

      if (reloadPage) {
        window.location.reload();
      }
    },
    removeFromCart(id) {
      let data = {
        id: id,
        status: false
      };
      this.$store.commit("removeFromCart", id);
      this.$store.commit("setAddedBtn", data);
    },
    onNextBtn(id) {
      if (this.isUserLoggedIn) {
        this.isCheckoutSection = true;
        this.comprar(id);
      } else {
        this.$store.commit("showCheckoutModal", false);
        this.$store.commit("showLoginModal", true);
      }
    },
    onPrevBtn() {
      this.isCheckoutSection = false;
    }
  }
};
</script>
