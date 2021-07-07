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
    let valorMovimiento = obtenerValorMovimientoACrear()
    if(losDatosDelMovimientoEstanFull(tituloMovimiento, valorMovimiento)) {
        //Aqui se usa "generarId()"
        //Aquí se guarda en memoria el registro y se debe usar el id generado por la funcion anterior
        let esIngreso = elMovimientoACrearEsIngreso()
        mostrarRegistroEnPantalla(tituloMovimiento, valorMovimiento, esIngreso, 0)
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
        const itemRegistro = mutation.addedNodes[0]
        const idItemRegistro = itemRegistro.getAttribute("data-id")
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
            eliminarRegistroDePantalla(idItemRegistro)
        })
        /**
         * Para cuando se hace click en boton de cancelar borrado
         */
        itemRegistro.querySelector(".btnCancelarBorrado").addEventListener("click", ()=>{
            ocultarEliminadorDeRegistro(idItemRegistro)
        })
    })
})
const listaDeRegistros = document.querySelector("#lista-registros")
const observerOptions = {
    childList:true
}
observer.observe(listaDeRegistros,observerOptions)


//Cargar todos los registros en pantalla
//TEST
mostrarRegistroEnPantalla("Factura energia",52000,false,1)
mostrarRegistroEnPantalla("Salario",250000,true,2)
mostrarRegistroEnPantalla("Factura internet",47000,false,3)
mostrarRegistroEnPantalla("Tienda sillas de escritorio",300000,true,4)
//TEST