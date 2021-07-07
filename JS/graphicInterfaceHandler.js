var elMenuEstaDesplegado = false
var lasOpcionesDeEliminacionEstanEn = 0; //id del registro que tiene las opciones de eliminacion abiertas

/**
 * Desplegar el menú creador el cual permanece oculto,
 * y éste sólo aparece al llamar a esta función.
 */
function desplegarMenuCreador() {
    if (!elMenuEstaDesplegado) {
        elMenuEstaDesplegado = true;
        const menuCreador = document.querySelector("#menu-creador")
        menuCreador.style = "margin-bottom: 28px;height: 324px;opacity: 100%;z-index:0"
        const contenedorMenuCreador = document.querySelector("#contenedor-menu-creador")
        contenedorMenuCreador.style = "padding: 14px"
        menuCreador.setAttribute("data-menu-desplegado", "true")
    }
}

/**
 * Ocultar el menu donde se crean los registros.
 */
function ocultarMenuCreador() {
    elMenuEstaDesplegado = false
    const menuCreador = document.querySelector("#menu-creador")
    menuCreador.style = "height: 324px;"
    const contenedorMenuCreador = document.querySelector("#contenedor-menu-creador")
    contenedorMenuCreador.style = ""
    menuCreador.setAttribute("data-menu-desplegado", "false")
    setTimeout(() => {
        menuCreador.style = ""
    }, 650)
}

/**
 * El elemento afectado es el texto que dice "Ingreso" o "Egreso"
 * en el menú creador. Si tal texto dice "Ingreso" se procede a
 * cambiarlo por "Egreso", de lo contrario, si dice "Egreso" se 
 * cambia a "Ingreso".
 * @param {String} tipoMovimiento es el texto que va a aparecen 
 * en el elemento afectado. Se puede recibir "Ingreso" o "Egreso".
 */
function cambiarTipoMovimientoEnPantalla(tipoMovimiento) {
    const tipoMovientoElement = document.querySelector("#tipoNuevoMovimiento")
    tipoMovientoElement.style = "opacity: 0%;"
    setTimeout(() => {
        tipoMovientoElement.innerHTML = tipoMovimiento
        tipoMovientoElement.style = "opacity: 100%;"
    }, 300)
}

/**
 * Extrae el texto que el usuario halla introducido en el campo 
 * para el titulo del nuevo movimiento a crear. Dicho campo está 
 * en el menú creador.
 * @returns {String} el titulo del movimiento que el usuario halla 
 * elegido.
 */
function obtenerTituloMovimientoACrear() {
    const tituloMovimiento = document.querySelector("#tituloMovimiento")
    return tituloMovimiento.value
}

/**
 * Extrae el texto que el usuario halla introducido en el campo 
 * para el valor del nuevo movimiento a crear. Dicho campo está 
 * en el menú creador.
 * @returns {String} el valor del movimiento que el usuario halla 
 * elegido.
 */
function obtenerValorMovimientoACrear() {
    const valorMovimiento = document.querySelector("#valorMovimiento")
    return valorMovimiento.value
}

/**
 * Extrae el tipo de movimiento del menu creador.
 * @returns si es ingreso retorna true, si es egreso retorna
 * false.
 */
function elMovimientoACrearEsIngreso() {
    let tipoMovimiento = document.querySelector("#tipoNuevoMovimiento").innerHTML
    if (tipoMovimiento == "Ingreso") {
        return true
    } else {
        return false
    }
}

/**
 * Verifica que ambos campos del titulo y valor del movimiento no estén 
 * vacíos.
 * @param {String} tituloMovimiento el titulo del movimiento ingresado por 
 * el usuario.
 * @param {String} valorMovimiento el valor del movimiento ingresado por 
 * el usuario.
 * @returns {Boolean} retorna true si ambos campos del titulo y valor 
 * contienen texto, o retorna false si uno o los dos campos están vacios.
 */
function losDatosDelMovimientoEstanFull(tituloMovimiento, valorMovimiento) {
    if (tituloMovimiento == "" || valorMovimiento == "") {
        return false
    }
    return true
}

/**
 * Si se especifica en el parámetro "seMuestra" un true se 
 * procede a mostrar el mensaje de error, y si es un false 
 * se procede a ocultarlo.
 * @param {Boolean} seMuestra si es true se muestra, y si 
 * es false se oculta.
 */
function cambiarVisibilidadMsgError1(seMuestra) {
    const msgError1 = document.querySelector("#msgError1")
    if (seMuestra) {
        msgError1.style = "opacity: 100%"
    } else {
        msgError1.style = "opacity: 0%"
    }
}

/**
 * Con los parámetros ingresados se imprime un nuevo registro 
 * en pantalla, al final del ultimo registro que exista.
 * @param {String} titulo el titulo del nuevo registro a 
 * imprimir en pantalla.
 * @param {Number} valor el valor del nuevo registro.
 * @param {Boolean} esIngreso si el nuevo registro es un 
 * ingreso se especifica true, en cambio si el un egreso se
 * especifica false.
 * @param {Number} id un id unico que identifica al nuevo registro.
 */
function mostrarRegistroEnPantalla(titulo, valor, esIngreso, id) {
    let itemRegistro = document.createElement("div")
    itemRegistro.classList.add("item-registro")
    itemRegistro.setAttribute("data-id",id)
    let composicionInterna =
        `<div class="contenedor-registro">
            <img class="img-${esIngreso ? 'adicion' : 'substraccion'}" alt="signo tipo ingreso">
            <div class="contenedor-titulo-precio">
                <p>${titulo}</p>
                <p>$${valor}</p>
            </div>
            <div class="contenedor-btns-edit">
                <span class="btnEditar" title="Editar"><img class="btn" alt="boton editar"></span>
                <span class="btnMostrarOpcionesDeEliminado" title="Eliminar"><img class="btn" alt="boton eliminar"></span>
            </div>
        </div>
        <div class="opciones-de-borrado" data-id="${id}">
            <h3>¿Está seguro de borrar esto?</h3>
            <button class="btnBorrarRegistro btn btn-capa-borrado">Borrar</button>
            <button class="btnCancelarBorrado btn btn-capa-borrado">Cancelar</button>
        </div>`
    itemRegistro.innerHTML = composicionInterna

    let listaRegistros = document.querySelector("#lista-registros")
    listaRegistros.appendChild(itemRegistro)
}

/**
 * Muestra una capa encima del item del registro especificado 
 * con el id. La capa son opciones para borrar el item de 
 * registro.
 * @param {Number} idRegistro El id del registro que está 
 * en la pantalla.
 */
function mostrarEliminadorDeRegistro(idRegistro) {
    if(lasOpcionesDeEliminacionEstanEn!=0) {
        ocultarEliminadorDeRegistro(lasOpcionesDeEliminacionEstanEn)
    }
    lasOpcionesDeEliminacionEstanEn = idRegistro
    const capasParaBorrarRegistros = document.querySelectorAll(".opciones-de-borrado")
    capasParaBorrarRegistros.forEach((capa) => {
        if (capa.getAttribute("data-id") == idRegistro) {
            capa.style = "display: block;"
            setTimeout(() => {
                capa.style = capa.getAttribute("style") + "opacity: 100%;"
            }, 100);
        }
    })
}


function ocultarEliminadorDeRegistro(idRegistro) {
    const capasParaBorrarRegistros = document.querySelectorAll(".opciones-de-borrado")
    capasParaBorrarRegistros.forEach((capa) => {
        if (capa.getAttribute("data-id") == idRegistro) {
            capa.style = capa.getAttribute("style") + "opacity: 0%;"
            setTimeout(() => {
                capa.style = "display: none;"
            }, 300);
        }
    })
    lasOpcionesDeEliminacionEstanEn = 0
}


function eliminarRegistroDePantalla(idRegistro) {
    const registros = document.querySelectorAll(".item-registro")
    registros.forEach((itemRegistro)=>{
        if(itemRegistro.getAttribute("data-id")==idRegistro) {
            itemRegistro.remove()
        }
    })
}