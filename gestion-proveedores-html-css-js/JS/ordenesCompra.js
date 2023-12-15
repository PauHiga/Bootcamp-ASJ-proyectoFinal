
//-------------------------------------------------------------------
//--- Llenar la tabla de ordenesCompra

function fillTablaordenesCompra() {
    let ordenesCompra = localStorage.getItem("ordenesCompra")

    const tablaordenesCompra = document.getElementById("tabla-ordenesCompra")

    console.log(tablaordenesCompra);

    if(ordenesCompra != null){
        ordenesCompra = JSON.parse(ordenesCompra)
        for (OrdenCompra of ordenesCompra){
            const tr = document.createElement("tr");
            const tdCodigo = document.createElement("td");
            const tdProveedor = document.createElement("td");
            const tdProducto = document.createElement("td");
            const tdCantidad = document.createElement("td");
            const tdFechaEntrega = document.createElement("td");
            const tdTotal = document.createElement("td");
            const tdEstado = document.createElement("td");
            const tdOpciones = document.createElement("td");
            
            const codigo = OrdenCompra.codigo
            
            const botonEliminar = document.createElement("button");
            botonEliminar.innerText = "Eliminar";
            botonEliminar.classList.add("btn");
            botonEliminar.classList.add("btn-secondary");
            botonEliminar.addEventListener("click", ()=> eliminar(codigo));
            
            // const botonEditar = document.createElement("a");
            // botonEditar.innerText = "Editar";
            // botonEditar.classList.add("btn");
            // botonEditar.classList.add("btn-primary");
            // botonEditar.setAttribute("data-toggle", "modal");
            // botonEditar.setAttribute("data-target", "#editarOrdenCompraModal");
            // botonEditar.addEventListener("click", ()=> editarOrdenCompra(codigo));
            
            tdCodigo.innerText = OrdenCompra.codigo;
            tdProveedor.innerText = OrdenCompra.proveedor;
            tdProducto.innerText = OrdenCompra.producto;
            tdCantidad.innerText = OrdenCompra.cantidad;
            tdFechaEntrega.innerText = OrdenCompra.fechaEntrega;
            tdTotal.innerText = OrdenCompra.proveedor;
            tdEstado.innerText = OrdenCompra.estado;
            tdOpciones.appendChild(botonEliminar);
            // tdOpciones.appendChild(botonEditar);
            
            tr.appendChild(tdCodigo);
            tr.appendChild(tdProveedor);
            tr.appendChild(tdProducto);
            tr.appendChild(tdCantidad);
            tr.appendChild(tdFechaEntrega);
            tr.appendChild(tdTotal);
            tr.appendChild(tdEstado);
            tr.appendChild(tdOpciones);
            //-------------------------------------------------------------------
        
            tablaordenesCompra.appendChild(tr)
        }
    }
}

fillTablaordenesCompra()


//-------------------------------------------------------------------
//--- Funcion para eliminar ordenesCompra

function eliminar(codigo){
    let ordenesCompra = JSON.parse(localStorage.getItem("ordenesCompra"))
    let filteredordenesCompra = ordenesCompra.filter(OrdenCompra => OrdenCompra.codigo !== codigo)
    localStorage.setItem("ordenesCompra", JSON.stringify(filteredordenesCompra))
    location.href = "./OrdenesDeCompra.html"
}

//-------------------------------------------------------------------
//--- Crear Nuevo OrdenCompra

const btnCrearOrdenCompra = document.getElementById("add-OrdenCompra")
btnCrearOrdenCompra.addEventListener("click", addOrdenCompra);

function addOrdenCompra(codigoParaEditar){
    //--- Obtengo el localStorage actual
    let ordenesCompra = localStorage.getItem("ordenesCompra")
    if(ordenesCompra != null){
        ordenesCompra = JSON.parse(ordenesCompra)
    } else {
        ordenesCompra = []
    }
    
    
    let codigo = codigoParaEditar
    
    if(typeof codigo != Number){
        //--- Para añadir el codigo automaticamente: Creo un registro aparte de codigos
        let ultimoCodigo = localStorage.getItem("codigoordenesCompra")
        if(ultimoCodigo == null){
            ultimoCodigo = 0;
        }
        codigo = Number(ultimoCodigo) + 1
        localStorage.setItem("codigoordenesCompra", codigo)
    }
    

    //--- Obtengo los datos del formulario
    const fechaEmision = document.getElementById("inputFechaEmision").value
    const fechaEntrega = document.getElementById("inputFechaEntrega").value
    const direccionRecepcion = document.getElementById("inputDireccionRecepcion").value
    const proveedor = document.getElementById("inputProveedor").value
    const producto = document.getElementById("inputProducto").value
    const cantidad = document.getElementById("inputCantidad").value
    const estado = document.getElementById("inputEstado").value
    

    const datosOrdenCompra = {
        codigo: codigo,
        fechaEmision: fechaEmision,
        fechaEntrega: fechaEntrega,
        direccionRecepcion: direccionRecepcion,
        proveedor: proveedor,
        producto: producto,
        cantidad: cantidad,
        estado: estado,
    };

    console.log(datosOrdenCompra);

    ordenesCompra.push(datosOrdenCompra)

    localStorage.setItem("ordenesCompra", JSON.stringify(ordenesCompra))

    location.href = "./OrdenesDeCompra.html"
}

/*
//-------------------------------------------------------------------
//--- Editar ordenesCompra


function editarOrdenCompra(codigoAModificar) {
    //-- Obtengo la lista de ordenesCompra y filtro el que me interesa

    let ordenesCompra = JSON.parse(localStorage.getItem("ordenesCompra"))
    console.log(ordenesCompra);
    let OrdenCompraAModificar = ordenesCompra.filter(OrdenCompra => OrdenCompra.codigo == codigoAModificar)[0]

    //Seteo el value de cada elemento del formulario según el OrdenCompra a modificar

    const codigo = document.getElementById("inputCodigoEditar")
    codigo.value = codigoAModificar;
    const razonSocial = document.getElementById("inputRazonSocialEditar")
    razonSocial.value = OrdenCompraAModificar.razonSocial
    const rubro = document.getElementById("inputRubroEditar")
    rubro.value = OrdenCompraAModificar.rubro;
    const email = document.getElementById("inputEmailEditar")
    email.value = OrdenCompraAModificar.email;
    const telefono = document.getElementById("inputTelefonoEditar")
    telefono.value = OrdenCompraAModificar.telefono
    const web = document.getElementById("inputWebEditar")
    web.value = OrdenCompraAModificar.web
    const calle = document.getElementById("inputCalleEditar")
    calle.value = OrdenCompraAModificar.calle
    const altura = document.getElementById("inputAlturaEditar")
    altura.value = OrdenCompraAModificar.altura
    const codigoPostal = document.getElementById("inputCPEditar")
    codigoPostal.value = OrdenCompraAModificar.codigoPostal
    const provincia = document.getElementById("inputProvinciaEditar")
    provincia.value = OrdenCompraAModificar.provincia
    const localidad = document.getElementById("inputLocalidadEditar")
    localidad.value = OrdenCompraAModificar.localidad
    const pais = document.getElementById("inputPaisEditar")
    pais.value = OrdenCompraAModificar.pais
    const cuit = document.getElementById("inputCUITEditar")
    cuit.value = OrdenCompraAModificar.cuit
    const condicionIVA = document.getElementById("inputCondicionIVAEditar")
    condicionIVA.value = OrdenCompraAModificar.condicionIVA
    const nombreContacto = document.getElementById("inputNombreContactoEditar")
    nombreContacto.value = OrdenCompraAModificar.nombreContacto
    const apellidoContacto = document.getElementById("inputApellidoContactoEditar")
    apellidoContacto.value = OrdenCompraAModificar.apellidoContacto
    const telefonoContacto = document.getElementById("inputTelefonoContactoEditar")
    telefonoContacto.value = OrdenCompraAModificar.telefonoContacto
    const emailContacto = document.getElementById("inputEmailContactoEditar")
    emailContacto.value = OrdenCompraAModificar.emailContacto
    const rolContacto = document.getElementById("inputRolContactoEditar")
    rolContacto.value = OrdenCompraAModificar.rolContacto
    



    // location.href = "./OrdenesDeCompra.html"
}
*/