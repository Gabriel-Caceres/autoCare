const tituloPedido =
    document.getElementById(
        "tituloPedido"
    );

const detallePedido =
    document.getElementById(
        "detallePedido"
    );

const parametrosDetallePedido =
    new URLSearchParams(
        window.location.search
    );

const pedidoIdDetalle =
    parametrosDetallePedido.get(
        "id"
    );


function obtenerPedidosDetalle() {

    try {

        const datos =
            localStorage.getItem(
                "pedidos"
            );

        if (!datos) {

            return [];
        }

        const pedidos =
            JSON.parse(datos);

        if (Array.isArray(pedidos)) {

            return pedidos;
        }

        return [];

    } catch (error) {

        console.error(
            "Error al cargar los pedidos:",
            error
        );

        return [];
    }
}


function guardarPedidosDetalle(
    pedidos
) {

    localStorage.setItem(
        "pedidos",
        JSON.stringify(
            pedidos
        )
    );
}


function obtenerUsuarioDetallePedido() {

    try {

        const datos =
            localStorage.getItem(
                "usuarioActivo"
            );

        if (!datos) {

            return null;
        }

        return JSON.parse(datos);

    } catch (error) {

        return null;
    }
}


function esAdministradorDetallePedido() {

    const usuario =
        obtenerUsuarioDetallePedido();

    return (
        usuario &&
        usuario.rol === "Administrador"
    );
}


function formatoPrecioDetallePedido(
    valor
) {

    return "$" +
        Number(
            valor
        ).toLocaleString(
            "es-CL"
        );
}


function calcularTotalDetallePedido(
    pedido
) {

    if (
        pedido.total !== undefined &&
        pedido.total !== null &&
        !Number.isNaN(
            Number(
                pedido.total
            )
        )
    ) {

        return Number(
            pedido.total
        );
    }

    if (
        !Array.isArray(
            pedido.productos
        )
    ) {

        return 0;
    }

    let total = 0;

    pedido.productos.forEach(
        function(producto) {

            const precio =
                Number(
                    producto.precio
                ) || 0;

            const cantidad =
                Number(
                    producto.cantidad
                ) || 0;

            total +=
                precio *
                cantidad;
        }
    );

    return total;
}


function obtenerClienteDetallePedido(
    pedido
) {

    if (pedido.cliente) {

        return pedido.cliente;
    }

    if (pedido.usuario) {

        const nombre =
            pedido.usuario.nombre || "";

        const apellidos =
            pedido.usuario.apellidos || "";

        const nombreCompleto =
            (
                nombre +
                " " +
                apellidos
            ).trim();

        if (
            nombreCompleto !== ""
        ) {

            return nombreCompleto;
        }
    }

    return "Cliente";
}


function obtenerCorreoDetallePedido(
    pedido
) {

    if (pedido.correo) {

        return pedido.correo;
    }

    if (
        pedido.usuario &&
        pedido.usuario.correo
    ) {

        return pedido.usuario.correo;
    }

    return "Sin correo registrado";
}


function obtenerDireccionDetallePedido(
    pedido
) {

    if (pedido.direccion) {

        return pedido.direccion;
    }

    if (
        pedido.usuario &&
        pedido.usuario.direccion
    ) {

        return pedido.usuario.direccion;
    }

    return "Sin dirección registrada";
}


function obtenerFechaDetallePedido(
    pedido
) {

    return (
        pedido.fecha ||
        "Sin fecha"
    );
}


function obtenerEstadoDetallePedido(
    pedido
) {

    return (
        pedido.estado ||
        "Pendiente"
    );
}


function claseEstadoDetallePedido(
    estado
) {

    const valor =
        String(
            estado || ""
        ).toLowerCase();

    if (
        valor === "entregado"
    ) {

        return "estado-entregado";
    }

    if (
        valor === "preparando"
    ) {

        return "estado-preparando";
    }

    if (
        valor === "cancelado"
    ) {

        return "estado-cancelado";
    }

    return "estado-pendiente";
}


function crearProductosDetallePedido(
    pedido
) {

    if (
        !Array.isArray(
            pedido.productos
        ) ||
        pedido.productos.length === 0
    ) {

        return `
            <div class="admin-vacio">
                <h3>Sin productos</h3>
                <p>
                    Este pedido no tiene productos registrados.
                </p>
            </div>
        `;
    }

    let productosHTML = "";

    pedido.productos.forEach(
        function(producto) {

            const precio =
                Number(
                    producto.precio
                ) || 0;

            const cantidad =
                Number(
                    producto.cantidad
                ) || 0;

            const subtotal =
                precio *
                cantidad;

            productosHTML += `
                <tr>
                    <td>
                        ${producto.codigo || "-"}
                    </td>

                    <td>
                        ${producto.nombre || "Producto"}
                    </td>

                    <td>
                        ${formatoPrecioDetallePedido(precio)}
                    </td>

                    <td>
                        ${cantidad}
                    </td>

                    <td>
                        ${formatoPrecioDetallePedido(subtotal)}
                    </td>
                </tr>
            `;
        }
    );

    return `
        <div class="tabla-responsive">

            <table class="admin-tabla">

                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>

                <tbody>
                    ${productosHTML}
                </tbody>

            </table>

        </div>
    `;
}


function crearControlEstadoDetallePedido(
    pedido
) {

    const estado =
        obtenerEstadoDetallePedido(
            pedido
        );

    if (
        !esAdministradorDetallePedido()
    ) {

        return `
            <div class="pedido-estado-control">

                <label>
                    Estado del pedido
                </label>

                <p>
                    <span
                        class="estado-pedido ${claseEstadoDetallePedido(estado)}"
                    >
                        ${estado}
                    </span>
                </p>

                <small>
                    El vendedor puede consultar el pedido,
                    pero no modificar su estado.
                </small>

            </div>
        `;
    }

    return `
        <div class="pedido-estado-control">

            <label for="estadoPedido">
                Estado del pedido
            </label>

            <select id="estadoPedido">

                <option
                    value="Pendiente"
                    ${estado === "Pendiente" ? "selected" : ""}
                >
                    Pendiente
                </option>

                <option
                    value="Preparando"
                    ${estado === "Preparando" ? "selected" : ""}
                >
                    Preparando
                </option>

                <option
                    value="Entregado"
                    ${estado === "Entregado" ? "selected" : ""}
                >
                    Entregado
                </option>

                <option
                    value="Cancelado"
                    ${estado === "Cancelado" ? "selected" : ""}
                >
                    Cancelado
                </option>

            </select>

            <button
                type="button"
                id="btnActualizarEstado"
                class="btn btn-principal"
            >
                Actualizar estado
            </button>

            <p
                id="mensajeEstado"
                class="mensaje-estado"
            ></p>

        </div>
    `;
}


function mostrarDetallePedido() {

    if (!detallePedido) {

        return;
    }

    const pedidos =
        obtenerPedidosDetalle();

    const pedido =
        pedidos.find(
            function(item) {

                return (
                    String(
                        item.id
                    ) ===
                    String(
                        pedidoIdDetalle
                    )
                );
            }
        );

    if (!pedido) {

        if (tituloPedido) {

            tituloPedido.textContent =
                "Pedido no encontrado";
        }

        detallePedido.innerHTML = `
            <div class="admin-vacio">

                <h3>
                    Pedido no encontrado
                </h3>

                <p>
                    No existe el pedido seleccionado.
                </p>

                <br>

                <a
                    href="pedidos.html"
                    class="btn btn-principal"
                >
                    Volver
                </a>

            </div>
        `;

        return;
    }

    if (tituloPedido) {

        tituloPedido.textContent =
            "Pedido #" +
            pedido.id;
    }

    const cliente =
        obtenerClienteDetallePedido(
            pedido
        );

    const correo =
        obtenerCorreoDetallePedido(
            pedido
        );

    const direccion =
        obtenerDireccionDetallePedido(
            pedido
        );

    const fecha =
        obtenerFechaDetallePedido(
            pedido
        );

    const total =
        calcularTotalDetallePedido(
            pedido
        );

    detallePedido.innerHTML = `
        <div class="pedido-info-grid">

            <article class="pedido-info-card">

                <span>
                    CLIENTE
                </span>

                <h3>
                    ${cliente}
                </h3>

                <p>
                    ${correo}
                </p>

            </article>


            <article class="pedido-info-card">

                <span>
                    FECHA
                </span>

                <h3>
                    ${fecha}
                </h3>

                <p>
                    Pedido #${pedido.id}
                </p>

            </article>


            <article class="pedido-info-card">

                <span>
                    DIRECCIÓN
                </span>

                <h3>
                    Entrega
                </h3>

                <p>
                    ${direccion}
                </p>

            </article>

        </div>


        <section class="pedido-productos">

            <h2>
                Productos
            </h2>

            ${crearProductosDetallePedido(pedido)}

        </section>


        <section class="pedido-final">

            ${crearControlEstadoDetallePedido(pedido)}

            <div class="pedido-total">

                <span>
                    TOTAL DEL PEDIDO
                </span>

                <strong>
                    ${formatoPrecioDetallePedido(total)}
                </strong>

            </div>

        </section>
    `;

    if (
        esAdministradorDetallePedido()
    ) {

        const botonActualizar =
            document.getElementById(
                "btnActualizarEstado"
            );

        if (botonActualizar) {

            botonActualizar.addEventListener(
                "click",
                actualizarEstadoDetallePedido
            );
        }
    }
}


function actualizarEstadoDetallePedido() {

    if (
        !esAdministradorDetallePedido()
    ) {

        alert(
            "Solo el administrador puede modificar el estado del pedido."
        );

        return;
    }

    const pedidos =
        obtenerPedidosDetalle();

    const indice =
        pedidos.findIndex(
            function(pedido) {

                return (
                    String(
                        pedido.id
                    ) ===
                    String(
                        pedidoIdDetalle
                    )
                );
            }
        );

    if (
        indice === -1
    ) {

        return;
    }

    const selectEstado =
        document.getElementById(
            "estadoPedido"
        );

    const mensaje =
        document.getElementById(
            "mensajeEstado"
        );

    if (!selectEstado) {

        return;
    }

    pedidos[indice].estado =
        selectEstado.value;

    guardarPedidosDetalle(
        pedidos
    );

    if (mensaje) {

        mensaje.textContent =
            "Estado actualizado correctamente.";

        mensaje.className =
            "mensaje-estado mensaje-estado-correcto";
    }

    setTimeout(
        function() {

            mostrarDetallePedido();
        },
        500
    );
}


mostrarDetallePedido();