var elMenuEstaDesplegado = false
var elMsgError1EstaVisible = false

/**
 * Desplegar el menú creador el cual permanece oculto,
 * y éste sólo aparece al llamar a esta función.
 */
function desplegarMenuCreador() {
    if(!elMenuEstaDesplegado) {
        elMenuEstaDesplegado = true;
        const menuCreador = document.querySelector("#menu-creador")
        menuCreador.style = "padding: 14px;margin-bottom: 28px;height: 256px;opacity: 100%;"
    }
}

/**
 * El elemento afectado es el texto que dice "Ingreso" o "Egreso"
 * en el menú creador. Si tal texto dice "Ingreso" se procede a
 * cambiarlo por "Egreso", de lo contrario, si dice "Egreso" se 
 * cambia a "Ingreso".
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
 * Si el mensaje de error 1 está oculto se procede a mostrarlo
 * en pantalla. De lo contrario si el mensaje está visble se
 * procede a ocultarlo.
 */
function cambiarVisibilidadMsgError1() {
    const msgError1 = document.querySelector("#msgError1")
    if(!elMsgError1EstaVisible) {
        elMsgError1EstaVisible = true
        msgError1.style = "opacity: 100%"
    } else {
        elMsgError1EstaVisible = false
        msgError1.style = "opacity: 0%"
    }
}