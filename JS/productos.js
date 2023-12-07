// let productos = [
//     {
//         "codigo": 1,
//         "proveedor": "productos SRL",
//         "categoria": "alimentos",
//         "nombreProducto": "www.productosSRL.com",
//         "descripcion": "11-5613-4806",
//         "precio": "La plata"
//     },
//     {
//         "codigo": 2,
//         "proveedor": "productos SRL",
//         "categoria": "alimentos",
//         "nombreProducto": "www.productosSRL.com",
//         "descripcion": "11-5613-4806",
//         "precio": "La plata"
//     }
// ]


//-------------------------------------------------------------------
//--- Llenar la tabla de productos

let productos = localStorage.getItem("productos")

const tablaProductos = document.getElementById("tabla-productos")

function filltablaProductos() {
    if(productos != null){
        productos = JSON.parse(productos)
        for (producto of productos){
            console.log(producto);
            const tr = document.createElement("tr");
            const tdCodigo = document.createElement("td");
            const tdSKU = document.createElement("td");
            const tdProveedor = document.createElement("td");
            const tdCategoria = document.createElement("td");
            const tdNombreProducto = document.createElement("td");
            const tdPrecio = document.createElement("td");
            const tdOpciones = document.createElement("td");
            
            const codigo = producto.codigo
            
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
            // botonEditar.setAttribute("data-target", "#editarproductoModal");
            // botonEditar.addEventListener("click", ()=> editarproducto(codigo));
            
            tdCodigo.innerText = producto.codigo;
            tdSKU.innerText = producto.SKU;
            tdProveedor.innerText = producto.proveedor;
            tdCategoria.innerText = producto.categoria;
            tdNombreProducto.innerText = producto.nombreProducto;
            tdPrecio.innerText = producto.precio;
            tdOpciones.appendChild(botonEliminar);
            // tdOpciones.appendChild(botonEditar);
            
            tr.appendChild(tdCodigo);
            tr.appendChild(tdSKU);
            tr.appendChild(tdProveedor);
            tr.appendChild(tdCategoria);
            tr.appendChild(tdNombreProducto);
            tr.appendChild(tdPrecio);
            tr.appendChild(tdOpciones);
            //-------------------------------------------------------------------
        
            tablaProductos.appendChild(tr)
        }
    }
}

filltablaProductos()



//-------------------------------------------------------------------
//--- Funcion para eliminar productos

function eliminar(codigo){
    let productos = JSON.parse(localStorage.getItem("productos"))
    let filteredproductos = productos.filter(producto => producto.codigo !== codigo)
    localStorage.setItem("productos", JSON.stringify(filteredproductos))
    location.href = "./productos.html"
}

//-------------------------------------------------------------------
//--- Crear Nuevo producto

const btnCrearproducto = document.getElementById("add-producto")
btnCrearproducto.addEventListener("click", addproducto);

function addproducto(codigoParaEditar){

    //--- Obtengo el localStorage actual
    let productos = localStorage.getItem("productos")
    if(productos != null){
        productos = JSON.parse(productos)
    } else {
        productos = []
    }


    let codigo = codigoParaEditar

    if(typeof codigo != Number){
        //--- Para añadir el codigo automaticamente: Creo un registro aparte de codigos
        let ultimoCodigo = localStorage.getItem("codigoproductos")
        if(ultimoCodigo == null){
            ultimoCodigo = 0;
        }
        codigo = Number(ultimoCodigo) + 1
        localStorage.setItem("codigoproductos", codigo)
    }



    //--- Obtengo los datos del formulario
    const proveedor = document.getElementById("inputProveedor").value
    const categoria = document.getElementById("inputCategoria").value
    const SKU = document.getElementById("inputSKU").value
    const nombreProducto = document.getElementById("inputNombreProducto").value
    const descripcion = document.getElementById("inputDescripcion").value
    const precio = document.getElementById("inputPrecio").value

    const datosproducto = {
        codigo: codigo,
        SKU: SKU,
        proveedor: proveedor,
        categoria: categoria,
        nombreProducto: nombreProducto,
        descripcion: descripcion,
        precio: precio,
    };

    productos.push(datosproducto)

    localStorage.setItem("productos", JSON.stringify(productos))

    location.href = "./productos.html"

}

/*
//-------------------------------------------------------------------
//--- Editar productos


function editarproducto(codigoAModificar) {
    //-- Obtengo la lista de productos y filtro el que me interesa

    let productos = JSON.parse(localStorage.getItem("productos"))
    console.log(productos);
    let productoAModificar = productos.filter(producto => producto.codigo == codigoAModificar)[0]

    //Seteo el value de cada elemento del formulario según el producto a modificar

    const codigo = document.getElementById("inputCodigoEditar")
    codigo.value = codigoAModificar;
    const razonSocial = document.getElementById("inputRazonSocialEditar")
    razonSocial.value = productoAModificar.razonSocial
    const rubro = document.getElementById("inputRubroEditar")
    rubro.value = productoAModificar.rubro;
    const email = document.getElementById("inputEmailEditar")
    email.value = productoAModificar.email;
    const telefono = document.getElementById("inputTelefonoEditar")
    telefono.value = productoAModificar.telefono
    const web = document.getElementById("inputWebEditar")
    web.value = productoAModificar.web
    const calle = document.getElementById("inputCalleEditar")
    calle.value = productoAModificar.calle
    const altura = document.getElementById("inputAlturaEditar")
    altura.value = productoAModificar.altura
    const codigoPostal = document.getElementById("inputCPEditar")
    codigoPostal.value = productoAModificar.codigoPostal
    const provincia = document.getElementById("inputProvinciaEditar")
    provincia.value = productoAModificar.provincia
    const localidad = document.getElementById("inputLocalidadEditar")
    localidad.value = productoAModificar.localidad
    const pais = document.getElementById("inputPaisEditar")
    pais.value = productoAModificar.pais
    const cuit = document.getElementById("inputCUITEditar")
    cuit.value = productoAModificar.cuit
    const condicionIVA = document.getElementById("inputCondicionIVAEditar")
    condicionIVA.value = productoAModificar.condicionIVA
    const nombreContacto = document.getElementById("inputNombreContactoEditar")
    nombreContacto.value = productoAModificar.nombreContacto
    const apellidoContacto = document.getElementById("inputApellidoContactoEditar")
    apellidoContacto.value = productoAModificar.apellidoContacto
    const telefonoContacto = document.getElementById("inputTelefonoContactoEditar")
    telefonoContacto.value = productoAModificar.telefonoContacto
    const emailContacto = document.getElementById("inputEmailContactoEditar")
    emailContacto.value = productoAModificar.emailContacto
    const rolContacto = document.getElementById("inputRolContactoEditar")
    rolContacto.value = productoAModificar.rolContacto
    



    // location.href = "./productos.html"
}

*/