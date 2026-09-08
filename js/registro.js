const regiones = [

    {
        nombre: "Región Metropolitana",
        comunas: [
            "Santiago",
            "San Miguel",
            "Providencia",
            "Las Condes",
            "La Florida",
            "Maipú",
            "Puente Alto"
        ]
    },

    {
        nombre: "Región de Valparaíso",
        comunas: [
            "Valparaíso",
            "Viña del Mar",
            "Quilpué",
            "Villa Alemana"
        ]
    },

    {
        nombre: "Región del Biobío",
        comunas: [
            "Concepción",
            "Talcahuano",
            "Chiguayante",
            "San Pedro de la Paz"
        ]
    }

];


const formulario =
    document.getElementById("formRegistro");

const run =
    document.getElementById("run");

const nombre =
    document.getElementById("nombre");

const apellido =
    document.getElementById("apellido");

const correo =
    document.getElementById("correo");

const password =
    document.getElementById("password");

const confirmarPassword =
    document.getElementById("confirmarPassword");

const fechaNacimiento =
    document.getElementById("fechaNacimiento");

const region =
    document.getElementById("region");

const comuna =
    document.getElementById("comuna");

const direccion =
    document.getElementById("direccion");

const mensajeRegistro =
    document.getElementById("mensajeRegistro");


function obtenerUsuarios() {

    try {

        const datos =
            localStorage.getItem(
                "usuariosAdmin"
            );

        if (!datos) {
            return [];
        }

        const usuarios =
            JSON.parse(datos);

        if (Array.isArray(usuarios)) {
            return usuarios;
        }

        return [];

    } catch (error) {

        return [];
    }
}


function mostrarError(
    campo,
    errorId,
    mensaje
) {

    const elementoError =
        document.getElementById(
            errorId
        );


    if (elementoError) {

        elementoError.textContent =
            mensaje;
    }


    campo.classList.remove(
        "campo-correcto"
    );


    campo.classList.add(
        "campo-error"
    );
}


function mostrarCorrecto(
    campo,
    errorId
) {

    const elementoError =
        document.getElementById(
            errorId
        );


    if (elementoError) {

        elementoError.textContent = "";
    }


    campo.classList.remove(
        "campo-error"
    );


    campo.classList.add(
        "campo-correcto"
    );
}


function limpiarEstado(
    campo,
    errorId
) {

    const elementoError =
        document.getElementById(
            errorId
        );


    if (elementoError) {

        elementoError.textContent = "";
    }


    campo.classList.remove(
        "campo-error",
        "campo-correcto"
    );
}


function cargarRegiones() {

    regiones.forEach(
        function(item, indice) {

            const opcion =
                document.createElement(
                    "option"
                );


            opcion.value =
                indice;


            opcion.textContent =
                item.nombre;


            region.appendChild(
                opcion
            );
        }
    );
}


function cargarComunas() {

    comuna.innerHTML = "";


    if (region.value === "") {

        comuna.disabled = true;


        comuna.innerHTML = `
            <option value="">
                Primero selecciona una región
            </option>
        `;


        return;
    }


    comuna.disabled = false;


    const opcionInicial =
        document.createElement(
            "option"
        );


    opcionInicial.value = "";

    opcionInicial.textContent =
        "Selecciona una comuna";


    comuna.appendChild(
        opcionInicial
    );


    const regionSeleccionada =
        regiones[
            Number(region.value)
        ];


    regionSeleccionada.comunas.forEach(
        function(nombreComuna) {

            const opcion =
                document.createElement(
                    "option"
                );


            opcion.value =
                nombreComuna;


            opcion.textContent =
                nombreComuna;


            comuna.appendChild(
                opcion
            );
        }
    );
}


function validarDominioCorreo(email) {

    const valor =
        email.toLowerCase();


    return (
        valor.endsWith("@duoc.cl") ||
        valor.endsWith("@profesor.duoc.cl") ||
        valor.endsWith("@gmail.com")
    );
}


function limpiarRun(valor) {

    return valor
        .replace(/\./g, "")
        .replace(/-/g, "")
        .trim()
        .toUpperCase();
}


function validarRunChileno(valor) {

    const runLimpio =
        limpiarRun(valor);


    if (
        !/^[0-9]{7,8}[0-9K]$/.test(
            runLimpio
        )
    ) {

        return false;
    }


    const cuerpo =
        runLimpio.slice(0, -1);

    const digitoIngresado =
        runLimpio.slice(-1);


    let suma = 0;

    let multiplicador = 2;


    for (
        let i = cuerpo.length - 1;
        i >= 0;
        i--
    ) {

        suma +=
            Number(cuerpo[i]) *
            multiplicador;


        multiplicador++;


        if (multiplicador === 8) {

            multiplicador = 2;
        }
    }


    const resto =
        11 - (suma % 11);


    let digitoCalculado = "";


    if (resto === 11) {

        digitoCalculado = "0";

    } else if (resto === 10) {

        digitoCalculado = "K";

    } else {

        digitoCalculado =
            String(resto);
    }


    return (
        digitoCalculado ===
        digitoIngresado
    );
}


function validarRun() {

    const valor =
        limpiarRun(
            run.value
        );


    run.value =
        valor;


    if (valor === "") {

        mostrarError(
            run,
            "errorRun",
            "El RUN es obligatorio."
        );

        return false;
    }


    if (
        valor.length < 7 ||
        valor.length > 9
    ) {

        mostrarError(
            run,
            "errorRun",
            "El RUN debe tener entre 7 y 9 caracteres."
        );

        return false;
    }


    if (
        valor.includes(".") ||
        valor.includes("-")
    ) {

        mostrarError(
            run,
            "errorRun",
            "Ingresa el RUN sin puntos ni guion."
        );

        return false;
    }


    if (!validarRunChileno(valor)) {

        mostrarError(
            run,
            "errorRun",
            "El RUN ingresado no es válido."
        );

        return false;
    }


    const usuarios =
        obtenerUsuarios();


    const existe =
        usuarios.some(
            function(usuario) {

                return (
                    limpiarRun(
                        String(
                            usuario.run || ""
                        )
                    ) ===
                    valor
                );
            }
        );


    if (existe) {

        mostrarError(
            run,
            "errorRun",
            "Este RUN ya se encuentra registrado."
        );

        return false;
    }


    mostrarCorrecto(
        run,
        "errorRun"
    );


    return true;
}


function validarNombre() {

    const valor =
        nombre.value.trim();


    if (valor === "") {

        mostrarError(
            nombre,
            "errorNombre",
            "El nombre es obligatorio."
        );

        return false;
    }


    if (valor.length > 50) {

        mostrarError(
            nombre,
            "errorNombre",
            "El nombre no puede superar los 50 caracteres."
        );

        return false;
    }


    mostrarCorrecto(
        nombre,
        "errorNombre"
    );


    return true;
}


function validarApellido() {

    const valor =
        apellido.value.trim();


    if (valor === "") {

        mostrarError(
            apellido,
            "errorApellido",
            "Los apellidos son obligatorios."
        );

        return false;
    }


    if (valor.length > 100) {

        mostrarError(
            apellido,
            "errorApellido",
            "Los apellidos no pueden superar los 100 caracteres."
        );

        return false;
    }


    mostrarCorrecto(
        apellido,
        "errorApellido"
    );


    return true;
}


function validarCorreo() {

    const valor =
        correo.value
            .trim()
            .toLowerCase();


    if (valor === "") {

        mostrarError(
            correo,
            "errorCorreo",
            "El correo electrónico es obligatorio."
        );

        return false;
    }


    if (valor.length > 100) {

        mostrarError(
            correo,
            "errorCorreo",
            "El correo no puede superar los 100 caracteres."
        );

        return false;
    }


    if (!validarDominioCorreo(valor)) {

        mostrarError(
            correo,
            "errorCorreo",
            "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."
        );

        return false;
    }


    const usuarios =
        obtenerUsuarios();


    const existe =
        usuarios.some(
            function(usuario) {

                return (
                    String(
                        usuario.correo || ""
                    ).toLowerCase() ===
                    valor
                );
            }
        );


    if (existe) {

        mostrarError(
            correo,
            "errorCorreo",
            "Este correo ya se encuentra registrado."
        );

        return false;
    }


    mostrarCorrecto(
        correo,
        "errorCorreo"
    );


    return true;
}


function validarPassword() {

    const valor =
        password.value;


    if (valor === "") {

        mostrarError(
            password,
            "errorPassword",
            "La contraseña es obligatoria."
        );

        return false;
    }


    if (
        valor.length < 4 ||
        valor.length > 10
    ) {

        mostrarError(
            password,
            "errorPassword",
            "La contraseña debe tener entre 4 y 10 caracteres."
        );

        return false;
    }


    mostrarCorrecto(
        password,
        "errorPassword"
    );


    return true;
}


function validarConfirmacion() {

    if (
        confirmarPassword.value === ""
    ) {

        mostrarError(
            confirmarPassword,
            "errorConfirmar",
            "Debes repetir la contraseña."
        );

        return false;
    }


    if (
        confirmarPassword.value !==
        password.value
    ) {

        mostrarError(
            confirmarPassword,
            "errorConfirmar",
            "Las contraseñas no coinciden."
        );

        return false;
    }


    mostrarCorrecto(
        confirmarPassword,
        "errorConfirmar"
    );


    return true;
}


function validarFechaNacimiento() {

    limpiarEstado(
        fechaNacimiento,
        "errorFechaNacimiento"
    );


    if (
        fechaNacimiento.value === ""
    ) {

        return true;
    }


    const fechaIngresada =
        new Date(
            fechaNacimiento.value +
            "T00:00:00"
        );


    const hoy =
        new Date();


    hoy.setHours(
        0,
        0,
        0,
        0
    );


    if (
        fechaIngresada >
        hoy
    ) {

        mostrarError(
            fechaNacimiento,
            "errorFechaNacimiento",
            "La fecha de nacimiento no puede ser futura."
        );

        return false;
    }


    mostrarCorrecto(
        fechaNacimiento,
        "errorFechaNacimiento"
    );


    return true;
}


function validarRegion() {

    if (region.value === "") {

        mostrarError(
            region,
            "errorRegion",
            "Selecciona una región."
        );

        return false;
    }


    mostrarCorrecto(
        region,
        "errorRegion"
    );


    return true;
}


function validarComuna() {

    if (comuna.value === "") {

        mostrarError(
            comuna,
            "errorComuna",
            "Selecciona una comuna."
        );

        return false;
    }


    mostrarCorrecto(
        comuna,
        "errorComuna"
    );


    return true;
}


function validarDireccion() {

    const valor =
        direccion.value.trim();


    if (valor === "") {

        mostrarError(
            direccion,
            "errorDireccion",
            "La dirección es obligatoria."
        );

        return false;
    }


    if (valor.length > 300) {

        mostrarError(
            direccion,
            "errorDireccion",
            "La dirección no puede superar los 300 caracteres."
        );

        return false;
    }


    mostrarCorrecto(
        direccion,
        "errorDireccion"
    );


    return true;
}


function obtenerNuevoId(
    usuarios
) {

    if (usuarios.length === 0) {

        return 1;
    }


    const ids =
        usuarios.map(
            function(usuario) {

                return Number(
                    usuario.id
                ) || 0;
            }
        );


    return Math.max(
        ...ids
    ) + 1;
}


function guardarUsuario() {

    const usuarios =
        obtenerUsuarios();


    const nuevoUsuario = {

        id:
            obtenerNuevoId(
                usuarios
            ),

        run:
            limpiarRun(
                run.value
            ),

        nombre:
            nombre.value.trim(),

        apellidos:
            apellido.value.trim(),

        correo:
            correo.value
                .trim()
                .toLowerCase(),

        password:
            password.value,

        rol:
            "Cliente",

        fechaNacimiento:
            fechaNacimiento.value,

        region:
            regiones[
                Number(region.value)
            ].nombre,

        comuna:
            comuna.value,

        direccion:
            direccion.value.trim()

    };


    usuarios.push(
        nuevoUsuario
    );


    localStorage.setItem(
        "usuariosAdmin",
        JSON.stringify(usuarios)
    );
}


function actualizarCantidadCarrito() {

    const contador =
        document.getElementById(
            "cantidadCarrito"
        );


    if (!contador) {
        return;
    }


    let carrito = [];


    try {

        carrito =
            JSON.parse(
                localStorage.getItem(
                    "carrito"
                )
            ) || [];

    } catch (error) {

        carrito = [];
    }


    let cantidad = 0;


    carrito.forEach(
        function(producto) {

            cantidad +=
                Number(
                    producto.cantidad
                );
        }
    );


    contador.textContent =
        cantidad;
}


region.addEventListener(
    "change",
    function() {

        cargarComunas();

        validarRegion();

        limpiarEstado(
            comuna,
            "errorComuna"
        );
    }
);


run.addEventListener(
    "blur",
    validarRun
);


nombre.addEventListener(
    "input",
    validarNombre
);


apellido.addEventListener(
    "input",
    validarApellido
);


correo.addEventListener(
    "input",
    validarCorreo
);


password.addEventListener(
    "input",
    function() {

        validarPassword();


        if (
            confirmarPassword.value !== ""
        ) {

            validarConfirmacion();
        }
    }
);


confirmarPassword.addEventListener(
    "input",
    validarConfirmacion
);


fechaNacimiento.addEventListener(
    "change",
    validarFechaNacimiento
);


comuna.addEventListener(
    "change",
    validarComuna
);


direccion.addEventListener(
    "input",
    validarDireccion
);


formulario.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        mensajeRegistro.textContent = "";

        mensajeRegistro.className =
            "mensaje-login";


        const runValido =
            validarRun();

        const nombreValido =
            validarNombre();

        const apellidoValido =
            validarApellido();

        const correoValido =
            validarCorreo();

        const passwordValido =
            validarPassword();

        const confirmacionValida =
            validarConfirmacion();

        const fechaValida =
            validarFechaNacimiento();

        const regionValida =
            validarRegion();

        const comunaValida =
            validarComuna();

        const direccionValida =
            validarDireccion();


        if (
            !runValido ||
            !nombreValido ||
            !apellidoValido ||
            !correoValido ||
            !passwordValido ||
            !confirmacionValida ||
            !fechaValida ||
            !regionValida ||
            !comunaValida ||
            !direccionValida
        ) {

            mensajeRegistro.textContent =
                "Revisa los campos marcados antes de registrarte.";


            mensajeRegistro.classList.add(
                "mensaje-login-error"
            );


            return;
        }


        guardarUsuario();


        mensajeRegistro.textContent =
            "Cuenta creada correctamente. Ahora puedes iniciar sesión.";


        mensajeRegistro.classList.add(
            "mensaje-login-exito"
        );


        formulario.reset();


        comuna.disabled = true;

        comuna.innerHTML = `
            <option value="">
                Primero selecciona una región
            </option>
        `;


        setTimeout(
            function() {

                window.location.href =
                    "login.html";
            },
            1000
        );
    }
);


cargarRegiones();

actualizarCantidadCarrito();