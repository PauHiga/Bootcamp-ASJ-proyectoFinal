/*modeloProveedoresHardcoded = [
    {
        "codigo": 1,
        "razonSocial": "proveedores SRL",
        "rubro": "alimentos",
        "sitioWeb": "www.proveedoresSRL.com",
        "email": "proveedores@provedoresSRL.com",
        "telefono": "11-5613-4806",
        "calle": "La plata",
        "altura": "45",
        "CP": "1550",
        "localidad": "Las Parejas",
        "provincia": "San Juan",
        "pais": "Argentina",
        "CUIT": "30-67006116-5",
        "condicionIVA": "IVA inscripto",
        "nombreContacto": "Juan",
        "apellidoContacto": "Perez",
        "telefonoContacto": "15-5560-1567",
        "emailContacto": "juanP@provedoresSRL.com",
        "rolContacto": "ventas"
    },
    {
        "codigo": 2,
        "razonSocial": "Otra Empresa SRL",
        "rubro": "tecnología",
        "sitioWeb": "www.otraempresaSRL.com",
        "email": "info@otraempresaSRL.com",
        "telefono": "11-1234-5678",
        "calle": "Bolivar",
        "altura": "28",
        "CP": "1600",
        "localidad": "Buenos Aires",
        "provincia": "Buenos Aires",
        "pais": "Argentina",
        "CUIT": "30-12345678-9",
        "condicionIVA": "IVA exento",
        "nombreContacto": "Maria",
        "apellidoContacto": "Gomez",
        "telefonoContacto": "15-9876-5432",
        "emailContacto": "mariaG@otraempresaSRL.com",
        "rolContacto": "compras"
    }
]
*/

//-------------------------------------------------------------------
//--- Llenar la tabla de proveedores

function fillTablaProveedores() {
    let proveedores = localStorage.getItem("proveedores")

    const tablaProveedores = document.getElementById("tabla-proveedores")

    if(proveedores != null){
        proveedores = JSON.parse(proveedores)
        for (proveedor of proveedores){
            const tr = document.createElement("tr");
            const tdCodigo = document.createElement("td");
            const tdRazon = document.createElement("td");
            const tdRubro = document.createElement("td");
            const tdOpciones = document.createElement("td");
            
            const codigo = proveedor.codigo

            const botonEliminar = document.createElement("button");
            botonEliminar.innerText = "Eliminar";
            botonEliminar.classList.add("btn");
            botonEliminar.classList.add("btn-secondary");
            botonEliminar.addEventListener("click", ()=> eliminar(codigo));
            
            const botonEditar = document.createElement("a");
            botonEditar.innerText = "Editar";
            botonEditar.classList.add("btn");
            botonEditar.classList.add("btn-primary");
            botonEditar.setAttribute("data-toggle", "modal");
            botonEditar.setAttribute("data-target", "#editarProveedorModal");
            botonEditar.addEventListener("click", ()=> editarProveedor(codigo));
            
            tdCodigo.innerText = proveedor.codigo;
            tdRazon.innerText = proveedor.razonSocial;
            tdRubro.innerText = proveedor.rubro;
            tdOpciones.appendChild(botonEliminar);
            tdOpciones.appendChild(botonEditar);
            
            tr.appendChild(tdCodigo);
            tr.appendChild(tdRazon);
            tr.appendChild(tdRubro);
            tr.appendChild(tdOpciones);
            //-------------------------------------------------------------------
        
            tablaProveedores.appendChild(tr)
        }
    }
}

fillTablaProveedores()


//-------------------------------------------------------------------
//--- Funcion para eliminar proveedores

function eliminar(codigo){
    let proveedores = JSON.parse(localStorage.getItem("proveedores"))
    let filteredProveedores = proveedores.filter(proveedor => proveedor.codigo !== codigo)
    localStorage.setItem("proveedores", JSON.stringify(filteredProveedores))
    location.href = "./proveedores.html"
}

//-------------------------------------------------------------------
//--- Crear Nuevo Proveedor

const btnCrearProveedor = document.getElementById("add-proveedor")
btnCrearProveedor.addEventListener("click", addProveedor);

function addProveedor(codigoParaEditar){

    //--- Obtengo el localStorage actual
    let proveedores = localStorage.getItem("proveedores")
    if(proveedores != null){
        proveedores = JSON.parse(proveedores)
    } else {
        proveedores = []
    }


    let codigo = codigoParaEditar

    if(typeof codigo != Number){
        //--- Para añadir el codigo automaticamente: Creo un registro aparte de codigos
        let ultimoCodigo = localStorage.getItem("codigoProveedores")
        if(ultimoCodigo == null){
            ultimoCodigo = 0;
        }
        codigo = Number(ultimoCodigo) + 1
        localStorage.setItem("codigoProveedores", codigo)
    }



    //--- Obtengo los datos del formulario
    const razonSocial = document.getElementById("inputRazonSocial").value
    const rubro = document.getElementById("inputRubro").value
    const email = document.getElementById("inputEmail").value
    const telefono = document.getElementById("inputTelefono").value
    const web = document.getElementById("inputWeb").value
    const calle = document.getElementById("inputCalle").value
    const altura = document.getElementById("inputAltura").value
    const codigoPostal = document.getElementById("inputCP").value
    const provincia = document.getElementById("inputProvincia").value
    const localidad = document.getElementById("inputLocalidad").value
    const pais = document.getElementById("inputPais").value
    const cuit = document.getElementById("inputCUIT").value
    const condicionIVA = document.getElementById("inputCondicionIVA").value
    const nombreContacto = document.getElementById("inputNombreContacto").value
    const apellidoContacto = document.getElementById("inputApellidoContacto").value
    const telefonoContacto = document.getElementById("inputTelefonoContacto").value
    const emailContacto = document.getElementById("inputEmailContacto").value
    const rolContacto = document.getElementById("inputRolContacto").value

    const datosProveedor = {
        codigo: codigo,
        razonSocial: razonSocial,
        rubro: rubro,
        email: email,
        telefono: telefono,
        web: web,
        calle: calle,
        altura: altura,
        codigoPostal: codigoPostal,
        provincia: provincia,
        localidad: localidad,
        pais: pais,
        cuit: cuit,
        condicionIVA: condicionIVA,
        nombreContacto: nombreContacto,
        apellidoContacto: apellidoContacto,
        telefonoContacto: telefonoContacto,
        emailContacto: emailContacto,
        rolContacto: rolContacto
    };

    proveedores.push(datosProveedor)

    localStorage.setItem("proveedores", JSON.stringify(proveedores))

    location.href = "./proveedores.html"
}


//-------------------------------------------------------------------
//--- Editar proveedores



function editarProveedor(codigoAModificar) {
    //-- Obtengo la lista de proveedores y filtro el que me interesa

    let proveedores = JSON.parse(localStorage.getItem("proveedores"))

    let proveedorAModificar = proveedores.filter(proveedor => proveedor.codigo == codigoAModificar)[0]
    console.log(proveedorAModificar);


    //Seteo el value de cada elemento del formulario según el proveedor a modificar

    let codigo = document.getElementById("inputCodigoEditar")
    codigo.value = codigoAModificar;
    let razonSocial = document.getElementById("inputRazonSocialEditar")
    razonSocial.value = proveedorAModificar.razonSocial
    let rubro = document.getElementById("inputRubroEditar")
    rubro.value = proveedorAModificar.rubro;
    let email = document.getElementById("inputEmailEditar")
    email.value = proveedorAModificar.email;
    let telefono = document.getElementById("inputTelefonoEditar")
    telefono.value = proveedorAModificar.telefono
    let web = document.getElementById("inputWebEditar")
    web.value = proveedorAModificar.web
    let calle = document.getElementById("inputCalleEditar")
    calle.value = proveedorAModificar.calle
    let altura = document.getElementById("inputAlturaEditar")
    altura.value = proveedorAModificar.altura
    let codigoPostal = document.getElementById("inputCPEditar")
    codigoPostal.value = proveedorAModificar.codigoPostal
    let provincia = document.getElementById("inputProvinciaEditar")
    provincia.value = proveedorAModificar.provincia
    let localidad = document.getElementById("inputLocalidadEditar")
    localidad.value = proveedorAModificar.localidad
    let pais = document.getElementById("inputPaisEditar")
    pais.value = proveedorAModificar.pais
    let cuit = document.getElementById("inputCUITEditar")
    cuit.value = proveedorAModificar.cuit
    let condicionIVA = document.getElementById("inputCondicionIVAEditar")
    condicionIVA.value = proveedorAModificar.condicionIVA
    let nombreContacto = document.getElementById("inputNombreContactoEditar")
    nombreContacto.value = proveedorAModificar.nombreContacto
    let apellidoContacto = document.getElementById("inputApellidoContactoEditar")
    apellidoContacto.value = proveedorAModificar.apellidoContacto
    let telefonoContacto = document.getElementById("inputTelefonoContactoEditar")
    telefonoContacto.value = proveedorAModificar.telefonoContacto
    let emailContacto = document.getElementById("inputEmailContactoEditar")
    emailContacto.value = proveedorAModificar.emailContacto
    let rolContacto = document.getElementById("inputRolContactoEditar")
    rolContacto.value = proveedorAModificar.rolContacto
    
    let btnEditarProveedor = document.getElementById("edit-proveedor")
    btnEditarProveedor.addEventListener("click", ()=> actualizarProveedores(codigoAModificar));
    

}


function actualizarProveedores (codigoAModificar){

    //-- Obtengo la lista de proveedores y remuevo la version vieja

    let proveedores = JSON.parse(localStorage.getItem("proveedores"))

    let todosLosProveedoresMenosElViejo = proveedores.filter(proveedor => proveedor.codigo != codigoAModificar)


    //--- Obtengo los datos del formulario
    const razonSocial = document.getElementById("inputRazonSocialEditar").value
    const rubro = document.getElementById("inputRubroEditar").value
    const email = document.getElementById("inputEmailEditar").value
    const telefono = document.getElementById("inputTelefonoEditar").value
    const web = document.getElementById("inputWebEditar").value
    const calle = document.getElementById("inputCalleEditar").value
    const altura = document.getElementById("inputAlturaEditar").value
    const codigoPostal = document.getElementById("inputCPEditar").value
    const provincia = document.getElementById("inputProvinciaEditar").value
    const localidad = document.getElementById("inputLocalidadEditar").value
    const pais = document.getElementById("inputPaisEditar").value
    const cuit = document.getElementById("inputCUITEditar").value
    const condicionIVA = document.getElementById("inputCondicionIVAEditar").value
    const nombreContacto = document.getElementById("inputNombreContactoEditar").value
    const apellidoContacto = document.getElementById("inputApellidoContactoEditar").value
    const telefonoContacto = document.getElementById("inputTelefonoContactoEditar").value
    const emailContacto = document.getElementById("inputEmailContactoEditar").value
    const rolContacto = document.getElementById("inputRolContactoEditar").value

    const datosProveedor = {
        codigo: codigoAModificar,
        razonSocial: razonSocial,
        rubro: rubro,
        email: email,
        telefono: telefono,
        web: web,
        calle: calle,
        altura: altura,
        codigoPostal: codigoPostal,
        provincia: provincia,
        localidad: localidad,
        pais: pais,
        cuit: cuit,
        condicionIVA: condicionIVA,
        nombreContacto: nombreContacto,
        apellidoContacto: apellidoContacto,
        telefonoContacto: telefonoContacto,
        emailContacto: emailContacto,
        rolContacto: rolContacto
    };

    console.log(datosProveedor);
    
    todosLosProveedoresMenosElViejo.push(datosProveedor)
    
    console.log(todosLosProveedoresMenosElViejo);

    localStorage.setItem("proveedores", JSON.stringify(todosLosProveedoresMenosElViejo))
    
    location.href = "./proveedores.html"
}