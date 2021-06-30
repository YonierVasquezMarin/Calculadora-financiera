var elMenuEstaDesplegado = false

/**
 * Desplegar el menú creador el cual permanece oculto,
 * y éste sólo aparece al llamar a esta función.
 */
function desplegarMenuCreador() {
    if(!elMenuEstaDesplegado) {
        elMenuEstaDesplegado = true;
        const menuCreador = document.querySelector("#menu-creador")
        menuCreador.style = "margin-bottom: 28px;height: 324px;opacity: 100%;"
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
    setTimeout(()=>{
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
    if(tituloMovimiento=="" || valorMovimiento=="") {
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
    if(seMuestra) {
        msgError1.style = "opacity: 100%"
    } else {
        msgError1.style = "opacity: 0%"
    }
}