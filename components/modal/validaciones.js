function validarString(nombre) {
  const patron = new RegExp("[A-Za-zÑñ ]");
  if (patron.test(nombre)) {
    return true;
  } else {
    return false;
  }
}

export default {
  validarString
};
