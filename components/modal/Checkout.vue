<template>
  <div :class="[openModal ? 'is-active' : '', 'modal']">
    <div class="modal-background"></div>
    <div class="modal-card" content="width = device-width, initial-scale = 1">
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
            <p>${{ product.precio }} MXN</p>
          </div>
          <div v-if="productos.length === 0">
            <p>{{ cartEmptyLabel }}</p>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          v-show="productos.length > 0 && !isCheckoutSection"
          class="button is-info"
          @click="onNextBtn(productos)"
        >
          {{ buyLabel }}
        </button>

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
import swal from "sweetalert";
import oneProduct from "../../pages/product_detail/_id";
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
      ids: [],
      statusCode: ""
    };
  },

  computed: {
   // products() {
    //  return this.$store.getters.productsAdded;
    //},
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
      for (let i = 0; i < this.productos.length; i++) {
        this.ids[i] = this.productos[i].id;
      }
      axios
        .post(
          "http://192.168.1.77:3000/v1/ventas",

          {
            productoID: this.ids
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: this.$store.getters.getToken
            }
          }
        )
        .then(response => {
          this.ids=[]
            this.$store.commit("emptyCart");
          swal(
            "Se te envió un correo con instrucciones para confirmar tu compra",
            "Gracias por utilizar COMPRASALLYNAT",
            "success"
          ).then(value => {
            this.$store.commit("showCheckoutModal", false);
          });
        })
        .catch(err => {
            this.$store.commit("emptyCart");
          this.ids=[]
          console.log(err);
          if (err.response.status == 401) {
            swal("Su sesión expiró", "lo sentimos", "error").then(value => {
              this.$store.commit("showCheckoutModal", false);
            });
            this.cerrarSesion();
          }
          if (err.response.status == 500) {
            swal(
              "Ocurrió un error al procesar su solicitud",
              "intentelo de nuevo más tarde",
              "error"
            ).then(value => {
              this.$store.commit("showCheckoutModal", false);
            });
          }
          if (err.response.status == 409) {
            swal(
              "Debes completar el registro",
              "Puedes completar el registro en Tu Perfil",
              "warning"
            ).then(value => {
              this.$store.commit("showCheckoutModal", false);
            });
          }
        });
      this.$store.commit("emptyCart");
    },
    closeModal(reloadPage) {
      this.$store.commit("showCheckoutModal", false);
    },
    removeFromCart(id) {
      let data = {
        id: id,
        status: false
      };
      this.$store.commit("removeFromCart", id);
      this.$store.commit("setAddedBtn1", data);
      this.$store.commit("setBotonPrueba",false)
    },
    onNextBtn(id) {
      if (this.isUserLoggedIn) {
        this.isCheckoutSection = true;
        this.$store.commit("showCheckoutModal", false);
        this.comprar(id);
        this.isCheckoutSection = false;
      } else {
        // this.$store.commit("showCheckoutModal", false);
        // this.$store.commit("showLoginModal", true);
        swal(
          "Sesión no iniciada",
          "Debes registrarte o iniciar sesión para continuar",
          "warning"
        );
      }
    },
    onPrevBtn() {
      this.isCheckoutSection = false;
    },
    cerrarSesion() {
      this.$store.commit("isUserLoggedIn", false);
      this.$store.commit("isUserSignedUp", false);
      this.$store.commit("removeProductsFromFavourite");

      // redirect to homepage
      this.$router.push({ name: "index" });
    }
  }
};
</script>
