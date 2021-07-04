function generarId() {
    /*
    Generar id para cada item de registro.

    Se recorre todos los registros del localStorage
    y se obtiene todos los id, se busca el mayor de ellos.
    Y el nuevo id que retorna esta funcion es el id mayor+1.

    De esta forma todos los registros tienen id diferentes.
    */
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

function crearRegistro(titulo, valor, esIngreso, id) {
    /*
    Crea un nuevo registro en localStorage.

    El valor del parametro del "id" se encarga la funcion
    "generarId()".

    Siempre se crea un nuevo registro sin importar que tenga 
    el mismo titulo o el mismo valor.
    Si el titulo o valor son iguales a otro registro almacenado 
    no interesa, porque el parametro id siempre será diferente.

    Dentro de esta funcion no se necesita que se comprueben que 
    los datos estén vacíos. La interfaz gráfica se encarga de ello.
    */
}

function actualizarRegistro(titulo, valor, esIngreso, id) {
    /*
    Se trae el String de localStorage, se convierte a json,
    se agrega la nueva actualizacion al registro que corresponda,
    luego se convierte el json de nuevo a un string y se almacena
    en la misma variable del localStorage.
    */
}

function borrarRegistro(id) {
    /*
    Acá se borra un registro de localStorage usando el id
    del registro a eliminar.

    No se necesita que dentro de esta funcion se compruebe que 
    el registro exista, la interfaz se encarga de ello.
    */
}

function obtenerTodosLosRegistros() {
    /*
    Para cuando se visita la pagina de nuevo y se necesita 
    recuperar todos los registros que estén almacenados en 
    localStorage.
    Esta funcion retorna un arreglo de objetos javascript
    (ver la nota al final para ver como es la estructura).

    Esta funcion obtiene todos los registros y los retorna 
    en un objeto javascript, y la interfaz grafica se encarga 
    de mostrarlos en pantalla.
    */
}


//NOTA: talvez falten mas funciones :)



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