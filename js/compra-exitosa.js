const detalleCompra =
    document.getElementById(
        "detalleCompra"
    );


function formatoPrecio(precio) {

    return "$" +
        Number(precio).toLocaleString(
            "es-CL"
        );

}


function obtenerUltimoPedido() {

    return JSON.parse(
        localStorage.getItem(
            "ultimoPedido"
        )
    );

}


function mostrarCompraExitosa() {

    const pedido =
        obtenerUltimoPedido();


    if (!pedido) {

        detalleCompra.innerHTML = `

            <div class="compra-sin-pedido">

                <h2>
                    No existe una compra reciente
                </h2>

                <a
                    href="productos.html"
                    class="btn btn-principal">

                    Ver productos

                </a>

            </div>
        `;


        return;

    }


    detalleCompra.innerHTML = `

        <div class="compra-icono">
            ✓
        </div>


        <span class="compra-etiqueta">
            COMPRA REALIZADA
        </span>


        <h1>
            ¡Gracias por tu compra!
        </h1>


        <p class="compra-texto">

            Tu pedido fue registrado
            correctamente en AutoCare.

        </p>


        <div class="compra-resumen">

            <div>

                <span>
                    Número de pedido
                </span>

                <strong>
                    #${pedido.id}
                </strong>

            </div>


            <div>

                <span>
                    Cliente
                </span>

                <strong>
                    ${pedido.cliente}
                </strong>

            </div>


            <div>

                <span>
                    Fecha
                </span>

                <strong>
                    ${pedido.fecha}
                </strong>

            </div>


            <div>

                <span>
                    Estado
                </span>

                <strong>
                    ${pedido.estado}
                </strong>

            </div>


            <div>

                <span>
                    Total
                </span>

                <strong>

                    ${formatoPrecio(
                        pedido.total
                    )}

                </strong>

            </div>

        </div>


        <div class="compra-direccion">

            <strong>
                Dirección de entrega
            </strong>

            <p>
                ${pedido.direccion}
            </p>

        </div>


        <div class="compra-botones">

            <a
                href="productos.html"
                class="btn btn-secundario">

                Seguir comprando

            </a>


            <a
                href="index.html"
                class="btn btn-principal">

                Volver al inicio

            </a>

        </div>
    `;


    activarSalidaCompra();

}


function activarSalidaCompra() {

    const enlaces =
        document.querySelectorAll(
            ".compra-botones a"
        );


    enlaces.forEach(function(enlace) {

        enlace.addEventListener(
            "click",
            function() {

                localStorage.removeItem(
                    "ultimoPedido"
                );

            }
        );

    });

}


mostrarCompraExitosa();