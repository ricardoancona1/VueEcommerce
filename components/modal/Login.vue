<template>
  <div :class="[openModal ? 'is-active' : '', 'modal']">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p v-if="!isUserLoggedIn" class="modal-card-title">{{ modalTitle }}</p>
        <p v-if="isUserLoggedIn" class="modal-card-title">
          {{ modalTitleLoggedIn }}
        </p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <form @submit="checkForm" action="#" method="post">
        <section class="modal-card-body">
          <div v-if="!isUserLoggedIn">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[
                    highlightEmailWithError ? 'input is-danger' : 'input'
                  ]"
                  type="email"
                  :placeholder="emailPlaceholder"
                  name="emailName"
                  v-model="email"
                  @keyup="checkEmailOnKeyUp(email)"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
                <span
                  v-if="highlightEmailWithError !== null"
                  class="icon is-small is-right"
                >
                  <i
                    :class="[
                      highlightEmailWithError
                        ? 'fa fa-exclamation-circle'
                        : 'fa fa-check'
                    ]"
                  ></i>
                </span>
              </p>
              <p v-if="highlightEmailWithError" class="help is-danger">
                {{ emailRequiredLabel }}
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[
                    highlightPasswordWithError ? 'input is-danger' : 'input'
                  ]"
                  type="password"
                  placeholder="Tu contraseña"
                  name="passwordName"
                  v-model="password"
                  @keyup="checkPasswordOnKeyUp(password)"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
                <span
                  v-if="highlightPasswordWithError !== null"
                  class="icon is-small is-right"
                >
                  <i
                    :class="[
                      highlightPasswordWithError
                        ? 'fa fa-exclamation-circle'
                        : 'fa fa-check'
                    ]"
                  ></i>
                </span>
              </p>
              <p v-if="highlightPasswordWithError" class="help is-danger">
                {{ passwordRequiredLabel }}
              </p>
            </div>
          </div>
          <div v-if="isUserLoggedIn" class="level">
            <div class="level-item has-text-centered">
              <div>
                <p class="title">Bienvenido otra vez!</p>
                <p class="heading">Has iniciado sesión</p>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button
            @click="logIn(email, password)"
            v-if="!isUserLoggedIn"
            type="submit"
            class="button is-info"
          >
            {{ primaryBtnLabel }}
          </button>
          <button
            v-if="isUserLoggedIn"
            type="button"
            class="button is-info"
            @click="closeModal"
          >
            {{ btnLoggedInLabel }}
          </button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
import { isValidEmail } from "@/assets/validators";
import axios from "axios";
import swal from "sweetalert";
export default {
  name: "login",

  data() {
    return {
      modalTitle: "Iniciar sesión",
      modalTitleLoggedIn: "BIenvenido!",
      primaryBtnLabel: "Iniciar sesión",
      emailRequiredLabel: "Email requerido",
      passwordRequiredLabel: "Contraseña requerida",
      emailNotValidLabel: "El correo no es válido",
      btnLoggedInLabel: "Cerrar",
      emailPlaceholder: "Tu correo",
      email: "",
      password: "",
      highlightEmailWithError: null,
      highlightPasswordWithError: null,
      isFormSuccess: false,
      httpStatusCode: ""
    };
  },

  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    openModal() {
      if (this.$store.getters.isLoginModalOpen) {
        return true;
      } else {
        return false;
      }
    }
  },

  methods: {
    setToken(token) {
      this.$store.commit("setToken", token);
    },
    logIn(email, password) {
      axios
        .post("http://192.168.1.77:3000/v1/login", {
          email: email,
          password: password
        })
        .then(response => {
          this.httpStatusCode = response.status;

   
            this.setToken(response.data.token);
            if (this.email && this.password && this.httpStatusCode == 200) {
              this.highlightEmailWithError = false;
              this.highlightPasswordWithError = false;
              this.isFormSuccess = true;
              this.$store.commit("isUserLoggedIn", this.isFormSuccess);
            } 
            if (!this.email) {
              this.highlightEmailWithError = true;

              if (this.email && !isValidEmail(this.email)) {
                this.emailRequiredLabel = this.emailNotValidLabel;
              }
            } else {
              this.highlightEmailWithError = false;
            }

            if (!this.password) {
              this.highlightPasswordWithError = true;
            } else {
              this.highlightPasswordWithError = false;
            }
          
        }).catch(err=>{
               
               swal("Usuario o contraseña no validos","Verifique sus credeciales","error")
        })
    },
    closeModal() {
      this.$store.commit("showLoginModal", false);
    },
    checkForm(e) {
      e.preventDefault();
    },
    checkEmailOnKeyUp(emailValue) {
      if (emailValue && isValidEmail(emailValue)) {
        this.highlightEmailWithError = false;
      } else {
        this.highlightEmailWithError = true;

        if (!isValidEmail(emailValue)) {
          this.emailRequiredLabel = this.emailNotValidLabel;
        }
      }
    },
    checkPasswordOnKeyUp(passwordValue) {
      if (passwordValue) {
        this.highlightPasswordWithError = false;
      } else {
        this.highlightPasswordWithError = true;
      }
    }
  }
};
</script>

<style lang="scss">
.fa-exclamation-circle {
  color: red;
}
.fa-check {
  color: green;
}
</style>
