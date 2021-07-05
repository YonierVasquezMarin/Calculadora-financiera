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
        //Aquí se guarda en memoria el registro
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
 * Cuando se hace click en cualquier icono de bote de basura de 
 * cualquier item de registro.
 */
document.querySelectorAll(".btnEliminar").forEach((btnEliminar)=>{
    btnEliminar.addEventListener("click", (event)=>{
        let idItemRegistro = event.currentTarget.getAttribute("data-id")
        mostrarEliminadorDeRegistro(idItemRegistro)
    })
})