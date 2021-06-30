/* Cuando se hace click en alguno de los dos botones grandes para
hacer un "Ingreso" o "Egreso" */
document.querySelectorAll(".btnsGrandes").forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        desplegarMenuCreador()
        cambiarTipoMovimientoEnPantalla(btn.getAttribute("data-tipo"))
    })
})


document.querySelectorAll(".entrada-menu-creador").forEach((input)=>{
    input.addEventListener("click", ()=>{
        cambiarVisibilidadMsgError1(false)
    })
})

/* Cuando se hace click en el boton de "Añadir" para crear un 
nuevo registro */
document.querySelector("#btnAddRegister").addEventListener("click", ()=> {
    let tituloMovimiento = obtenerTituloMovimientoACrear()
    let valorMovimiento = obtenerValorMovimientoACrear()
    if(losDatosDelMovimientoEstanFull(tituloMovimiento, valorMovimiento)) {
        //Aquí se guarda en memoria el registro
        //Aquí se muestra un nuevo registro en pantalla
    } else {
        cambiarVisibilidadMsgError1(true)
    }
})

/* Cuando se hace click en el botón de la flecha hacía arriba, para 
ocultar el menu creador */
document.querySelector("#btnOcultarMenuCreador").addEventListener("click", ()=> {
    ocultarMenuCreador()
})