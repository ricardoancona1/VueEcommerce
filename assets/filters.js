

export function quitarAcentos(cadena){
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
}

export function getByTitle (list, keyword) {
    let search = keyword.trim().toLowerCase();
    search=quitarAcentos(search)
    if (!search.length) return list;
    let filtro = list.filter(item => item.nombre.toLowerCase().indexOf(search) > -1);
    return filtro
}