var elMenuEstaDesplegado = false
var elMenuDeEliminacionEstaAbiertoEn = 0; //id del registro que tiene las opciones de eliminacion abiertas
var elMenuDeEdicionEstaAbiertoEn = 0; //id del registro que tiene abierto el menú de edición

/**
 * Agrega o resta el saldo de la pantalla.
 * @param {Number} saldoAAgregar saldo a agregar o restar al saldo de 
 * la pantalla. Esto puede ser un numero positivo o negativo.
 */
function modificarSaldoDePantalla(saldoAAgregar) {
    const saldoEnPantalla = document.querySelector("#txtSaldoActual")
    const txtSaldo = saldoEnPantalla.innerHTML
    const valorSaldo = Number.parseInt(txtSaldo)
    saldoAAgregar = Number.parseInt(saldoAAgregar)
    if(valorSaldo!=NaN) {
        const nuevoValor = valorSaldo + saldoAAgregar
        saldoEnPantalla.innerHTML = nuevoValor
    }
}

/**
 * Si el movimiento que tiene el menú abierto es de tipo ingreso, esto 
 * retorna true, de lo contrario retorna false.
 * @returns {Boolean} si el movimiento es un ingreso se retorna true, y
 * si es egreso retorna false.
 */
function elMovimientoRegistradoEsIngreso() {
    const txtBusqueda = `.item-registro[data-id='${elMenuDeEliminacionEstaAbiertoEn}']`
    const registro = document.querySelector(txtBusqueda)
    const claseImgMovimiento = registro.querySelector(".contenedor-registro>img").classList.item(0)
    if(claseImgMovimiento=="img-adicion") {
        return true
    } else {
        return false
    }
}

/**
 * Retorna el valor del registro que tiene el menú abierto.
 * @returns {Number} el valor del movimiento.
 */
function obtenerValorDelMovimientoRegistrado() {
    const txtBusqueda = `.item-registro[data-id='${elMenuDeEliminacionEstaAbiertoEn}']`
    const registro = document.querySelector(txtBusqueda)
    const valorMovimiento = registro.querySelector(".contenedor-titulo-precio>p:nth-child(2)").innerHTML.substr(1)
    return valorMovimiento
}

/**
 * Le agrega o resta valor al saldo en pantalla según la actualización del registro.
 * @param {Number} nuevoValor el nuevo valor del movimiento, el cual se actualizó.
 * @param {Number} antiguoValor el valor que tenia el registro antes de actualizarse.
 * @param {Boolean} esIngreso si el registro era antes un ingreso esto debe ser true, y
 * si era un egreso esto es false.
 */
function reajustarSaldoDePantalla(nuevoValor, antiguoValor, esIngreso) {
    let valorAAgregar = 0
    if(esIngreso) {
        valorAAgregar = nuevoValor-antiguoValor
    } else {
        valorAAgregar = -(nuevoValor-antiguoValor)
    }
    let txtSaldoEnPantalla = document.querySelector("#txtSaldoActual")
    const valorEnPantallaAntiguo = Number.parseInt(txtSaldoEnPantalla.innerHTML)
    const nuevoValorAAgregarEnPantalla = valorEnPantallaAntiguo + valorAAgregar
    txtSaldoEnPantalla.innerHTML = nuevoValorAAgregarEnPantalla
}

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
    //limpiar los campos
    menuCreador.querySelector("#tituloMovimiento").value = ""
    menuCreador.querySelector("#valorMovimiento").value = ""
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
        </div>

        <div class="editor-de-registro" data-id="${id}">
            <div class="zona-tipo-ingreso" data-ingreso="${esIngreso?'true':'false'}" data-id="${id}">
                <img class="img-estado img-tipo-movimiento-${esIngreso?'true':'false'}" alt="signo tipo ingreso">
                <img class="img-intercambio" alt="simbolo de intercambio">
            </div>
            <div class="opciones-de-edicion">
                <input title="Entrada del nombre del movimiento" type="text" placeholder="Nuevo titulo" class="input-edicion input-nuevo-nombre" data-id="${id}" value="${titulo}">
                <br>
                <input title="Entrada del numero del movimiento" type="number" placeholder="Nuevo valor" min="1" class="input-edicion input-nuevo-valor" data-id="${id}" value="${valor}">
                <span class="txtErrorCamposEdicion">MsgError</span>
                <button class="botonesEdicion btnActualizar">Actualizar</button>
                <button class="botonesEdicion btnCancelar">Cancelar</button>
            </div>
        </div>`
    itemRegistro.innerHTML = composicionInterna
    let listaRegistros = document.querySelector("#lista-registros")
    listaRegistros.appendChild(itemRegistro)

    //Modificar el valor del saldo en la pantalla
    if(esIngreso) {
        modificarSaldoDePantalla(valor)
    } else {
        modificarSaldoDePantalla(-valor)
    }
}

/**
 * Muestra el menú de edición encima del item del registro 
 * especificado por el id.
 * @param {Number} idRegistro el id del item del registro.
 */
function mostrarEditorDeRegistro(idRegistro) {
    if(elMenuDeEdicionEstaAbiertoEn!=0) {
        ocultarEditorDeRegistro(elMenuDeEdicionEstaAbiertoEn)
    }
    elMenuDeEdicionEstaAbiertoEn = idRegistro
    const capasParaEditarRegistros = document.querySelectorAll(".editor-de-registro")
    capasParaEditarRegistros.forEach((capa) => {
        if (capa.getAttribute("data-id") == idRegistro) {
            //Mostrar capa de las opciones de edición
            capa.style = "display: flex;"
            setTimeout(() => {
                capa.style = capa.getAttribute("style") + "opacity: 100%;"
            }, 100);
        }
    })
}

/**
 * Cierra el menú de edición del registro con el id dado.
 * @param {Number} idRegistro el id del registro que tiene abierto el 
 * menú de edición de registro.
 */
function ocultarEditorDeRegistro(idRegistro) {
    //Cerrar el menú de edición
    const capasParaEditarRegistros = document.querySelectorAll(".editor-de-registro")
    capasParaEditarRegistros.forEach((capa) => {
        if(capa.getAttribute("data-id")==idRegistro) {
            capa.style = capa.getAttribute("style") + "opacity: 0%;"
            setTimeout(() => {
                capa.style = "display: none;"
            }, 300);
        }
    })
    elMenuDeEdicionEstaAbiertoEn = 0;
}

/**
 * Restaura el menú de edición tal cual como esté el registro actual.
 * @param {Number} idRegistro id del item de registro al cual se le debe restaurar 
 * el menú de edición.
 */
function restaurarEditorDeRegistro(idRegistro) {
    const itemsRegistros = document.querySelectorAll(".item-registro")
    itemsRegistros.forEach((item) => {
        if(item.getAttribute("data-id")==idRegistro) {
            //Conocer el tipo de movimiento
            let txtClaseImagen = item.querySelector(".contenedor-registro>img").classList.item(0)
            if(txtClaseImagen=="img-adicion") {
                //Restaurar identificador
                item.querySelector(".zona-tipo-ingreso").setAttribute("data-ingreso", "true")
                //Restaurar icono
                item.querySelector(".zona-tipo-ingreso>img").setAttribute("class", "img-estado img-tipo-movimiento-true")
            } else {
                //Restaurar identificador
                item.querySelector(".zona-tipo-ingreso").setAttribute("data-ingreso", "false")
                //Restaurar icono
                item.querySelector(".zona-tipo-ingreso>img").setAttribute("class", "img-estado img-tipo-movimiento-false")
            }
            //Restaurar entrada nuevo texto
            let tituloRegistro = item.querySelector(".contenedor-titulo-precio>p:nth-child(1)").innerHTML
            let valorRegistro = item.querySelector(".contenedor-titulo-precio>p:nth-child(2)").innerHTML
            item.querySelector(".input-nuevo-nombre").value = tituloRegistro
            item.querySelector(".input-nuevo-valor").value = valorRegistro.substr(1)
        }
    })
}

/**
 * Cambiar el simbolo del tipo del movimiento en el menú de edición del registro 
 * con el id dado.
 * @param {Number} idRegistro el id del registro que tiene el menú de edición 
 * abierto y se le va a cambiar el tipo de movimiento (se cambia el simbolo).
 */
function cambiarTipoMovimientoEnEditor(idRegistro) {
    const botonesDeCambioDeEstado = document.querySelectorAll(".zona-tipo-ingreso")
    botonesDeCambioDeEstado.forEach((boton) => {
        if(boton.getAttribute("data-id")==idRegistro) {
            let imgMenuEdicion = boton.querySelector(".img-estado")
            if(boton.getAttribute("data-ingreso")=="true") {
                //El simbolo es el de "suma verde"
                imgMenuEdicion.classList.replace("img-tipo-movimiento-true","img-tipo-movimiento-false")
                boton.setAttribute("data-ingreso", "false")
            } else {
                //El simbolo es el "menos rojo"
                imgMenuEdicion.classList.replace("img-tipo-movimiento-false","img-tipo-movimiento-true")
                boton.setAttribute("data-ingreso", "true")
            }
        }
    })
}

/**
 * Obtiene el nuevo titulo del movimiento, el cual está en el primer 
 * campo de texto en el menú de edición abierto.
 * @param {Number} idRegistro el id del registro que tiene abierto el 
 * menú de edición.
 * @returns {String} el nuevo titulo del movimiento ingresado por el 
 * usuario.
 */
function obtenerNuevoTituloDelMovimiento(idRegistro) {
    let nuevoTitulo = ""
    const inputsNuevosTitulos = document.querySelectorAll(".input-nuevo-nombre")
    inputsNuevosTitulos.forEach((input) => {
        if(input.getAttribute("data-id")==idRegistro) {
            nuevoTitulo = input.value
        }
    })
    return nuevoTitulo
}

/**
 * Obtiene el nuevo valor del movimiento, el cual está en el segundo 
 * campo de texto en el menú de edición abierto.
 * @param {Number} idRegistro el id del registro que tiene abierto el 
 * menú de edición.
 * @returns {String} el nuevo valor del movimiento.
 */
function obtenerNuevoValorDelMovimiento(idRegistro) {
    let nuevoValor = 0;
    const inputsNuevosValores = document.querySelectorAll(".input-nuevo-valor")
    inputsNuevosValores.forEach((input) => {
        if(input.getAttribute("data-id")==idRegistro) {
            nuevoValor = input.value
        }
    })
    return nuevoValor
}

/**
 * Obtiene el nuevo tipo del movimiento, el cual se determina en el
 * tipo de simbolo del botón ("+", "-") en el menú de edición abierto.
 * @param {Number} idRegistro el id del registro que tiene abierto el 
 * menú de edición.
 * @returns {Boolean} si es un ingreso retorna true, y si es un egreso 
 * retorna false.
 */
function obtenerNuevoTipoDelMovimiento(idRegistro) {
    let txtEsIngreso = ""
    const menusDeEdicion = document.querySelectorAll(".editor-de-registro")
    menusDeEdicion.forEach((capa) => {
        if(capa.getAttribute("data-id")==idRegistro) {
            txtEsIngreso = capa.querySelector(".zona-tipo-ingreso").getAttribute("data-ingreso")
        }
    })
    if(txtEsIngreso=="true") {
        return true
    } else {
        return false
    }
}

/**
 * Muestra el mensaje de error dado en el menú editor que esté abierto.
 * @param {String} mensajeDeError el mensaje de error que se va a mostrar
 * en el menú creador del 
 */
function mostrarMsgError2(mensajeDeError) {
    let txtBusqueda = `.editor-de-registro[data-id='${elMenuDeEdicionEstaAbiertoEn}']`
    let menuEditor = document.querySelector(txtBusqueda)
    let lineaTxtMsgError = menuEditor.querySelector(".txtErrorCamposEdicion")
    lineaTxtMsgError.innerHTML = mensajeDeError
    lineaTxtMsgError.style = "opacity: 100%;"
    setTimeout(() => {
        lineaTxtMsgError.style = "opacity: 0%;"
    }, 3000);
}

/**
 * Actualiza el titulo y valor de un registro.
 * @param {String} nuevoTitulo el nuevo titulo que tendrá el movimiento.
 * @param {Number} nuevoValor el nuevo valor.
 * @param {Boolean} esIngreso si el nuevo movimiento es ingreso esto es true y
 * si es un egreso en un false.
 * @param {Number} idRegistro el id del registro a modificar.
 */
function actualizarRegistroDePantalla(nuevoTitulo, nuevoValor, esIngreso, idRegistro) {
    const txtBusqueda = `.item-registro[data-id='${elMenuDeEdicionEstaAbiertoEn}']`
    const itemRegistro = document.querySelector(txtBusqueda)
    
    //Actualizar el saldo en pantalla elMovimientoEraUnIngreso
    const txtValorAnteriorDelMovimiento = itemRegistro.querySelector(".contenedor-titulo-precio>p:nth-child(2)").innerHTML.substr(1)
    let valorAnteriorDelMovimiento = Number.parseInt(txtValorAnteriorDelMovimiento)
    const claseImgMovimiento = itemRegistro.querySelector(".contenedor-registro>img").classList.item(0)
    nuevoValor = Number.parseInt(nuevoValor)
    if(claseImgMovimiento=="img-adicion") {
        reajustarSaldoDePantalla(nuevoValor, valorAnteriorDelMovimiento, true)
    } else {
        reajustarSaldoDePantalla(nuevoValor, valorAnteriorDelMovimiento, false)
    }
    
    //Cambiar el titulo y el valor del registro
    itemRegistro.querySelector(".contenedor-titulo-precio>p:nth-child(1)").innerHTML = nuevoTitulo
    itemRegistro.querySelector(".contenedor-titulo-precio>p:nth-child(2)").innerHTML = "$"+nuevoValor
    if(esIngreso) {
        itemRegistro.querySelector(".contenedor-registro>img").classList.replace("img-substraccion", "img-adicion")
    } else {
        itemRegistro.querySelector(".contenedor-registro>img").classList.replace("img-adicion", "img-substraccion")
    }
}

/**
 * Muestra una capa encima del item del registro especificado 
 * con el id. La capa son opciones para borrar el item de 
 * registro.
 * @param {Number} idRegistro El id del registro que está 
 * en la pantalla.
 */
function mostrarEliminadorDeRegistro(idRegistro) {
    if(elMenuDeEliminacionEstaAbiertoEn!=0) {
        ocultarEliminadorDeRegistro(elMenuDeEliminacionEstaAbiertoEn)
    }
    elMenuDeEliminacionEstaAbiertoEn = idRegistro
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

/**
 * Oculta el menú de opciones para borrar registros, el cual está 
 * abierto en alguno de los registros de la pantalla.
 * @param {Number} idRegistro 
 */
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
    elMenuDeEliminacionEstaAbiertoEn = 0
}

/**
 * Borra un registro de pantalla (se quita)
 * @param {Number} idRegistro 
 */
function eliminarRegistroDePantalla(idRegistro) {
    const registros = document.querySelectorAll(".item-registro")
    registros.forEach((itemRegistro)=>{
        if(itemRegistro.getAttribute("data-id")==idRegistro) {
            itemRegistro.remove()
        }
    })
}