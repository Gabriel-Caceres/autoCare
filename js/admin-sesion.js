let usuarioActivoAdmin = null;


function cargarUsuarioActivoAdmin() {

    try {

        const datos =
            localStorage.getItem(
                "usuarioActivo"
            );


        if (!datos) {

            usuarioActivoAdmin = null;

            return;
        }


        usuarioActivoAdmin =
            JSON.parse(datos);

    } catch (error) {

        usuarioActivoAdmin = null;
    }
}


function obtenerPaginaActual() {

    const partes =
        window.location.pathname
            .split("/");


    return (
        partes[
            partes.length - 1
        ] || "index.html"
    );
}


function protegerPanel() {

    cargarUsuarioActivoAdmin();


    if (!usuarioActivoAdmin) {

        alert(
            "Debes iniciar sesión para acceder al panel."
        );


        window.location.href =
            "../login.html";


        return false;
    }


    const rol =
        usuarioActivoAdmin.rol;


    if (
        rol !== "Administrador" &&
        rol !== "Vendedor"
    ) {

        alert(
            "No tienes permiso para acceder al panel."
        );


        window.location.href =
            "../index.html";


        return false;
    }


    if (
        rol === "Vendedor"
    ) {

        const paginasPermitidas = [

            "productos.html",

            "detalle-producto.html",

            "pedidos.html",

            "detalle-pedido.html"

        ];


        const paginaActual =
            obtenerPaginaActual();


        if (
            !paginasPermitidas.includes(
                paginaActual
            )
        ) {

            alert(
                "El vendedor no tiene acceso a esta sección."
            );


            window.location.href =
                "productos.html";


            return false;
        }


        ocultarOpcionesAdministrador();
    }


    mostrarUsuarioPanel();


    return true;
}


function ocultarOpcionesAdministrador() {

    const elementos =
        document.querySelectorAll(
            ".solo-admin, .solo-administrador"
        );


    elementos.forEach(
        function(elemento) {

            elemento.style.display =
                "none";
        }
    );
}


function mostrarUsuarioPanel() {

    const contenedor =
        document.querySelector(
            ".admin-usuario"
        );


    if (!contenedor) {
        return;
    }


    const nombre =
        usuarioActivoAdmin.nombre ||
        "Usuario";


    const rol =
        usuarioActivoAdmin.rol ||
        "";


    contenedor.innerHTML = `

        <span class="admin-usuario-datos">

            ${nombre}
            ·
            ${rol}

        </span>


        <a
            href="../index.html"
            class="admin-ir-tienda"
        >
            Ir a la tienda
        </a>


        <button
            type="button"
            id="btnCerrarSesionAdmin"
            class="btn-cerrar-admin"
        >
            Cerrar sesión
        </button>
    `;


    const botonCerrar =
        document.getElementById(
            "btnCerrarSesionAdmin"
        );


    if (botonCerrar) {

        botonCerrar.addEventListener(
            "click",
            cerrarSesionAdmin
        );
    }
}


function cerrarSesionAdmin() {

    const confirmar =
        confirm(
            "¿Deseas cerrar sesión?"
        );


    if (!confirmar) {
        return;
    }


    localStorage.removeItem(
        "usuarioActivo"
    );


    window.location.href =
        "../login.html";
}


protegerPanel();