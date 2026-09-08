const regionesNuevoUsuario = [

    {
        nombre: "Metropolitana",
        comunas: [
            "Santiago",
            "San Miguel",
            "Providencia",
            "Maipú",
            "La Florida",
            "Puente Alto"
        ]
    },

    {
        nombre: "Valparaíso",
        comunas: [
            "Valparaíso",
            "Viña del Mar",
            "Quilpué",
            "Villa Alemana"
        ]
    },

    {
        nombre: "Biobío",
        comunas: [
            "Concepción",
            "Talcahuano",
            "Chiguayante",
            "San Pedro de la Paz"
        ]
    }

];


const formularioNuevoUsuario =
    document.getElementById(
        "formNuevoUsuario"
    );

const runNuevoUsuario =
    document.getElementById(
        "run"
    );

const nombreNuevoUsuario =
    document.getElementById(
        "nombre"
    );

const apellidosNuevoUsuario =
    document.getElementById(
        "apellidos"
    );

const correoNuevoUsuario =
    document.getElementById(
        "correo"
    );

const passwordNuevoUsuario =
    document.getElementById(
        "password"
    );

const fechaNacimientoNuevoUsuario =
    document.getElementById(
        "fechaNacimiento"
    );

const rolNuevoUsuario =
    document.getElementById(
        "rol"
    );

const regionNuevoUsuario =
    document.getElementById(
        "region"
    );

const comunaNuevoUsuario =
    document.getElementById(
        "comuna"
    );

const direccionNuevoUsuario =
    document.getElementById(
        "direccion"
    );

const contadorDireccionNuevoUsuario =
    document.getElementById(
        "contadorDireccion"
    );

const mensajeNuevoUsuario =
    document.getElementById(
        "mensajeUsuario"
    );


function obtenerUsuarioActivoNuevoUsuario() {

    try {

        const datos =
            localStorage.getItem(
                "usuarioActivo"
            );


        if (!datos) {

            return null;
        }


        return JSON.parse(
            datos
        );

    } catch (error) {

        return null;
    }
}


function verificarAdministradorNuevoUsuario() {

    const usuario =
        obtenerUsuarioActivoNuevoUsuario();


    if (
        !usuario ||
        usuario.rol !== "Administrador"
    ) {

        alert(
            "Solo el administrador puede crear usuarios."
        );


        window.location.href =
            "productos.html";


        return false;
    }


    return true;
}


function obtenerUsuariosNuevoUsuario() {

    try {

        const datos =
            localStorage.getItem(
                "usuariosAdmin"
            );


        if (!datos) {

            return [];
        }


        const usuarios =
            JSON.parse(
                datos
            );


        if (
            Array.isArray(
                usuarios
            )
        ) {

            return usuarios;
        }


        return [];

    } catch (error) {

        return [];
    }
}


function guardarUsuariosNuevoUsuario(
    usuarios
) {

    localStorage.setItem(
        "usuariosAdmin",
        JSON.stringify(
            usuarios
        )
    );
}


function mostrarErrorNuevoUsuario(
    campo,
    errorId,
    mensaje
) {

    const error =
        document.getElementById(
            errorId
        );


    if (error) {

        error.textContent =
            mensaje;
    }


    campo.classList.remove(
        "campo-correcto"
    );


    campo.classList.add(
        "campo-error"
    );
}


function mostrarCorrectoNuevoUsuario(
    campo,
    errorId
) {

    const error =
        document.getElementById(
            errorId
        );


    if (error) {

        error.textContent = "";
    }


    campo.classList.remove(
        "campo-error"
    );


    campo.classList.add(
        "campo-correcto"
    );
}


function limpiarEstadoNuevoUsuario(
    campo,
    errorId
) {

    const error =
        document.getElementById(
            errorId
        );


    if (error) {

        error.textContent = "";
    }


    campo.classList.remove(
        "campo-error",
        "campo-correcto"
    );
}


function limpiarRunNuevoUsuario(
    valor
) {

    return valor
        .replace(/\./g, "")
        .replace(/-/g, "")
        .replace(/\s/g, "")
        .toUpperCase();
}


function runChilenoValido(
    valor
) {

    const run =
        limpiarRunNuevoUsuario(
            valor
        );


    if (
        !/^[0-9]{7,8}[0-9K]$/.test(
            run
        )
    ) {

        return false;
    }


    const cuerpo =
        run.slice(
            0,
            -1
        );


    const digitoIngresado =
        run.slice(
            -1
        );


    let suma = 0;

    let multiplicador = 2;


    for (
        let i = cuerpo.length - 1;
        i >= 0;
        i--
    ) {

        suma +=
            Number(
                cuerpo[i]
            ) *
            multiplicador;


        multiplicador++;


        if (
            multiplicador > 7
        ) {

            multiplicador = 2;
        }
    }


    const resto =
        11 -
        (
            suma % 11
        );


    let digitoCalculado;


    if (
        resto === 11
    ) {

        digitoCalculado = "0";

    } else if (
        resto === 10
    ) {

        digitoCalculado = "K";

    } else {

        digitoCalculado =
            String(
                resto
            );
    }


    return (
        digitoCalculado ===
        digitoIngresado
    );
}


function validarRunNuevoUsuario() {

    const valor =
        limpiarRunNuevoUsuario(
            runNuevoUsuario.value
        );


    runNuevoUsuario.value =
        valor;


    if (
        valor === ""
    ) {

        mostrarErrorNuevoUsuario(
            runNuevoUsuario,
            "errorRun",
            "El RUN es obligatorio."
        );


        return false;
    }


    if (
        valor.length < 7 ||
        valor.length > 9
    ) {

        mostrarErrorNuevoUsuario(
            runNuevoUsuario,
            "errorRun",
            "El RUN debe tener entre 7 y 9 caracteres."
        );


        return false;
    }


    if (
        !runChilenoValido(
            valor
        )
    ) {

        mostrarErrorNuevoUsuario(
            runNuevoUsuario,
            "errorRun",
            "Ingresa un RUN chileno válido y sin puntos ni guion."
        );


        return false;
    }


    const usuarios =
        obtenerUsuariosNuevoUsuario();


    const existe =
        usuarios.some(
            function(usuario) {

                return (
                    limpiarRunNuevoUsuario(
                        usuario.run || ""
                    ) ===
                    valor
                );
            }
        );


    if (existe) {

        mostrarErrorNuevoUsuario(
            runNuevoUsuario,
            "errorRun",
            "Este RUN ya se encuentra registrado."
        );


        return false;
    }


    mostrarCorrectoNuevoUsuario(
        runNuevoUsuario,
        "errorRun"
    );


    return true;
}


function validarNombreNuevoUsuario() {

    const valor =
        nombreNuevoUsuario.value
            .trim();


    if (
        valor === ""
    ) {

        mostrarErrorNuevoUsuario(
            nombreNuevoUsuario,
            "errorNombre",
            "El nombre es obligatorio."
        );


        return false;
    }


    if (
        valor.length > 50
    ) {

        mostrarErrorNuevoUsuario(
            nombreNuevoUsuario,
            "errorNombre",
            "El nombre no puede superar los 50 caracteres."
        );


        return false;
    }


    mostrarCorrectoNuevoUsuario(
        nombreNuevoUsuario,
        "errorNombre"
    );


    return true;
}


function validarApellidosNuevoUsuario() {

    const valor =
        apellidosNuevoUsuario.value
            .trim();


    if (
        valor === ""
    ) {

        mostrarErrorNuevoUsuario(
            apellidosNuevoUsuario,
            "errorApellidos",
            "Los apellidos son obligatorios."
        );


        return false;
    }


    if (
        valor.length > 100
    ) {

        mostrarErrorNuevoUsuario(
            apellidosNuevoUsuario,
            "errorApellidos",
            "Los apellidos no pueden superar los 100 caracteres."
        );


        return false;
    }


    mostrarCorrectoNuevoUsuario(
        apellidosNuevoUsuario,
        "errorApellidos"
    );


    return true;
}


function correoPermitidoNuevoUsuario(
    valor
) {

    const correo =
        valor.toLowerCase();


    return (
        correo.endsWith(
            "@duoc.cl"
        ) ||
        correo.endsWith(
            "@profesor.duoc.cl"
        ) ||
        correo.endsWith(
            "@gmail.com"
        )
    );
}


function validarCorreoNuevoUsuario() {

    const valor =
        correoNuevoUsuario.value
            .trim()
            .toLowerCase();


    correoNuevoUsuario.value =
        valor;


    if (
        valor === ""
    ) {

        mostrarErrorNuevoUsuario(
            correoNuevoUsuario,
            "errorCorreo",
            "El correo es obligatorio."
        );


        return false;
    }


    if (
        valor.length > 100
    ) {

        mostrarErrorNuevoUsuario(
            correoNuevoUsuario,
            "errorCorreo",
            "El correo no puede superar los 100 caracteres."
        );


        return false;
    }


    if (
        !correoPermitidoNuevoUsuario(
            valor
        )
    ) {

        mostrarErrorNuevoUsuario(
            correoNuevoUsuario,
            "errorCorreo",
            "Usa @duoc.cl, @profesor.duoc.cl o @gmail.com."
        );


        return false;
    }


    const usuarios =
        obtenerUsuariosNuevoUsuario();


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

        mostrarErrorNuevoUsuario(
            correoNuevoUsuario,
            "errorCorreo",
            "Este correo ya está registrado."
        );


        return false;
    }


    mostrarCorrectoNuevoUsuario(
        correoNuevoUsuario,
        "errorCorreo"
    );


    return true;
}


function validarPasswordNuevoUsuario() {

    const valor =
        passwordNuevoUsuario.value;


    if (
        valor === ""
    ) {

        mostrarErrorNuevoUsuario(
            passwordNuevoUsuario,
            "errorPassword",
            "La contraseña es obligatoria."
        );


        return false;
    }


    if (
        valor.length < 4 ||
        valor.length > 10
    ) {

        mostrarErrorNuevoUsuario(
            passwordNuevoUsuario,
            "errorPassword",
            "La contraseña debe tener entre 4 y 10 caracteres."
        );


        return false;
    }


    mostrarCorrectoNuevoUsuario(
        passwordNuevoUsuario,
        "errorPassword"
    );


    return true;
}


function validarFechaNacimientoNuevoUsuario() {

    const valor =
        fechaNacimientoNuevoUsuario.value;


    if (
        valor === ""
    ) {

        limpiarEstadoNuevoUsuario(
            fechaNacimientoNuevoUsuario,
            "errorFechaNacimiento"
        );


        return true;
    }


    const fechaSeleccionada =
        new Date(
            valor + "T00:00:00"
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
        fechaSeleccionada > hoy
    ) {

        mostrarErrorNuevoUsuario(
            fechaNacimientoNuevoUsuario,
            "errorFechaNacimiento",
            "La fecha de nacimiento no puede ser futura."
        );


        return false;
    }


    mostrarCorrectoNuevoUsuario(
        fechaNacimientoNuevoUsuario,
        "errorFechaNacimiento"
    );


    return true;
}


function validarRolNuevoUsuario() {

    if (
        rolNuevoUsuario.value === ""
    ) {

        mostrarErrorNuevoUsuario(
            rolNuevoUsuario,
            "errorRol",
            "Selecciona un rol."
        );


        return false;
    }


    mostrarCorrectoNuevoUsuario(
        rolNuevoUsuario,
        "errorRol"
    );


    return true;
}


function cargarRegionesNuevoUsuario() {

    regionNuevoUsuario.innerHTML = `

        <option value="">
            Selecciona una región
        </option>
    `;


    regionesNuevoUsuario.forEach(
        function(item) {

            const opcion =
                document.createElement(
                    "option"
                );


            opcion.value =
                item.nombre;


            opcion.textContent =
                item.nombre;


            regionNuevoUsuario.appendChild(
                opcion
            );
        }
    );
}


function cargarComunasNuevoUsuario() {

    comunaNuevoUsuario.innerHTML = `

        <option value="">
            Selecciona una comuna
        </option>
    `;


    comunaNuevoUsuario.disabled =
        true;


    const seleccion =
        regionesNuevoUsuario.find(
            function(item) {

                return (
                    item.nombre ===
                    regionNuevoUsuario.value
                );
            }
        );


    if (!seleccion) {

        return;
    }


    comunaNuevoUsuario.disabled =
        false;


    seleccion.comunas.forEach(
        function(nombreComuna) {

            const opcion =
                document.createElement(
                    "option"
                );


            opcion.value =
                nombreComuna;


            opcion.textContent =
                nombreComuna;


            comunaNuevoUsuario.appendChild(
                opcion
            );
        }
    );
}


function validarRegionNuevoUsuario() {

    if (
        regionNuevoUsuario.value === ""
    ) {

        mostrarErrorNuevoUsuario(
            regionNuevoUsuario,
            "errorRegion",
            "Selecciona una región."
        );


        return false;
    }


    mostrarCorrectoNuevoUsuario(
        regionNuevoUsuario,
        "errorRegion"
    );


    return true;
}


function validarComunaNuevoUsuario() {

    if (
        comunaNuevoUsuario.value === ""
    ) {

        mostrarErrorNuevoUsuario(
            comunaNuevoUsuario,
            "errorComuna",
            "Selecciona una comuna."
        );


        return false;
    }


    mostrarCorrectoNuevoUsuario(
        comunaNuevoUsuario,
        "errorComuna"
    );


    return true;
}


function validarDireccionNuevoUsuario() {

    const valor =
        direccionNuevoUsuario.value
            .trim();


    if (
        valor === ""
    ) {

        mostrarErrorNuevoUsuario(
            direccionNuevoUsuario,
            "errorDireccion",
            "La dirección es obligatoria."
        );


        return false;
    }


    if (
        valor.length > 300
    ) {

        mostrarErrorNuevoUsuario(
            direccionNuevoUsuario,
            "errorDireccion",
            "La dirección no puede superar los 300 caracteres."
        );


        return false;
    }


    mostrarCorrectoNuevoUsuario(
        direccionNuevoUsuario,
        "errorDireccion"
    );


    return true;
}


function obtenerNuevoIdUsuario(
    usuarios
) {

    if (
        usuarios.length === 0
    ) {

        return 1;
    }


    const ids =
        usuarios
            .map(
                function(usuario) {

                    return Number(
                        usuario.id
                    );
                }
            )
            .filter(
                function(id) {

                    return !Number.isNaN(
                        id
                    );
                }
            );


    if (
        ids.length === 0
    ) {

        return 1;
    }


    return (
        Math.max(
            ...ids
        ) + 1
    );
}


function registrarNuevoUsuario() {

    const usuarios =
        obtenerUsuariosNuevoUsuario();


    const nuevoUsuario = {

        id:
            obtenerNuevoIdUsuario(
                usuarios
            ),

        run:
            limpiarRunNuevoUsuario(
                runNuevoUsuario.value
            ),

        nombre:
            nombreNuevoUsuario.value
                .trim(),

        apellidos:
            apellidosNuevoUsuario.value
                .trim(),

        correo:
            correoNuevoUsuario.value
                .trim()
                .toLowerCase(),

        password:
            passwordNuevoUsuario.value,

        fechaNacimiento:
            fechaNacimientoNuevoUsuario.value,

        rol:
            rolNuevoUsuario.value,

        region:
            regionNuevoUsuario.value,

        comuna:
            comunaNuevoUsuario.value,

        direccion:
            direccionNuevoUsuario.value
                .trim()
    };


    usuarios.push(
        nuevoUsuario
    );


    guardarUsuariosNuevoUsuario(
        usuarios
    );
}


runNuevoUsuario.addEventListener(
    "input",
    validarRunNuevoUsuario
);


nombreNuevoUsuario.addEventListener(
    "input",
    validarNombreNuevoUsuario
);


apellidosNuevoUsuario.addEventListener(
    "input",
    validarApellidosNuevoUsuario
);


correoNuevoUsuario.addEventListener(
    "input",
    validarCorreoNuevoUsuario
);


passwordNuevoUsuario.addEventListener(
    "input",
    validarPasswordNuevoUsuario
);


fechaNacimientoNuevoUsuario.addEventListener(
    "change",
    validarFechaNacimientoNuevoUsuario
);


rolNuevoUsuario.addEventListener(
    "change",
    validarRolNuevoUsuario
);


regionNuevoUsuario.addEventListener(
    "change",
    function() {

        cargarComunasNuevoUsuario();

        validarRegionNuevoUsuario();

        limpiarEstadoNuevoUsuario(
            comunaNuevoUsuario,
            "errorComuna"
        );
    }
);


comunaNuevoUsuario.addEventListener(
    "change",
    validarComunaNuevoUsuario
);


direccionNuevoUsuario.addEventListener(
    "input",
    function() {

        contadorDireccionNuevoUsuario.textContent =
            direccionNuevoUsuario.value.length;


        validarDireccionNuevoUsuario();
    }
);


formularioNuevoUsuario.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        mensajeNuevoUsuario.textContent =
            "";


        mensajeNuevoUsuario.className =
            "mensaje-login";


        const runValido =
            validarRunNuevoUsuario();

        const nombreValido =
            validarNombreNuevoUsuario();

        const apellidosValidos =
            validarApellidosNuevoUsuario();

        const correoValido =
            validarCorreoNuevoUsuario();

        const passwordValido =
            validarPasswordNuevoUsuario();

        const fechaValida =
            validarFechaNacimientoNuevoUsuario();

        const rolValido =
            validarRolNuevoUsuario();

        const regionValida =
            validarRegionNuevoUsuario();

        const comunaValida =
            validarComunaNuevoUsuario();

        const direccionValida =
            validarDireccionNuevoUsuario();


        if (
            !runValido ||
            !nombreValido ||
            !apellidosValidos ||
            !correoValido ||
            !passwordValido ||
            !fechaValida ||
            !rolValido ||
            !regionValida ||
            !comunaValida ||
            !direccionValida
        ) {

            mensajeNuevoUsuario.textContent =
                "Revisa los campos marcados antes de guardar.";


            mensajeNuevoUsuario.className =
                "mensaje-login mensaje-login-error";


            return;
        }


        registrarNuevoUsuario();


        mensajeNuevoUsuario.textContent =
            "Usuario creado correctamente.";


        mensajeNuevoUsuario.className =
            "mensaje-login mensaje-login-exito";


        setTimeout(
            function() {

                window.location.href =
                    "usuarios.html";
            },
            700
        );
    }
);


if (
    verificarAdministradorNuevoUsuario()
) {

    cargarRegionesNuevoUsuario();

    cargarComunasNuevoUsuario();

    contadorDireccionNuevoUsuario.textContent =
        direccionNuevoUsuario.value.length;
}
