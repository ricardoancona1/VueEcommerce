<template>
  <div>
      <navbar></navbar>
    <br>
    
    <h1 class="tag is-large">Información de contacto</h1>
    <br>
    <br>
    <br>
    <div class="column is-half">
      

    <section>
      
      <b-field horizontal label="Nombre">
        <b-input placeholder="Ingresa tu nombre"></b-input>
        <b-field horizontal label="Apellidos">
        <b-input placeholder="Ingresa tus Apellidos"></b-input>
      </b-field>
      </b-field>

      <b-field label="Fecha de Nacimiento" >
        <b-datepicker placeholder="Seleccione una fecha" icon="calendar-today" ></b-datepicker>
      </b-field>

      <b-field label="Dirección">
        <b-input placeholder="Calle y Número ( Incluir Numero Interior )"></b-input>
      </b-field>

      <b-field label="Colonia">
        <b-input placeholder="Ejemplo: Col.Pensiones"></b-input>
      </b-field>

      <b-field label="Ciudad">
        <b-input placeholder="Ejemplo: Merida"></b-input>
      </b-field>

      <b-field label="Pais/Region">
        <b-input placeholder="Mexico" disabled="true"></b-input>
      </b-field>

      <b-field label="Estado">
       <b-select placeholder="Selecciona un Estado" icon="account">
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
        <b-input placeholder="Ejemplo: 97000"></b-input>
      </b-field>

      <b-field label="Teléfono">
        <b-input placeholder="Ingresa tu numero de Celular"></b-input>
      </b-field>
  <br>
      <div class="buttons">
        <b-button type="submit" class="tag is-warning is-medium">Guardar Cambios</b-button>
      </div>
      <br>
    </section>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import navbar from '../components/others/navbar'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy);
Vue.config.productionTip = false


export default {
  name: "ModificarPerfil",
  components:{
      navbar
  }
};

</script>

<style scoped>


</style>