function obtenerCarritoGeneral() {

    try {

        const datos =
            localStorage.getItem(
                "carrito"
            );

        if (!datos) {

            return [];
        }

        const carrito =
            JSON.parse(datos);

        if (
            Array.isArray(
                carrito
            )
        ) {

            return carrito;
        }

        return [];

    } catch (error) {

        console.error(
            "Error al cargar el carrito:",
            error
        );

        return [];
    }
}


function actualizarCarritoGeneral() {

    const contador =
        document.getElementById(
            "cantidadCarrito"
        );

    if (!contador) {

        return;
    }

    const carrito =
        obtenerCarritoGeneral();

    let cantidad = 0;

    carrito.forEach(
        function(producto) {

            cantidad +=
                Number(
                    producto.cantidad
                ) || 0;
        }
    );

    contador.textContent =
        cantidad;
}


function obtenerUsuarioActivoGeneral() {

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


function cerrarSesionGeneral() {

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
        "index.html";
}


function mostrarSesionGeneral() {

    const usuario =
        obtenerUsuarioActivoGeneral();

    const enlace =
        document.getElementById(
            "enlaceSesion"
        );

    if (!enlace) {

        return;
    }

    if (!usuario) {

        enlace.textContent =
            "Ingresar";

        enlace.href =
            "login.html";

        enlace.title =
            "Iniciar sesión";

        return;
    }

    const nombre =
        usuario.nombre ||
        "Usuario";

    enlace.textContent =
        nombre;

    enlace.href =
        "#";

    enlace.title =
        "Cerrar sesión";

    enlace.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            cerrarSesionGeneral();
        }
    );
}


function crearAccesoPanelGeneral() {

    const usuario =
        obtenerUsuarioActivoGeneral();

    if (!usuario) {

        return;
    }

    if (
        usuario.rol !== "Administrador" &&
        usuario.rol !== "Vendedor"
    ) {

        return;
    }

    const acciones =
        document.querySelector(
            ".acciones"
        );

    if (!acciones) {

        return;
    }

    if (
        document.getElementById(
            "enlacePanel"
        )
    ) {

        return;
    }

    const enlace =
        document.createElement(
            "a"
        );

    enlace.id =
        "enlacePanel";

    enlace.className =
        "enlace-panel";

    if (
        usuario.rol ===
        "Administrador"
    ) {

        enlace.textContent =
            "Administración";

        enlace.href =
            "admin/index.html";

    } else {

        enlace.textContent =
            "Panel vendedor";

        enlace.href =
            "admin/productos.html";
    }

    acciones.insertBefore(
        enlace,
        acciones.firstChild
    );
}


function protegerCompraExitosaGeneral() {

    const pagina =
        window.location.pathname;

    if (
        !pagina.endsWith(
            "compra-exitosa.html"
        )
    ) {

        return;
    }

    const usuario =
        obtenerUsuarioActivoGeneral();

    if (
        !usuario ||
        usuario.rol !== "Cliente"
    ) {

        window.location.href =
            "index.html";

        return;
    }

    const pedido =
        localStorage.getItem(
            "ultimoPedido"
        );

    if (!pedido) {

        window.location.href =
            "productos.html";
    }
}


function controlarAccesoClienteGeneral() {

    const usuario =
        obtenerUsuarioActivoGeneral();

    if (!usuario) {

        return;
    }

    if (
        usuario.rol === "Administrador" ||
        usuario.rol === "Vendedor"
    ) {

        const botonesCompra =
            document.querySelectorAll(
                ".solo-cliente"
            );

        botonesCompra.forEach(
            function(elemento) {

                elemento.style.display =
                    "none";
            }
        );
    }
}


actualizarCarritoGeneral();

mostrarSesionGeneral();

crearAccesoPanelGeneral();

protegerCompraExitosaGeneral();

controlarAccesoClienteGeneral();