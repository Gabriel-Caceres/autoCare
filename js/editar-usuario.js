const regionesEditarUsuario = [

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


const formularioEditarUsuario =
    document.getElementById(
        "formEditarUsuario"
    );

const runEditarUsuario =
    document.getElementById(
        "run"
    );

const nombreEditarUsuario =
    document.getElementById(
        "nombre"
    );

const apellidosEditarUsuario =
    document.getElementById(
        "apellidos"
    );

const correoEditarUsuario =
    document.getElementById(
        "correo"
    );

const passwordEditarUsuario =
    document.getElementById(
        "password"
    );

const fechaNacimientoEditarUsuario =
    document.getElementById(
        "fechaNacimiento"
    );

const rolEditarUsuario =
    document.getElementById(
        "rol"
    );

const regionEditarUsuario =
    document.getElementById(
        "region"
    );

const comunaEditarUsuario =
    document.getElementById(
        "comuna"
    );

const direccionEditarUsuario =
    document.getElementById(
        "direccion"
    );

const contadorDireccionEditarUsuario =
    document.getElementById(
        "contadorDireccion"
    );

const mensajeEditarUsuario =
    document.getElementById(
        "mensajeUsuario"
    );


const parametrosEditarUsuario =
    new URLSearchParams(
        window.location.search
    );


const usuarioIdEditar =
    parametrosEditarUsuario.get(
        "id"
    );


function obtenerUsuarioActivoEditarUsuario() {

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


function verificarAdministradorEditarUsuario() {

    const usuario =
        obtenerUsuarioActivoEditarUsuario();


    if (
        !usuario ||
        usuario.rol !== "Administrador"
    ) {

        alert(
            "Solo el administrador puede editar usuarios."
        );


        window.location.href =
            "productos.html";


        return false;
    }


    return true;
}


function obtenerUsuariosEditarUsuario() {

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


function guardarUsuariosEditarUsuario(
    usuarios
) {

    localStorage.setItem(
        "usuariosAdmin",
        JSON.stringify(
            usuarios
        )
    );
}


function mostrarErrorEditarUsuario(
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


function mostrarCorrectoEditarUsuario(
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


function limpiarEstadoEditarUsuario(
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


function limpiarRunEditarUsuario(
    valor
) {

    return String(
        valor || ""
    )
        .replace(/\./g, "")
        .replace(/-/g, "")
        .replace(/\s/g, "")
        .toUpperCase();
}


function validarRunChilenoEditarUsuario(
    valor
) {

    const run =
        limpiarRunEditarUsuario(
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


    const resultado =
        11 -
        (
            suma % 11
        );


    let digitoCalculado;


    if (
        resultado === 11
    ) {

        digitoCalculado = "0";

    } else if (
        resultado === 10
    ) {

        digitoCalculado = "K";

    } else {

        digitoCalculado =
            String(
                resultado
            );
    }


    return (
        digitoCalculado ===
        digitoIngresado
    );
}


function validarRunEditarUsuario() {

    const valor =
        limpiarRunEditarUsuario(
            runEditarUsuario.value
        );


    runEditarUsuario.value =
        valor;


    if (
        valor === ""
    ) {

        mostrarErrorEditarUsuario(
            runEditarUsuario,
            "errorRun",
            "El RUN es obligatorio."
        );


        return false;
    }


    if (
        valor.length < 7 ||
        valor.length > 9
    ) {

        mostrarErrorEditarUsuario(
            runEditarUsuario,
            "errorRun",
            "El RUN debe tener entre 7 y 9 caracteres."
        );


        return false;
    }


    if (
        !validarRunChilenoEditarUsuario(
            valor
        )
    ) {

        mostrarErrorEditarUsuario(
            runEditarUsuario,
            "errorRun",
            "Ingresa un RUN chileno válido y sin puntos ni guion."
        );


        return false;
    }


    const usuarios =
        obtenerUsuariosEditarUsuario();


    const existe =
        usuarios.some(
            function(usuario) {

                return (
                    String(
                        usuario.id
                    ) !==
                    String(
                        usuarioIdEditar
                    )
                    &&
                    limpiarRunEditarUsuario(
                        usuario.run
                    ) ===
                    valor
                );
            }
        );


    if (existe) {

        mostrarErrorEditarUsuario(
            runEditarUsuario,
            "errorRun",
            "Este RUN ya se encuentra registrado."
        );


        return false;
    }


    mostrarCorrectoEditarUsuario(
        runEditarUsuario,
        "errorRun"
    );


    return true;
}


function validarNombreEditarUsuario() {

    const valor =
        nombreEditarUsuario.value
            .trim();


    if (
        valor === ""
    ) {

        mostrarErrorEditarUsuario(
            nombreEditarUsuario,
            "errorNombre",
            "El nombre es obligatorio."
        );


        return false;
    }


    if (
        valor.length > 50
    ) {

        mostrarErrorEditarUsuario(
            nombreEditarUsuario,
            "errorNombre",
            "El nombre no puede superar los 50 caracteres."
        );


        return false;
    }


    mostrarCorrectoEditarUsuario(
        nombreEditarUsuario,
        "errorNombre"
    );


    return true;
}


function validarApellidosEditarUsuario() {

    const valor =
        apellidosEditarUsuario.value
            .trim();


    if (
        valor === ""
    ) {

        mostrarErrorEditarUsuario(
            apellidosEditarUsuario,
            "errorApellidos",
            "Los apellidos son obligatorios."
        );


        return false;
    }


    if (
        valor.length > 100
    ) {

        mostrarErrorEditarUsuario(
            apellidosEditarUsuario,
            "errorApellidos",
            "Los apellidos no pueden superar los 100 caracteres."
        );


        return false;
    }


    mostrarCorrectoEditarUsuario(
        apellidosEditarUsuario,
        "errorApellidos"
    );


    return true;
}


function correoPermitidoEditarUsuario(
    valor
) {

    const email =
        valor.toLowerCase();


    return (
        email.endsWith(
            "@duoc.cl"
        ) ||
        email.endsWith(
            "@profesor.duoc.cl"
        ) ||
        email.endsWith(
            "@gmail.com"
        )
    );
}


function validarCorreoEditarUsuario() {

    const valor =
        correoEditarUsuario.value
            .trim()
            .toLowerCase();


    correoEditarUsuario.value =
        valor;


    if (
        valor === ""
    ) {

        mostrarErrorEditarUsuario(
            correoEditarUsuario,
            "errorCorreo",
            "El correo es obligatorio."
        );


        return false;
    }


    if (
        valor.length > 100
    ) {

        mostrarErrorEditarUsuario(
            correoEditarUsuario,
            "errorCorreo",
            "El correo no puede superar los 100 caracteres."
        );


        return false;
    }


    if (
        !correoPermitidoEditarUsuario(
            valor
        )
    ) {

        mostrarErrorEditarUsuario(
            correoEditarUsuario,
            "errorCorreo",
            "Usa @duoc.cl, @profesor.duoc.cl o @gmail.com."
        );


        return false;
    }


    const usuarios =
        obtenerUsuariosEditarUsuario();


    const existe =
        usuarios.some(
            function(usuario) {

                return (
                    String(
                        usuario.id
                    ) !==
                    String(
                        usuarioIdEditar
                    )
                    &&
                    String(
                        usuario.correo || ""
                    ).toLowerCase() ===
                    valor
                );
            }
        );


    if (existe) {

        mostrarErrorEditarUsuario(
            correoEditarUsuario,
            "errorCorreo",
            "Este correo ya está registrado."
        );


        return false;
    }


    mostrarCorrectoEditarUsuario(
        correoEditarUsuario,
        "errorCorreo"
    );


    return true;
}


function validarPasswordEditarUsuario() {

    const valor =
        passwordEditarUsuario.value;


    if (
        valor === ""
    ) {

        mostrarErrorEditarUsuario(
            passwordEditarUsuario,
            "errorPassword",
            "La contraseña es obligatoria."
        );


        return false;
    }


    if (
        valor.length < 4 ||
        valor.length > 10
    ) {

        mostrarErrorEditarUsuario(
            passwordEditarUsuario,
            "errorPassword",
            "La contraseña debe tener entre 4 y 10 caracteres."
        );


        return false;
    }


    mostrarCorrectoEditarUsuario(
        passwordEditarUsuario,
        "errorPassword"
    );


    return true;
}


function validarFechaNacimientoEditarUsuario() {

    const valor =
        fechaNacimientoEditarUsuario.value;


    if (
        valor === ""
    ) {

        limpiarEstadoEditarUsuario(
            fechaNacimientoEditarUsuario,
            "errorFechaNacimiento"
        );


        return true;
    }


    const fecha =
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
        fecha > hoy
    ) {

        mostrarErrorEditarUsuario(
            fechaNacimientoEditarUsuario,
            "errorFechaNacimiento",
            "La fecha de nacimiento no puede ser futura."
        );


        return false;
    }


    mostrarCorrectoEditarUsuario(
        fechaNacimientoEditarUsuario,
        "errorFechaNacimiento"
    );


    return true;
}


function validarRolEditarUsuario() {

    if (
        rolEditarUsuario.value === ""
    ) {

        mostrarErrorEditarUsuario(
            rolEditarUsuario,
            "errorRol",
            "Selecciona un rol."
        );


        return false;
    }


    mostrarCorrectoEditarUsuario(
        rolEditarUsuario,
        "errorRol"
    );


    return true;
}


function cargarRegionesEditarUsuario() {

    regionEditarUsuario.innerHTML = `

        <option value="">
            Selecciona una región
        </option>
    `;


    regionesEditarUsuario.forEach(
        function(item) {

            const opcion =
                document.createElement(
                    "option"
                );


            opcion.value =
                item.nombre;


            opcion.textContent =
                item.nombre;


            regionEditarUsuario.appendChild(
                opcion
            );
        }
    );
}


function cargarComunasEditarUsuario(
    comunaSeleccionada = ""
) {

    comunaEditarUsuario.innerHTML = `

        <option value="">
            Selecciona una comuna
        </option>
    `;


    comunaEditarUsuario.disabled =
        true;


    const seleccion =
        regionesEditarUsuario.find(
            function(item) {

                return (
                    item.nombre ===
                    regionEditarUsuario.value
                );
            }
        );


    if (!seleccion) {

        return;
    }


    comunaEditarUsuario.disabled =
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


            comunaEditarUsuario.appendChild(
                opcion
            );
        }
    );


    comunaEditarUsuario.value =
        comunaSeleccionada;
}


function validarRegionEditarUsuario() {

    if (
        regionEditarUsuario.value === ""
    ) {

        mostrarErrorEditarUsuario(
            regionEditarUsuario,
            "errorRegion",
            "Selecciona una región."
        );


        return false;
    }


    mostrarCorrectoEditarUsuario(
        regionEditarUsuario,
        "errorRegion"
    );


    return true;
}


function validarComunaEditarUsuario() {

    if (
        comunaEditarUsuario.value === ""
    ) {

        mostrarErrorEditarUsuario(
            comunaEditarUsuario,
            "errorComuna",
            "Selecciona una comuna."
        );


        return false;
    }


    mostrarCorrectoEditarUsuario(
        comunaEditarUsuario,
        "errorComuna"
    );


    return true;
}


function validarDireccionEditarUsuario() {

    const valor =
        direccionEditarUsuario.value
            .trim();


    if (
        valor === ""
    ) {

        mostrarErrorEditarUsuario(
            direccionEditarUsuario,
            "errorDireccion",
            "La dirección es obligatoria."
        );


        return false;
    }


    if (
        valor.length > 300
    ) {

        mostrarErrorEditarUsuario(
            direccionEditarUsuario,
            "errorDireccion",
            "La dirección no puede superar los 300 caracteres."
        );


        return false;
    }


    mostrarCorrectoEditarUsuario(
        direccionEditarUsuario,
        "errorDireccion"
    );


    return true;
}


function cargarUsuarioEditar() {

    const usuarios =
        obtenerUsuariosEditarUsuario();


    const usuario =
        usuarios.find(
            function(item) {

                return (
                    String(
                        item.id
                    ) ===
                    String(
                        usuarioIdEditar
                    )
                );
            }
        );


    if (!usuario) {

        alert(
            "Usuario no encontrado."
        );


        window.location.href =
            "usuarios.html";


        return false;
    }


    runEditarUsuario.value =
        usuario.run || "";

    nombreEditarUsuario.value =
        usuario.nombre || "";

    apellidosEditarUsuario.value =
        usuario.apellidos ||
        usuario.apellido ||
        "";

    correoEditarUsuario.value =
        usuario.correo || "";

    passwordEditarUsuario.value =
        usuario.password || "";

    fechaNacimientoEditarUsuario.value =
        usuario.fechaNacimiento || "";

    rolEditarUsuario.value =
        usuario.rol || "";

    regionEditarUsuario.value =
        usuario.region || "";


    cargarComunasEditarUsuario(
        usuario.comuna || ""
    );


    direccionEditarUsuario.value =
        usuario.direccion || "";


    contadorDireccionEditarUsuario.textContent =
        direccionEditarUsuario.value.length;


    return true;
}


function actualizarUsuarioEditar() {

    const usuarios =
        obtenerUsuariosEditarUsuario();


    const indice =
        usuarios.findIndex(
            function(usuario) {

                return (
                    String(
                        usuario.id
                    ) ===
                    String(
                        usuarioIdEditar
                    )
                );
            }
        );


    if (
        indice === -1
    ) {

        return false;
    }


    usuarios[indice] = {

        ...usuarios[indice],

        run:
            limpiarRunEditarUsuario(
                runEditarUsuario.value
            ),

        nombre:
            nombreEditarUsuario.value
                .trim(),

        apellidos:
            apellidosEditarUsuario.value
                .trim(),

        correo:
            correoEditarUsuario.value
                .trim()
                .toLowerCase(),

        password:
            passwordEditarUsuario.value,

        fechaNacimiento:
            fechaNacimientoEditarUsuario.value,

        rol:
            rolEditarUsuario.value,

        region:
            regionEditarUsuario.value,

        comuna:
            comunaEditarUsuario.value,

        direccion:
            direccionEditarUsuario.value
                .trim()
    };


    guardarUsuariosEditarUsuario(
        usuarios
    );


    const usuarioActivo =
        obtenerUsuarioActivoEditarUsuario();


    if (
        usuarioActivo &&
        String(
            usuarioActivo.id
        ) ===
        String(
            usuarioIdEditar
        )
    ) {

        localStorage.setItem(
            "usuarioActivo",
            JSON.stringify(
                {
                    id:
                        usuarios[indice].id,

                    nombre:
                        usuarios[indice].nombre,

                    apellidos:
                        usuarios[indice].apellidos,

                    correo:
                        usuarios[indice].correo,

                    rol:
                        usuarios[indice].rol
                }
            )
        );
    }


    return true;
}


runEditarUsuario.addEventListener(
    "input",
    validarRunEditarUsuario
);


nombreEditarUsuario.addEventListener(
    "input",
    validarNombreEditarUsuario
);


apellidosEditarUsuario.addEventListener(
    "input",
    validarApellidosEditarUsuario
);


correoEditarUsuario.addEventListener(
    "input",
    validarCorreoEditarUsuario
);


passwordEditarUsuario.addEventListener(
    "input",
    validarPasswordEditarUsuario
);


fechaNacimientoEditarUsuario.addEventListener(
    "change",
    validarFechaNacimientoEditarUsuario
);


rolEditarUsuario.addEventListener(
    "change",
    validarRolEditarUsuario
);


regionEditarUsuario.addEventListener(
    "change",
    function() {

        cargarComunasEditarUsuario();

        validarRegionEditarUsuario();

        limpiarEstadoEditarUsuario(
            comunaEditarUsuario,
            "errorComuna"
        );
    }
);


comunaEditarUsuario.addEventListener(
    "change",
    validarComunaEditarUsuario
);


direccionEditarUsuario.addEventListener(
    "input",
    function() {

        contadorDireccionEditarUsuario.textContent =
            direccionEditarUsuario.value.length;


        validarDireccionEditarUsuario();
    }
);


formularioEditarUsuario.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        mensajeEditarUsuario.textContent =
            "";


        mensajeEditarUsuario.className =
            "mensaje-login";


        const runValido =
            validarRunEditarUsuario();

        const nombreValido =
            validarNombreEditarUsuario();

        const apellidosValidos =
            validarApellidosEditarUsuario();

        const correoValido =
            validarCorreoEditarUsuario();

        const passwordValido =
            validarPasswordEditarUsuario();

        const fechaValida =
            validarFechaNacimientoEditarUsuario();

        const rolValido =
            validarRolEditarUsuario();

        const regionValida =
            validarRegionEditarUsuario();

        const comunaValida =
            validarComunaEditarUsuario();

        const direccionValida =
            validarDireccionEditarUsuario();


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

            mensajeEditarUsuario.textContent =
                "Revisa los campos marcados antes de guardar.";


            mensajeEditarUsuario.className =
                "mensaje-login mensaje-login-error";


            return;
        }


        const actualizado =
            actualizarUsuarioEditar();


        if (!actualizado) {

            mensajeEditarUsuario.textContent =
                "No fue posible actualizar el usuario.";


            mensajeEditarUsuario.className =
                "mensaje-login mensaje-login-error";


            return;
        }


        mensajeEditarUsuario.textContent =
            "Usuario actualizado correctamente.";


        mensajeEditarUsuario.className =
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
    verificarAdministradorEditarUsuario()
) {

    cargarRegionesEditarUsuario();

    cargarUsuarioEditar();
}