<template>
  <div>
    <navbar></navbar>
    <br />

    <h1 class="tag is-large">Información de contacto</h1>
    <br />
    <br />
    <br />
    <div class="column is-half">
      <section>
        <b-field horizontal label="Nombre">
          <b-input v-model="name" placeholder="Ingresa tu nombre"></b-input>
          <b-field horizontal label="Apellidos">
            <b-input
              v-model="lastName"
              placeholder="Ingresa tus Apellidos"
            ></b-input>
          </b-field>
        </b-field>
        <div id="app" class="container">
          <b-field label="Genero">
            <section>
              <div class="block">
                <b-radio v-model="genero" name="name" native-value="Hombre">
                  Hombre
                </b-radio>
                <b-radio v-model="genero" name="name" native-value="Mujer">
                  Mujer
                </b-radio>
              </div>
            </section>
          </b-field>
        </div>
        <section>
          <b-field>
            <b-datepicker
              v-model="birthday"
              ref="datepicker"
              expanded
              placeholder="Select a date"
            >
            </b-datepicker>
            <b-button
              @click="$refs.datepicker.toggle()"
              icon-left="calendar-today"
              type="is-primary"
            />
          </b-field>
        </section>

        <b-field label="Dirección">
          <b-input
            v-model="direccion"
            placeholder="Calle y Número ( Incluir Numero Interior )"
          ></b-input>
        </b-field>

        <b-field label="Colonia">
          <b-input
            v-model="colonia"
            placeholder="Ejemplo: Col.Pensiones"
          ></b-input>
        </b-field>

        <b-field label="Ciudad">
          <b-input v-model="ciudad" placeholder="Ejemplo: Merida"></b-input>
        </b-field>

        <b-field label="Pais/Region">
          <b-input placeholder="Mexico" disabled="true"></b-input>
        </b-field>

        <b-field label="Estado">
          <b-select
            value="CHP"
            v-model="estado"
            placeholder="Selecciona un Estado"
            icon="account"
          >
            <option value="DIF">Distrito Federal</option>
            <option value="AGS">Aguascalientes</option>
            <option value="BCN">Baja California</option>
            <option value="BCS">Baja California Sur</option>
            <option value="CAM">Campeche</option>
            <option value="CHP">Chiapas</option>
            <option value="CHI">Chihuahua</option>
            <option value="COA">Coahuila</option>
            <option value="COL">Colima</option>
            <option value="DUR">Durango</option>
            <option value="GTO">Guanajuato</option>
            <option value="GRO">Guerrero</option>
            <option value="HGO">Hidalgo</option>
            <option value="JAL">Jalisco</option>
            <option value="MEX">M&eacute;xico</option>
            <option value="MIC">Michoac&aacute;n</option>
            <option value="MOR">Morelos</option>
            <option value="NAY">Nayarit</option>
            <option value="NLE">Nuevo Le&oacute;n</option>
            <option value="OAX">Oaxaca</option>
            <option value="PUE">Puebla</option>
            <option value="QRO">Quer&eacute;taro</option>
            <option value="ROO">Quintana Roo</option>
            <option value="SLP">San Luis Potos&iacute;</option>
            <option value="SIN">Sinaloa</option>
            <option value="SON">Sonora</option>
            <option value="TAB">Tabasco</option>
            <option value="TAM">Tamaulipas</option>
            <option value="TLX">Tlaxcala</option>
            <option value="VER">Veracruz</option>
            <option value="YUC">Yucat&aacute;n</option>
            <option value="ZAC">Zacatecas</option>
          </b-select>
        </b-field>

        <b-field label="Codigo Postal">
          <b-input v-model="cp" placeholder="Ejemplo: 97000"></b-input>
        </b-field>

        <b-field label="Teléfono">
          <b-input
            v-model="phone"
            placeholder="Ingresa tu numero de Celular"
          ></b-input>
        </b-field>
        <br />
        <div class="buttons">
          <b-button
            @click="enviarFormulario"
            type="submit"
            class="tag is-warning is-medium"
            >Guardar Cambios</b-button
          >
        </div>
        <br />
      </section>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import navbar from "../components/others/navbar";
import Buefy from "buefy";
import axios from "axios";
import "buefy/dist/buefy.css";
import swal from "sweetalert";
Vue.use(Buefy);
Vue.config.productionTip = false;

export default {
  name: "ModificarPerfil",
  components: {
    navbar
  },
  mounted() {
    axios
      .get("http://127.0.0.1:3000/v1/adduser/7", {
        headers: {
          "Content-Type": "application/json",
          Authorization: this.$store.getters.getToken
        }
      })
      .then(response => {
        console.log(this.birthday);
        if (
          response.data.message.birthday != null ||
          response.data.message.birthday != ""
        ) {
          this.birthday = this.formatDateYYYMMDDToObject(
            response.data.message.birthday
          );
        }
        this.name = response.data.message.name;
        this.lastName = response.data.message.lastName;
        this.email = response.data.message.email;
        this.password = response.data.message.password;
        this.direccion = response.data.message.direccion;
        this.phone = response.data.message.phone;
        this.ciudad = response.data.message.ciudad;
        this.estado = response.data.message.estado;
        this.name = response.data.message.name;
        this.colonia = response.data.message.colonia,
        this.cp = response.data.message.cp;
        this.genero=response.data.message.genero
      });
  },
  data() {
    return {
      name: "",
      lastName: "",
      email: "",
      password: "",
      direccion: "",
      phone: "",
      birthday: new Date(),
      ciudad: "",
      estado: "",
      cp: "",
      colonia: "",
      genero: "",
      date: new Date(),
      genero:""
    };
  },
  methods: {
    formatDateObjectToYYYMMDD(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
     

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-")+" "+"18:00:00.000 +00:00";
    },
    formatDateYYYMMDDToObject(date) {  
      let date1=new Date(date); 
      console.log("aqui", date1);

      return date1

      //  return date1;
    },
    mostrarMensajeExito() {
      console.log(this.birthday);
      swal("Se han actualizado tus datos", "", "success");
    },
    mostrarMensajeError() {
      swal("Debes completar el formulario", "", "error");
    },
    enviarFormulario() {
      axios
        .put("http://0.0.0.0:3000/v1/adduser/7", {
          name: this.name,
          lastName: this.lastName,
          email: this.email,
          direccion: this.direccion,
          ciudad: this.ciudad,
          estado:this.estado,
          colonia: this.colonia,
          cp: this.cp,
          birthday: this.formatDateObjectToYYYMMDD(this.birthday),
          phone:this.phone,
          genero:this.genero
        })
        .then(response => {
          if (response.status == 200) {
            this.mostrarMensajeExito();
          } else {
            mostrarMensajeError();
          }
        });
    }
  }
};
</script>

<style scoped></style>
