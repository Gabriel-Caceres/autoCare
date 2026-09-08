const formulario =
    document.getElementById("formLogin");

const correo =
    document.getElementById("correo");

const password =
    document.getElementById("password");

const errorCorreo =
    document.getElementById("errorCorreo");

const errorPassword =
    document.getElementById("errorPassword");

const mensajeLogin =
    document.getElementById("mensajeLogin");


const usuariosIniciales = [

    {
        id: 1,
        run: "200463218",
        nombre: "Administrador",
        apellidos: "AutoCare",
        correo: "admin@duoc.cl",
        password: "admin123",
        rol: "Administrador",
        fechaNacimiento: "",
        region: "Región Metropolitana",
        comuna: "Santiago",
        direccion: "Casa Central AutoCare"
    },

    {
        id: 2,
        run: "191899970",
        nombre: "Vendedor",
        apellidos: "AutoCare",
        correo: "vendedor@duoc.cl",
        password: "venta123",
        rol: "Vendedor",
        fechaNacimiento: "",
        region: "Región Metropolitana",
        comuna: "San Miguel",
        direccion: "Sucursal AutoCare"
    },

    {
        id: 3,
        run: "86215888",
        nombre: "Cliente",
        apellidos: "Prueba",
        correo: "cliente@gmail.com",
        password: "1234",
        rol: "Cliente",
        fechaNacimiento: "",
        region: "Región Metropolitana",
        comuna: "Providencia",
        direccion: "Dirección cliente"
    }

];


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


function guardarUsuarios(usuarios) {

    localStorage.setItem(
        "usuariosAdmin",
        JSON.stringify(usuarios)
    );
}


function cargarUsuariosIniciales() {

    let usuarios =
        obtenerUsuarios();


    usuariosIniciales.forEach(
        function(usuarioInicial) {

            const existeCorreo =
                usuarios.some(
                    function(usuario) {

                        return (
                            String(
                                usuario.correo || ""
                            ).toLowerCase() ===
                            usuarioInicial.correo
                                .toLowerCase()
                        );
                    }
                );


            if (!existeCorreo) {

                usuarios.push(
                    usuarioInicial
                );
            }
        }
    );


    guardarUsuarios(usuarios);
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


function validarCampoCorreo() {

    const valor =
        correo.value
            .trim()
            .toLowerCase();


    errorCorreo.textContent = "";


    correo.classList.remove(
        "campo-error",
        "campo-correcto"
    );


    if (valor === "") {

        errorCorreo.textContent =
            "El correo electrónico es obligatorio.";

        correo.classList.add(
            "campo-error"
        );

        return false;
    }


    if (valor.length > 100) {

        errorCorreo.textContent =
            "El correo no puede superar los 100 caracteres.";

        correo.classList.add(
            "campo-error"
        );

        return false;
    }


    if (!validarDominioCorreo(valor)) {

        errorCorreo.textContent =
            "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";

        correo.classList.add(
            "campo-error"
        );

        return false;
    }


    correo.classList.add(
        "campo-correcto"
    );


    return true;
}


function validarCampoPassword() {

    const valor =
        password.value;


    errorPassword.textContent = "";


    password.classList.remove(
        "campo-error",
        "campo-correcto"
    );


    if (valor === "") {

        errorPassword.textContent =
            "La contraseña es obligatoria.";

        password.classList.add(
            "campo-error"
        );

        return false;
    }


    if (
        valor.length < 4 ||
        valor.length > 10
    ) {

        errorPassword.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres.";

        password.classList.add(
            "campo-error"
        );

        return false;
    }


    password.classList.add(
        "campo-correcto"
    );


    return true;
}


function iniciarSesion() {

    const usuarios =
        obtenerUsuarios();


    const emailIngresado =
        correo.value
            .trim()
            .toLowerCase();


    const claveIngresada =
        password.value;


    const usuario =
        usuarios.find(
            function(item) {

                return (
                    String(
                        item.correo || ""
                    ).toLowerCase() ===
                    emailIngresado
                    &&
                    String(
                        item.password || ""
                    ) ===
                    claveIngresada
                );
            }
        );


    if (!usuario) {

        mensajeLogin.textContent =
            "Correo o contraseña incorrectos.";

        mensajeLogin.className =
            "mensaje-login mensaje-login-error";

        return;
    }


    const usuarioActivo = {

        id:
            usuario.id,

        nombre:
            usuario.nombre,

        apellidos:
            usuario.apellidos || "",

        correo:
            usuario.correo,

        rol:
            usuario.rol

    };


    localStorage.setItem(
        "usuarioActivo",
        JSON.stringify(usuarioActivo)
    );


    mensajeLogin.textContent =
        "Inicio de sesión correcto. Bienvenido/a " +
        usuario.nombre +
        ".";


    mensajeLogin.className =
        "mensaje-login mensaje-login-exito";


    setTimeout(
        function() {

            redirigirUsuario(
                usuario.rol
            );
        },
        700
    );
}


function redirigirUsuario(rol) {

    if (rol === "Administrador") {

        window.location.href =
            "admin/index.html";

        return;
    }


    if (rol === "Vendedor") {

        window.location.href =
            "admin/productos.html";

        return;
    }


    window.location.href =
        "index.html";
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


if (correo) {

    correo.addEventListener(
        "input",
        validarCampoCorreo
    );

    correo.addEventListener(
        "blur",
        validarCampoCorreo
    );
}


if (password) {

    password.addEventListener(
        "input",
        validarCampoPassword
    );

    password.addEventListener(
        "blur",
        validarCampoPassword
    );
}


if (formulario) {

    formulario.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            mensajeLogin.textContent = "";

            mensajeLogin.className =
                "mensaje-login";


            const correoValido =
                validarCampoCorreo();

            const passwordValido =
                validarCampoPassword();


            if (
                !correoValido ||
                !passwordValido
            ) {

                mensajeLogin.textContent =
                    "Revisa los campos marcados antes de continuar.";

                mensajeLogin.classList.add(
                    "mensaje-login-error"
                );

                return;
            }


            iniciarSesion();
        }
    );
}


cargarUsuariosIniciales();

actualizarCantidadCarrito();