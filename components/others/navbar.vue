<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand is-active"></div>

    <div id="navbarBasicExample" class="navbar-menu is-active">
      <div class="navbar-start is-active">
        <router-link to="/Hogar">
          <a class="navbar-item">
            Hogar
          </a>
        </router-link>
        <router-link to="/nuestrosProductos">
          <a class="navbar-item">
            Nuestros Productos
          </a>
        </router-link>
        <router-link to="/Juguetes">
          <a class="navbar-item">
            Juguetes
          </a>
        </router-link>
        <router-link to="/belleza">
          <a class="navbar-item">
            Belleza
          </a>
        </router-link>
        <router-link to="/TuPerfil" v-if="isUserLoggedIn">
          <a class="navbar-item">
            Tu Perfil
          </a>
        </router-link>
      </div>
      <nabar-end></nabar-end>
    </div>
  </nav>


</template>
<script>
export default {
  data() {
    return {
      userLoggedIn: this.$store.getters.isUserLoggedIn
    };
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    }
  }
};
</script>
<style scoped>
.navbar-item {
  display: flex;
  flex-direction: row;
  font-size: 87%;
  
  color: white;
  
}


.navbar,
.navbar-menu,
.navbar-start,
.navbar-end {
  align-items: stretch;
  display: flex;
  padding: 0;
}

.navbar-menu{
  flex-grow: 1;
  flex-shrink: 0;
    margin: auto;
  width: 50%;
  
  display: flex;
  float: left;
  box-shadow: 3px 3px 1px #ccc;
  -webkit-box-shadow: 3px 3px 1px #ccc;
  -moz-box-shadow: 3px 3px 1px #ccc;
  padding: 10px;
  background-color: #232F3E;
}
.navbar-start{
  justify-content: flex-start;
  margin-right: auto;
}
.navbar-end{
  justify-content: flex-end;
  margin-left: auto;
}
</style>