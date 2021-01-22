import axios from "axios";

function conexion() {
  return axios
    .get("http://someServerUrl:3000/v1/product", {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return response.data.listProducts[0].descripcion;
    });
}

export let arreglo = [];

let userToken = conexion();
userToken.then(function(result) {
  arreglo[0] = result;
  state().products[0].description = result;
  return arreglo[0];
});

export let state = () => ({
  email: "",
  carrito: [],
  productos: [],
  productosIniciales: [],
  botonPrueba: true,
  products: [
    {
      id: 1,
      title: 2,
      description: "",
      price: 123,
      ratings: 3,
      reviews: 5,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
      //imgUrl:''
      //  imgUrl:'https://m.media-amazon.com/images/I/61IVODycUCL._AC_UL480_FMwebp_QL65_.jpg'
    },
    {
      //  descripcion:'asd',
      id: 2,
      title: 2,
      description: "",
      price: 123,
      ratings: 3,
      reviews: 5,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
      //imgUrl:''
      //  imgUrl:'https://m.media-amazon.com/images/I/61IVODycUCL._AC_UL480_FMwebp_QL65_.jpg'
    },
    {
      //  descripcion:'asd',
      id: 3,
      title: 3,
      description: "",
      price: 123,
      ratings: 3,
      reviews: 5,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
      //imgUrl:''
      //  imgUrl:'https://m.media-amazon.com/images/I/61IVODycUCL._AC_UL480_FMwebp_QL65_.jpg'
    },
    {
      //  descripcion:'asd',
      id: 4,
      title: 3,
      description: "",
      price: 123,
      ratings: 3,
      reviews: 5,
      isAddedToCart: false,
      isAddedBtn: false,
      isFavourite: false,
      quantity: 1
      //imgUrl:''
      //  imgUrl:'https://m.media-amazon.com/images/I/61IVODycUCL._AC_UL480_FMwebp_QL65_.jpg'
    }
  ],
  userInfo: {
    isLoggedIn: false,
    isSignedUp: false,
    hasSearched: false,
    hasErased: false,
    name: "",
    productTitleSearched: ""
  },
  systemInfo: {
    openLoginModal: false,
    openSignupModal: false,
    openCheckoutModal: false
  },
  token: ""
});

export const getters = {
  productsAdded: state => {
    return state.products.filter(el => {
      return el.isAddedToCart;
    });
  },
  carrito: state => {
    return state.carrito;
  },

  productsAddedToFavourite: state => {
    return state.products.filter(el => {
      return el.isFavourite;
    });
  },
  getProductById: state => id => {
    return state.productos[0].find(product => product.id == id);
  },
  isUserLoggedIn: state => {
    return state.userInfo.isLoggedIn;
  },
  isUserSignedUp: state => {
    return state.userInfo.isSignedUp;
  },
  getUserName: state => {
    return state.userInfo.name;
  },
  isLoginModalOpen: state => {
    return state.systemInfo.openLoginModal;
  },
  isSignupModalOpen: state => {
    return state.systemInfo.openSignupModal;
  },
  isCheckoutModalOpen: state => {
    return state.systemInfo.openCheckoutModal;
  },
  quantity: state => {
    return state.products.quantity;
  },
  getToken: state => {
    return state.token;
  },
  getEmail: state => {
    return state.email;
  },
  getProductos: state => {
    return state.productos;
  },
  getBotonPrueba: state => {
    return state.botonPrueba;
  },
  estaEnCarrito: state => id => {

  }
};

export const mutations = {
  productos: (state, info) => {
    state.productos = [];
    state.productos.push(info);
  },
  productosIniciales: (state, info) => {
    state.productosIniciales = [];
    state.productosIniciales.push(info);
  },
  AniadirAlCarrito: (state, info) => {
    state.carrito.push(info);
  },
  addToCart: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isAddedToCart = true;
      }
    });
  },
  setAddedBtn1: (state, data) => {
    if (!state.productos[0]) {
      console.log("no");
      state.productos[0] = [];
      //   state.productos[0].push(data)
      state.productos[0].forEach(el => {
        console.log(el.id);
        if (data.id === el.id) {
          el.addedToCart = data.status;
        }
      });
    }
    if (state.productos[0]) {
      console.log("si");

      state.productos[0].forEach(el => {
        if (data.id === el.id) {
          el.addedToCart = data.status;
        }
      });
    }
  },
  setAddedBtn: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.id) {
        el.isAddedBtn = data.status;
      }
    });
  },
  removeFromCart: (state, id) => {
    state.carrito.pop(id);
    console.log(id);
    let contador = 0;
    state.productos[0].forEach(el => {
      if (el.uuid == id) {
        state.productos[0][contador].addToCart = false;
      }
      contador++;
    });
  },

  emptyCart: state => {
    state.carrito = [];
  },
  removeProductsFromFavourite: state => {
    state.products.filter(el => {
      el.isFavourite = false;
    });
  },
  isUserLoggedIn: (state, isUserLoggedIn) => {
    state.userInfo.isLoggedIn = isUserLoggedIn;
  },
  isUserSignedUp: (state, isSignedUp) => {
    state.userInfo.isSignedUp = isSignedUp;
  },
  setHasUserSearched: (state, hasSearched) => {
    state.userInfo.hasSearched = hasSearched;
  },
  setHasUserErased: (state, hasErased) => {
    state.userInfo.hasErased = hasErased;
  },
  setToken: (state, token) => {
    state.token = token;
  },
  setEmail: (state, email) => {
    state.email = email;
  },
  setUserName: (state, name) => {
    state.userInfo.name = name;
  },
  setProductTitleSearched: (state, titleSearched) => {
    state.userInfo.productTitleSearched = titleSearched;
  },
  showLoginModal: (state, show) => {
    state.systemInfo.openLoginModal = show;
  },
  showSignupModal: (state, show) => {
    state.systemInfo.openSignupModal = show;
  },
  showCheckoutModal: (state, show) => {
    state.systemInfo.openCheckoutModal = show;
  },
  addToFavourite: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isFavourite = true;
      }
    });
  },
  removeFromFavourite: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isFavourite = false;
      }
    });
  },
  quantity: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.id) {
        el.quantity = data.quantity;
      }
    });
  },
  SET_USER(state, authUser) {
    state.authUser = authUser;
  },
  setBotonPrueba(state, data) {
    state.botonPrueba = data;
  }
};
/* 
export const actions = {
  async nuxtServerInit({ commit }) {
    const res = await this.$axios.get("/api/current_user")
    commit("SET_USER", res.data)
  },
  async logout({ commit }) {
    const { data } = await this.$axios.get("/api/logout")
    if (data.ok) commit("SET_USER", null)
  },
  async handleToken({ commit }, token) {
    const res = await this.$axios.post("/api/stripe", token)
    commit("SET_USER", res.data)
  }
} */
