<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
   

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
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
              <router-link to="/TuPerfil">
      <a class="navbar-item">
        Tu Perfil
      </a>
      
        </router-link>

    </div>

 
  </div>
</nav>

</template>