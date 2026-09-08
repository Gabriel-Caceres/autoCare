function obtenerDatosDashboard(
    clave
) {

    try {

        const datos =
            localStorage.getItem(
                clave
            );

        if (!datos) {
            return [];
        }

        const resultado =
            JSON.parse(datos);

        if (
            Array.isArray(
                resultado
            )
        ) {

            return resultado;
        }

        return [];

    } catch (error) {

        console.error(
            "Error al cargar " +
            clave,
            error
        );

        return [];
    }
}


function obtenerProductosDashboard() {

    return obtenerDatosDashboard(
        "productosAdmin"
    );
}


function obtenerUsuariosDashboard() {

    return obtenerDatosDashboard(
        "usuariosAdmin"
    );
}


function obtenerPedidosDashboard() {

    return obtenerDatosDashboard(
        "pedidos"
    );
}


function formatoPrecioDashboard(
    valor
) {

    return "$" +
        Number(
            valor
        ).toLocaleString(
            "es-CL"
        );
}


function calcularTotalPedidoDashboard(
    pedido
) {

    if (
        pedido.total !== undefined &&
        pedido.total !== null
    ) {

        return Number(
            pedido.total
        ) || 0;
    }


    let total = 0;


    if (
        !Array.isArray(
            pedido.productos
        )
    ) {

        return total;
    }


    pedido.productos.forEach(
        function(producto) {

            total +=
                Number(
                    producto.precio
                ) *
                Number(
                    producto.cantidad
                );
        }
    );


    return total;
}


function actualizarTexto(
    id,
    valor
) {

    const elemento =
        document.getElementById(
            id
        );


    if (elemento) {

        elemento.textContent =
            valor;
    }
}


function mostrarResumenDashboard() {

    const productos =
        obtenerProductosDashboard();

    const usuarios =
        obtenerUsuariosDashboard();

    const pedidos =
        obtenerPedidosDashboard();


    let ventas = 0;


    pedidos.forEach(
        function(pedido) {

            ventas +=
                calcularTotalPedidoDashboard(
                    pedido
                );
        }
    );


    actualizarTexto(
        "totalProductos",
        productos.length
    );


    actualizarTexto(
        "totalUsuarios",
        usuarios.length
    );


    actualizarTexto(
        "totalPedidos",
        pedidos.length
    );


    actualizarTexto(
        "totalVentas",
        formatoPrecioDashboard(
            ventas
        )
    );
}


function mostrarUltimosPedidos() {

    const contenedor =
        document.getElementById(
            "ultimosPedidos"
        );


    if (!contenedor) {
        return;
    }


    const pedidos =
        obtenerPedidosDashboard();


    if (
        pedidos.length === 0
    ) {

        contenedor.innerHTML = `
            <div class="admin-vacio">

                <h3>
                    No hay pedidos
                </h3>

                <p>
                    Los pedidos realizados
                    aparecerán aquí.
                </p>

            </div>
        `;

        return;
    }


    const ultimos =
        pedidos
            .slice()
            .reverse()
            .slice(
                0,
                4
            );


    contenedor.innerHTML = "";


    ultimos.forEach(
        function(pedido) {

            const elemento =
                document.createElement(
                    "div"
                );


            elemento.className =
                "dashboard-pedido";


            elemento.innerHTML = `
                <div>

                    <strong>
                        Pedido #${pedido.id}
                    </strong>

                    <span>
                        ${pedido.cliente || "Cliente"}
                    </span>

                </div>

                <div>

                    <strong>
                        ${formatoPrecioDashboard(
                            calcularTotalPedidoDashboard(
                                pedido
                            )
                        )}
                    </strong>

                    <span>
                        ${pedido.estado || "Pendiente"}
                    </span>

                </div>

                <a
                    href="detalle-pedido.html?id=${pedido.id}"
                >
                    Ver
                </a>
            `;


            contenedor.appendChild(
                elemento
            );
        }
    );
}


function mostrarStockBajo() {

    const contenedor =
        document.getElementById(
            "productosStockBajo"
        );


    if (!contenedor) {
        return;
    }


    const productos =
        obtenerProductosDashboard();


    const stockBajo =
        productos.filter(
            function(producto) {

                const stock =
                    Number(
                        producto.stock
                    );

                const stockCritico =
                    Number(
                        producto.stockCritico
                    );


                if (
                    producto.stockCritico !== undefined &&
                    producto.stockCritico !== "" &&
                    !Number.isNaN(
                        stockCritico
                    )
                ) {

                    return (
                        stock <=
                        stockCritico
                    );
                }


                return (
                    stock <= 5
                );
            }
        );


    if (
        stockBajo.length === 0
    ) {

        contenedor.innerHTML = `
            <div class="admin-vacio">

                <h3>
                    Stock disponible
                </h3>

                <p>
                    No existen productos
                    con stock bajo.
                </p>

            </div>
        `;

        return;
    }


    contenedor.innerHTML = "";


    stockBajo.forEach(
        function(producto) {

            const elemento =
                document.createElement(
                    "div"
                );


            elemento.className =
                "dashboard-stock";


            elemento.innerHTML = `
                <div>

                    <strong>
                        ${producto.nombre}
                    </strong>

                    <span>
                        ${producto.codigo}
                    </span>

                </div>

                <div>

                    <strong>
                        ${Number(
                            producto.stock
                        )}
                    </strong>

                    <span>
                        unidades
                    </span>

                </div>
            `;


            contenedor.appendChild(
                elemento
            );
        }
    );
}


mostrarResumenDashboard();

mostrarUltimosPedidos();

mostrarStockBajo();