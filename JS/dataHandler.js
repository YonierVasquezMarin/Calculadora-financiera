/**
 * Determina el id mayor de los registros guardados y retorna ese id+1.
 * @returns {Number} el id que debe usar el nuevo registro.
 */
function generarId() {
    let datosAlmacenadosDeRegistros = obtenerTodosLosRegistros()
    if(datosAlmacenadosDeRegistros.length!=0) {
        let itemsRegistros = datosAlmacenadosDeRegistros
        //Obtener los ids de todos los registros
        let listaIDs = []
        for(let i=0;i<itemsRegistros.length;i++) {
            listaIDs.push(itemsRegistros[i].id)
        }
        //Determinar el id mayor
        function getMaxOfArray(numArray) {
            return Math.max.apply(null, numArray);
        }
        return getMaxOfArray(listaIDs)+1
    } else {
        return 1
    }
}

function sumarASaldo(valorASumar) {
    /*
    Para cuando se crea un nuevo registro de tipo "Ingreso".
    Esta funcion solo agrega un valor al valor del saldo.
    El valor de la suma se encuentra en localStorage (en 
    otra variable diferente a la que contiene los registros.)
    */
}

function restarASaldo(valorARestar) {
    /*
    Para cuando se crea un nuevo registro de tipo "Egreso".
    
    */
}

function reajustarSaldo(valor, esIngreso) {
    /*
    Se hace un reajuste en estos casos:
    -se actualiza un registro entre todos.
    -se borra un registro.
    */
}

/**
 * Guarda los datos de un registro en un JSON dentro de localStorage
 * @param {String} titulo el titulo del nuevo movimiento.
 * @param {Number} valor 
 * @param {Boolean} esIngreso 
 * @param {Number} id 
 */
function crearRegistro(titulo, valor, esIngreso, id) {
    let datosAlmacenadosDeRegistros = obtenerTodosLosRegistros()
    let itemsRegistros = []
    let nuevoRegistro = {}
    if(datosAlmacenadosDeRegistros.length!=0) {
        //Ya existen registros, por tanto se agrega el nuevo al final
        itemsRegistros = datosAlmacenadosDeRegistros
        nuevoRegistro = {
            "titulo": titulo,
            "valor": valor,
            "esIngreso": esIngreso,
            "id": id
        }
    } else {
        //No existen registros, por tanto se crea el primero y se guarda
        itemsRegistros = []
        nuevoRegistro = {
            "titulo": titulo,
            "valor": valor,
            "esIngreso": esIngreso,
            "id": id
        }
    }
    itemsRegistros.push(nuevoRegistro)
    guardarRegistro(itemsRegistros)
}

function actualizarRegistro(titulo, valor, esIngreso, idRegistro) {
    //Buscar el registro con el id dado
    let listaRegistros = obtenerTodosLosRegistros()
    for(var i=0;i<listaRegistros.length;i++) {
        var registro = listaRegistros[i]
        if(registro["id"] == idRegistro) {
            //Cuando se halla el registro con el mismo id, se pasa a cambiar sus valores
            registro["titulo"] = titulo
            registro["valor"] = valor
            registro["esIngreso"] = esIngreso
            //Se guarda de nuevo dentro de la lista
            listaRegistros[i] = registro
            break
        }
    }
    //Guardar de nuevo la lista
    guardarRegistro(listaRegistros)
}

/**
 * Busca el id del registro dado y lo borra de la lista del 
 * localStorage.
 * @param {Number} id el id del registro a eliminar.
 */
function borrarRegistro(id) {
    let listaRegistros = obtenerTodosLosRegistros()
    if(listaRegistros.length!=0) {
        //Recorrer todos los registros buscando el id, y cuando se encuentre borrar ese objeto
        for(let i=0;i<listaRegistros.length;i++) {
            let registro = listaRegistros[i]
            if(registro["id"]==id) {
                listaRegistros.splice(i, 1)
                break
            }
        }
        //Guardar la nueva lista de registro en localStorage
        guardarRegistro(listaRegistros)
    }
}

/**
 * Retorna una lista con objetos JSON, y donde cada objeto es 
 * un registro guardado.
 * @returns {Array} una lista JSON con todos los registros.
 */
function obtenerTodosLosRegistros() {
    let datosAlmacenadosDeRegistros = localStorage.getItem("itemsRegistrosJSON")
    if(datosAlmacenadosDeRegistros!=null) {
        let itemsRegistros = JSON.parse(datosAlmacenadosDeRegistros)
        return itemsRegistros
    } else {
        return []
    }
}

/**
 * Recibe un JSON (lista con objetos), y lo guarda en localStorage.
 * @param {JSON} listaConRegistros el json a guardar.
 */
function guardarRegistro(listaConRegistros) {
    localStorage.setItem("itemsRegistrosJSON", JSON.stringify(listaConRegistros))
}



/*
NOTA:
La estructura del JSON almacenado en localStorage es asi:
[
    {
        "titulo": "primer registro",
        "valor": 3500,
        "esIngreso": true,
        "id": 1
    },
    {
        "titulo": "segundo registro",
        "valor": 500,
        "esIngreso": false,
        "id": 2
    }
]
*/