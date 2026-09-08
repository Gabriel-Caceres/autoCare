const pedidosIniciales = [

    {
        id: 1001,

        cliente: "Cliente Prueba",

        correo: "cliente@gmail.com",

        fecha: "05/09/2026",

        estado: "Pendiente",

        direccion: "Providencia, Santiago",

        productos: [

            {
                codigo: "AUT001",
                nombre: "Kit Lavado Premium",
                precio: 24990,
                cantidad: 1
            },

            {
                codigo: "AUT004",
                nombre: "Paños de Microfibra",
                precio: 7990,
                cantidad: 2
            }

        ]
    },

    {
        id: 1002,

        cliente: "María González",

        correo: "maria@gmail.com",

        fecha: "05/09/2026",

        estado: "Preparando",

        direccion: "San Miguel, Santiago",

        productos: [

            {
                codigo: "AUT006",
                nombre: "Kit de Emergencia",
                precio: 34990,
                cantidad: 1
            }

        ]
    },

    {
        id: 1003,

        cliente: "Carlos Pérez",

        correo: "carlos@duoc.cl",

        fecha: "06/09/2026",

        estado: "Entregado",

        direccion: "Santiago, Santiago",

        productos: [

            {
                codigo: "AUT002",
                nombre: "Aspiradora Portátil 12V",
                precio: 32990,
                cantidad: 1
            },

            {
                codigo: "AUT005",
                nombre: "Soporte para Celular",
                precio: 12990,
                cantidad: 1
            }

        ]
    }

];


const tablaPedidos =
    document.getElementById(
        "tablaPedidos"
    );

const buscarPedido =
    document.getElementById(
        "buscarPedido"
    );

const mensajePedidos =
    document.getElementById(
        "mensajePedidos"
    );


function obtenerPedidosAdmin() {

    try {

        const datos =
            localStorage.getItem(
                "pedidos"
            );


        if (datos === null) {

            localStorage.setItem(
                "pedidos",
                JSON.stringify(
                    pedidosIniciales
                )
            );


            return pedidosIniciales;
        }


        const pedidos =
            JSON.parse(
                datos
            );


        if (
            Array.isArray(
                pedidos
            )
        ) {

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


function calcularTotalPedido(
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


function formatoPrecioPedido(
    valor
) {

    return "$" +
        Number(
            valor
        ).toLocaleString(
            "es-CL"
        );
}


function obtenerNombreClientePedido(
    pedido
) {

    if (
        pedido.cliente
    ) {

        return pedido.cliente;
    }


    if (
        pedido.usuario
    ) {

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


function obtenerCorreoPedido(
    pedido
) {

    if (
        pedido.correo
    ) {

        return pedido.correo;
    }


    if (
        pedido.usuario &&
        pedido.usuario.correo
    ) {

        return pedido.usuario.correo;
    }


    return "Sin correo";
}


function obtenerFechaPedido(
    pedido
) {

    if (
        pedido.fecha
    ) {

        return pedido.fecha;
    }


    return "Sin fecha";
}


function obtenerEstadoPedido(
    pedido
) {

    if (
        pedido.estado
    ) {

        return pedido.estado;
    }


    return "Pendiente";
}


function claseEstadoPedido(
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


function mostrarPedidosAdmin(
    lista
) {

    if (!tablaPedidos) {

        return;
    }


    tablaPedidos.innerHTML =
        "";


    if (mensajePedidos) {

        mensajePedidos.textContent =
            "";
    }


    if (
        lista.length === 0
    ) {

        if (mensajePedidos) {

            mensajePedidos.innerHTML = `

                <div class="admin-vacio">

                    <h3>
                        No se encontraron pedidos
                    </h3>

                    <p>
                        Intenta realizar otra búsqueda.
                    </p>

                </div>
            `;
        }


        return;
    }


    lista.forEach(
        function(pedido) {

            const fila =
                document.createElement(
                    "tr"
                );


            const cliente =
                obtenerNombreClientePedido(
                    pedido
                );


            const correo =
                obtenerCorreoPedido(
                    pedido
                );


            const estado =
                obtenerEstadoPedido(
                    pedido
                );


            const total =
                calcularTotalPedido(
                    pedido
                );


            fila.innerHTML = `

                <td>
                    #${pedido.id}
                </td>

                <td>

                    <strong>
                        ${cliente}
                    </strong>

                    <br>

                    <small>
                        ${correo}
                    </small>

                </td>

                <td>
                    ${obtenerFechaPedido(pedido)}
                </td>

                <td>
                    ${formatoPrecioPedido(total)}
                </td>

                <td>

                    <span
                        class="estado-pedido ${claseEstadoPedido(estado)}"
                    >
                        ${estado}
                    </span>

                </td>

                <td>

                    <div class="acciones-tabla">

                        <a
                            href="detalle-pedido.html?id=${pedido.id}"
                            class="btn-editar"
                        >
                            Ver detalle
                        </a>

                    </div>

                </td>
            `;


            tablaPedidos.appendChild(
                fila
            );
        }
    );
}


function filtrarPedidosAdmin() {

    const pedidos =
        obtenerPedidosAdmin();


    if (!buscarPedido) {

        mostrarPedidosAdmin(
            pedidos
        );


        return;
    }


    const texto =
        buscarPedido.value
            .trim()
            .toLowerCase();


    if (
        texto === ""
    ) {

        mostrarPedidosAdmin(
            pedidos
        );


        return;
    }


    const resultado =
        pedidos.filter(
            function(pedido) {

                const id =
                    String(
                        pedido.id || ""
                    ).toLowerCase();


                const cliente =
                    obtenerNombreClientePedido(
                        pedido
                    ).toLowerCase();


                const correo =
                    obtenerCorreoPedido(
                        pedido
                    ).toLowerCase();


                const estado =
                    obtenerEstadoPedido(
                        pedido
                    ).toLowerCase();


                return (
                    id.includes(texto) ||
                    cliente.includes(texto) ||
                    correo.includes(texto) ||
                    estado.includes(texto)
                );
            }
        );


    mostrarPedidosAdmin(
        resultado
    );
}


if (buscarPedido) {

    buscarPedido.addEventListener(
        "input",
        filtrarPedidosAdmin
    );
}


mostrarPedidosAdmin(
    obtenerPedidosAdmin()
);