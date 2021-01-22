<template>
  <div :class="[openModal ? 'is-active' : '', 'modal']">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p v-if="!isUserSignedUp" class="modal-card-title">{{ modalTitle }}</p>
        <p v-if="isUserSignedUp" class="modal-card-title">
          {{ modalTitleRegistered }}
        </p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <form @submit="checkForm" action="#" method="post">
        <section class="modal-card-body">
          <div v-if="!isUserSignedUp">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[
                    highlightNameWithError ? 'input is-danger' : 'input'
                  ]"
                  type="text"
                  :placeholder="namePlaceholder"
                  v-model="name"
                  @keyup="checkNameOnKeyUp(name)"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
                <span
                  v-if="highlightNameWithError !== null"
                  class="icon is-small is-right"
                >
                  <i
                    :class="[
                      highlightNameWithError
                        ? 'fa fa-exclamation-circle'
                        : 'fa fa-check'
                    ]"
                  ></i>
                </span>
              </p>
              <p v-if="highlightNameWithError" class="help is-danger">
                {{ nameErrorLabel }}
              </p>
            </div>
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
                {{ emailErrorLabel }}
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[
                    highlightPasswordWithError ? 'input is-danger' : 'input'
                  ]"
                  type="password"
                  :placeholder="passwordPlaceholder"
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
                {{ passwordErrorLabel }}
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[
                    highlightRepeatPasswordWithError
                      ? 'input is-danger'
                      : 'input'
                  ]"
                  type="password"
                  :placeholder="repeatPasswordPlaceholder"
                  v-model="repeatPassword"
                  @keyup="checkRepeatPasswordOnKeyUp(repeatPassword)"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
                <span
                  v-if="highlightRepeatPasswordWithError !== null"
                  class="icon is-small is-right"
                >
                  <i
                    :class="[
                      highlightRepeatPasswordWithError
                        ? 'fa fa-exclamation-circle'
                        : 'fa fa-check'
                    ]"
                  ></i>
                </span>
              </p>
              <p v-if="highlightRepeatPasswordWithError" class="help is-danger">
                {{ notEqualErrorLabel }}
              </p>
            </div>
          </div>

          <div v-if="isUserSignedUp" class="level">
            <div class="level-item has-text-centered">
              <div>
                <p class="title">Bienvenido {{ name }}!</p>
                <br />
                <h1>
                  Para empezar a comprar, completa el registro en la sección Tu
                  Perfil
                </h1>
              </div>
            </div>
          </div>

        </section>
        <footer class="modal-card-foot">
          <button
            v-if="!isUserSignedUp"
            class="button is-success"
            @click="enviarFormulario"
          >
            {{ primaryBtnLabel }}
          </button>
          <button
            v-if="isUserSignedUp"
            type="button"
            class="button is-success"
            @click="closeModal"
          >
            {{ btnRegisteredLabel }}
          </button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
import { isValidEmail } from "@/assets/validators";
import swal from "sweetalert";
import axios from "axios";
import validaciones from "./validaciones";
export default {
  name: "registration",

  data() {
    return {
      modalTitle: "Registrate",
      modalTitleRegistered: "Bienvenido ",
      primaryBtnLabel: "Registrate",
      btnRegisteredLabel: "Cerrar",
      namePlaceholder: "Nombre*",
      emailPlaceholder: "Correo electronico *",
      passwordPlaceholder: "Contraseña*",
      repeatPasswordPlaceholder: "Repita su contraseña*",
      notEqualErrorLabel: "Las contraseñas no coinciden",
      passwordErrorLabel: "El campo conraseña es requerido",
      nameErrorLabel: "El campo nombre es requerido",
      emailErrorLabel: "EL campo correo electronico es requerido",
      emailNotValidLabel: "Se requiere un correo electronico valido ",
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      highlightNameWithError: null,
      highlightEmailWithError: null,
      highlightPasswordWithError: null,
      highlightRepeatPasswordWithError: null,
      isFormSuccess: false,
      status: ""
    };
  },
  computed: {
    isUserSignedUp() {
      return this.$store.getters.isUserSignedUp;
    },
    openModal() {
      if (this.$store.getters.isSignupModalOpen) {
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
        .post("http://someServerUrl:3000/v1/login", {
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
               
               swal("Algo salió mal","Intente de nuevo más tarde","error")
        })
    },
    enviarFormulario() {
      if (this.password == this.repeatPassword) {
        if (!validaciones.validarString(this.name)) {
          swal("Escriba un nombre valido", "solo se permiten letras", "error");
        }else{
        axios
          .post("http://someServerUrl:3000/v1/adduser", {
            name: this.name,
            email: this.email,
            password: this.password,
          })
          .then(response => {
            this.status = response.status;
         
                 if (
          this.name &&
          this.email &&
          this.password &&
          this.repeatPassword &&
          this.status == "201"
        ) {
          this.highlightEmailWithError = false;
          this.highlightPasswordWithError = false;
          this.isFormSuccess = true;
          this.$store.commit("setUserName", this.name);
          this.$store.commit("isUserSignedUp", this.isFormSuccess);
          this.$store.commit("isUserLoggedIn", this.isFormSuccess);
          console.log(response.data);
        this.setToken(response.data.token);
        }

        if (!this.name) {
          this.highlightNameWithError = true;
        } else {
          this.highlightNameWithError = false;
        }

        if (!this.email) {
          this.highlightEmailWithError = true;

          if (this.email && !isValidEmail(this.email)) {
            this.emailErrorLabel = this.emailNotValidLabel;
          }
        } else {
          this.highlightEmailWithError = false;
        }

        if (!this.password) {
          this.highlightPasswordWithError = true;
        } else {
          this.highlightPasswordWithError = false;
        }

        if (!this.repeatPassword) {
          this.highlightRepeatPasswordWithError = true;
        } else {
          this.highlightRepeatPasswordWithError = false;
        }
         
         
         
         }).catch(err=>{
            this.status=err.response.status
           
            if (this.status==409) {
              swal("Este correo no está disponble","intenta con uno diferente","warning")
            } else {
              swal("algo salió mal","intenta de nuevo más tarde","error")
            }

          })
 
          }


      } else {
        swal("Las contraseñas no coinciden", "", "error");
      }
    },
    closeModal() {
      this.$store.commit("showSignupModal", false);
    },
    checkForm(e) {
      e.preventDefault();
    },
    checkNameOnKeyUp(nameValue) {
      if (nameValue) {
        this.highlightNameWithError = false;
      } else {
        this.highlightNameWithError = true;
      }
    },
    checkEmailOnKeyUp(emailValue) {
      if (emailValue && isValidEmail(emailValue)) {
        this.highlightEmailWithError = false;
      } else {
        this.highlightEmailWithError = true;

        if (!isValidEmail(emailValue)) {
          this.emailErrorLabel = this.emailNotValidLabel;
        }
      }
    },
    checkPasswordOnKeyUp(passwordValue) {
      if (passwordValue) {
        this.highlightPasswordWithError = false;

        if (this.repeatPassword === this.password) {
          this.highlightRepeatPasswordWithError = false;
        } else {
          this.highlightRepeatPasswordWithError = true;
        }
      } else {
        this.highlightPasswordWithError = true;
      }
    },
    checkRepeatPasswordOnKeyUp(repeatPasswordValue) {
      if (repeatPasswordValue) {
        if (repeatPasswordValue === this.password) {
          this.highlightRepeatPasswordWithError = false;
        } else {
          this.highlightRepeatPasswordWithError = true;
        }
      } else {
        this.highlightRepeatPasswordWithError = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.fa-exclamation-circle {
  color: red;
}
.fa-check {
  color: green;
}
</style>
