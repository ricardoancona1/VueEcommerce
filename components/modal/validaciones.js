function validarString(nombre) {
  const patron = new RegExp("^[a-zA-Z\\s]+$");
  if (patron.test(nombre)) {
    return true;
  } else {
    return false;
  }
}

export default {
  validarString
};
