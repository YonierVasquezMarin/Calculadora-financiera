/**
 * Cuando se hace click en alguno de los dos botones grandes para
 * hacer un "Ingreso" o "Egreso".
*/
document.querySelectorAll(".btnsGrandes").forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        desplegarMenuCreador()
        cambiarTipoMovimientoEnPantalla(btn.getAttribute("data-tipo"))
    })
})

/**
 * Al dar click en algun input del menu creador, el mensaje de error 1
 * ("Verifique los campos") se oculta.
 */
document.querySelectorAll(".entrada-menu-creador").forEach((input)=>{
    input.addEventListener("click", ()=>{
        cambiarVisibilidadMsgError1(false)
    })
})

/**
 * Cuando se hace click en el boton de "Añadir" para crear un 
 * nuevo registro.
 */
document.querySelector("#btnAddRegister").addEventListener("click", ()=> {
    let tituloMovimiento = obtenerTituloMovimientoACrear()
    let valorMovimiento = Number.parseInt(obtenerValorMovimientoACrear())
    if(losDatosDelMovimientoEstanFull(tituloMovimiento, valorMovimiento)) {
        let nuevoId = generarId()
        let esIngreso = elMovimientoACrearEsIngreso()
        crearRegistro(tituloMovimiento, valorMovimiento, esIngreso, nuevoId)
        mostrarRegistroEnPantalla(tituloMovimiento, valorMovimiento, esIngreso, nuevoId)
    } else {
        cambiarVisibilidadMsgError1(true)
    }
})

/**
 * Cuando se hace click en el botón de la flecha hacía arriba, para 
 * ocultar el menu creador.
 */
document.querySelector("#btnOcultarMenuCreador").addEventListener("click", ()=> {
    ocultarMenuCreador()
})

/**
 * Cuando se agrega un nuevo hijo al lista-registros aquí es detectado,
 * y se le agrega a cada boton su escuchador de eventos
 */
const observer = new MutationObserver((mutationList)=>{
    mutationList.forEach(mutation=>{
        try {
            const itemRegistro = mutation.addedNodes[0]
            const idItemRegistro = itemRegistro.getAttribute("data-id")
            /**
             * Para cuando se hace click en el botón de editar registro
             */
            itemRegistro.querySelector(".btnEditar").addEventListener("click", () => {
                mostrarEditorDeRegistro(idItemRegistro)
            })
            /**
             * Para cuando en el menú de edición se cambia el tipo de movimiento
             */
            itemRegistro.querySelector(".zona-tipo-ingreso").addEventListener("click", () => {
                cambiarTipoMovimientoEnEditor(idItemRegistro)
            })
            /**
             * Para cuando se hace click en el botón de actualizar el registro en el 
             * menú de edición.
             */
            itemRegistro.querySelector(".btnActualizar").addEventListener("click", () => {
                let nuevoTitulo = obtenerNuevoTituloDelMovimiento(idItemRegistro)
                let nuevoValor =  obtenerNuevoValorDelMovimiento(idItemRegistro)
                let losDatosEstanCompletos = losDatosDelMovimientoEstanFull(nuevoTitulo,nuevoValor)
                if(losDatosEstanCompletos) {
                    let nNuevoValor = Number.parseInt(nuevoValor)
                    let esIngreso = obtenerNuevoTipoDelMovimiento(idItemRegistro)
                    if(nNuevoValor>0) {
                        actualizarRegistroDePantalla(nuevoTitulo, nuevoValor, esIngreso, idItemRegistro)
                        actualizarRegistro(nuevoTitulo, nuevoValor, esIngreso, idItemRegistro)
                        ocultarEditorDeRegistro(idItemRegistro)
                        restaurarEditorDeRegistro(idItemRegistro)
                    } else {
                        //El nuevo valor ingresado es cero o negativo
                        mostrarMsgError2("El valor debe ser mayor a 0")
                    }
                } else {
                    //Alguno o los dos campos están vacíos
                    mostrarMsgError2("Llene todos los campos")
                }
            })
            /**
             * Para cuando se hace click en el botón de cerrar el menú de 
             * edición.
             */
            itemRegistro.querySelector(".btnCancelar").addEventListener("click", () => {
                ocultarEditorDeRegistro(idItemRegistro)
                restaurarEditorDeRegistro(idItemRegistro)
            })
            /**
             * Para cuando se hace click en el bote de basura
             */
            itemRegistro.querySelector(".btnMostrarOpcionesDeEliminado").addEventListener("click", ()=>{
                mostrarEliminadorDeRegistro(idItemRegistro)
            })
            /**
             * Para cuando se hace click en el boton de borrar registro
             */
            itemRegistro.querySelector(".btnBorrarRegistro").addEventListener("click", ()=>{
                const elRegistroEraIngreso = elMovimientoRegistradoEsIngreso()
                let valorDelMovimiento = obtenerValorDelMovimientoRegistrado()
                if(elRegistroEraIngreso) {
                    valorDelMovimiento = -valorDelMovimiento
                }
                modificarSaldoDePantalla(valorDelMovimiento)
                ocultarEliminadorDeRegistro(idItemRegistro)
                eliminarRegistroDePantalla(idItemRegistro)
                borrarRegistro(idItemRegistro)
            })
            /**
             * Para cuando se hace click en boton de cancelar borrado
             */
            itemRegistro.querySelector(".btnCancelarBorrado").addEventListener("click", ()=>{
                ocultarEliminadorDeRegistro(idItemRegistro)
            })
        } catch(TypeError) {
            //Algún elemento fue borrado
        }
        
    })
})
const listaDeRegistros = document.querySelector("#lista-registros")
const observerOptions = {
    childList:true
}
observer.observe(listaDeRegistros,observerOptions)

/**
 * Cargar todos los registros guardados en localStorage
 */
let itemsRegistros = obtenerTodosLosRegistros()
for(let i=0;i<itemsRegistros.length;i++) {
    let registro = itemsRegistros[i]
    let titulo = registro["titulo"]
    let valor = registro["valor"]
    let esIngreso = registro["esIngreso"]
    let id = registro["id"]
    mostrarRegistroEnPantalla(titulo, valor, esIngreso, id)
}