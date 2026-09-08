const listaCarrito =
    document.getElementById("listaCarrito");

const resumenCantidad =
    document.getElementById("resumenCantidad");

const resumenSubtotal =
    document.getElementById("resumenSubtotal");

const resumenTotal =
    document.getElementById("resumenTotal");

const btnVaciarCarrito =
    document.getElementById("btnVaciarCarrito");

const btnFinalizarCompra =
    document.getElementById("btnFinalizarCompra");


function obtenerCarrito() {

    try {

        const datos =
            localStorage.getItem("carrito");

        if (!datos) {
            return [];
        }

        const carrito =
            JSON.parse(datos);

        if (Array.isArray(carrito)) {
            return carrito;
        }

        return [];

    } catch (error) {

        return [];
    }
}


function guardarCarrito(carrito) {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
}


function obtenerProductosActuales() {

    if (
        typeof obtenerProductosTienda ===
        "function"
    ) {

        return obtenerProductosTienda();
    }

    return [];
}


function formatoPrecio(precio) {

    return "$" +
        Number(precio).toLocaleString(
            "es-CL"
        );
}


function sincronizarCarrito() {

    const carrito =
        obtenerCarrito();

    const productos =
        obtenerProductosActuales();

    const carritoActualizado = [];


    carrito.forEach(function(item) {

        const productoActual =
            productos.find(
                function(producto) {

                    return (
                        producto.codigo ===
                        item.codigo
                    );
                }
            );


        if (!productoActual) {
            return;
        }


        let cantidad =
            Number(item.cantidad);

        const stock =
            Number(productoActual.stock);


        if (cantidad > stock) {

            cantidad = stock;
        }


        if (cantidad <= 0) {
            return;
        }


        carritoActualizado.push({

            codigo:
                productoActual.codigo,

            nombre:
                productoActual.nombre,

            precio:
                Number(
                    productoActual.precio
                ),

            imagen:
                productoActual.imagen,

            stock:
                stock,

            cantidad:
                cantidad

        });
    });


    guardarCarrito(
        carritoActualizado
    );


    return carritoActualizado;
}


function calcularResumen(carrito) {

    let cantidad = 0;

    let subtotal = 0;


    carrito.forEach(
        function(producto) {

            cantidad +=
                Number(
                    producto.cantidad
                );

            subtotal +=
                Number(
                    producto.precio
                ) *
                Number(
                    producto.cantidad
                );
        }
    );


    if (resumenCantidad) {

        resumenCantidad.textContent =
            cantidad;
    }


    if (resumenSubtotal) {

        resumenSubtotal.textContent =
            formatoPrecio(subtotal);
    }


    if (resumenTotal) {

        resumenTotal.textContent =
            formatoPrecio(subtotal);
    }


    const contadorHeader =
        document.getElementById(
            "cantidadCarrito"
        );


    if (contadorHeader) {

        contadorHeader.textContent =
            cantidad;
    }
}


function mostrarCarrito() {

    if (!listaCarrito) {
        return;
    }


    const carrito =
        sincronizarCarrito();


    listaCarrito.innerHTML = "";


    if (carrito.length === 0) {

        listaCarrito.innerHTML = `

            <div class="carrito-vacio">

                <h2>
                    Tu carrito está vacío
                </h2>

                <p>
                    Agrega productos para
                    comenzar tu compra.
                </p>

                <a
                    href="productos.html"
                    class="btn btn-principal"
                >
                    Ver productos
                </a>

            </div>

        `;


        calcularResumen([]);


        if (btnFinalizarCompra) {

            btnFinalizarCompra.disabled =
                true;
        }


        if (btnVaciarCarrito) {

            btnVaciarCarrito.disabled =
                true;
        }


        return;
    }


    if (btnFinalizarCompra) {

        btnFinalizarCompra.disabled =
            false;
    }


    if (btnVaciarCarrito) {

        btnVaciarCarrito.disabled =
            false;
    }


    carrito.forEach(
        function(producto) {

            const item =
                document.createElement(
                    "article"
                );


            item.className =
                "carrito-item";


            item.innerHTML = `

                <div class="carrito-item-imagen">

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                    >

                </div>


                <div class="carrito-item-info">

                    <span class="producto-codigo">
                        ${producto.codigo}
                    </span>

                    <h3>
                        ${producto.nombre}
                    </h3>

                    <p>
                        Precio unitario:
                        ${formatoPrecio(
                            producto.precio
                        )}
                    </p>

                    <p>
                        Stock disponible:
                        ${producto.stock}
                    </p>

                    <button
                        type="button"
                        class="btn-eliminar"
                        data-codigo="${producto.codigo}"
                    >
                        Eliminar
                    </button>

                </div>


                <div class="control-cantidad">

                    <button
                        type="button"
                        class="btn-restar"
                        data-codigo="${producto.codigo}"
                    >
                        −
                    </button>

                    <span>
                        ${producto.cantidad}
                    </span>

                    <button
                        type="button"
                        class="btn-sumar"
                        data-codigo="${producto.codigo}"
                    >
                        +
                    </button>

                </div>


                <div class="carrito-item-precio">

                    ${formatoPrecio(
                        Number(
                            producto.precio
                        ) *
                        Number(
                            producto.cantidad
                        )
                    )}

                </div>

            `;


            listaCarrito.appendChild(
                item
            );
        }
    );


    calcularResumen(carrito);

    activarEventosCarrito();
}


function activarEventosCarrito() {

    const botonesSumar =
        document.querySelectorAll(
            ".btn-sumar"
        );


    botonesSumar.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    cambiarCantidad(
                        boton.dataset.codigo,
                        1
                    );
                }
            );
        }
    );


    const botonesRestar =
        document.querySelectorAll(
            ".btn-restar"
        );


    botonesRestar.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    cambiarCantidad(
                        boton.dataset.codigo,
                        -1
                    );
                }
            );
        }
    );


    const botonesEliminar =
        document.querySelectorAll(
            ".btn-eliminar"
        );


    botonesEliminar.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    eliminarProducto(
                        boton.dataset.codigo
                    );
                }
            );
        }
    );
}


function cambiarCantidad(
    codigo,
    cambio
) {

    const carrito =
        obtenerCarrito();


    const producto =
        carrito.find(
            function(item) {

                return (
                    item.codigo ===
                    codigo
                );
            }
        );


    if (!producto) {
        return;
    }


    const nuevaCantidad =
        Number(
            producto.cantidad
        ) +
        Number(cambio);


    if (nuevaCantidad <= 0) {

        eliminarProducto(codigo);

        return;
    }


    if (
        nuevaCantidad >
        Number(producto.stock)
    ) {

        alert(
            "No puedes superar el stock disponible."
        );

        return;
    }


    producto.cantidad =
        nuevaCantidad;


    guardarCarrito(carrito);

    mostrarCarrito();
}


function eliminarProducto(codigo) {

    const carrito =
        obtenerCarrito();


    const producto =
        carrito.find(
            function(item) {

                return (
                    item.codigo ===
                    codigo
                );
            }
        );


    if (!producto) {
        return;
    }


    const confirmar =
        confirm(
            "¿Deseas eliminar " +
            producto.nombre +
            " del carrito?"
        );


    if (!confirmar) {
        return;
    }


    const nuevoCarrito =
        carrito.filter(
            function(item) {

                return (
                    item.codigo !==
                    codigo
                );
            }
        );


    guardarCarrito(
        nuevoCarrito
    );


    mostrarCarrito();
}


function vaciarCarrito() {

    const carrito =
        obtenerCarrito();


    if (carrito.length === 0) {
        return;
    }


    const confirmar =
        confirm(
            "¿Deseas vaciar todo el carrito?"
        );


    if (!confirmar) {
        return;
    }


    guardarCarrito([]);

    mostrarCarrito();
}


function obtenerUsuarioActivo() {

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


function obtenerDireccionUsuario(
    correo
) {

    let usuarios = [];


    try {

        usuarios =
            JSON.parse(
                localStorage.getItem(
                    "usuariosAdmin"
                )
            ) || [];

    } catch (error) {

        usuarios = [];
    }


    const usuario =
        usuarios.find(
            function(item) {

                return (
                    item.correo &&
                    item.correo
                        .toLowerCase() ===
                    correo.toLowerCase()
                );
            }
        );


    if (!usuario) {

        return "Sin dirección registrada";
    }


    const partes = [];


    if (usuario.direccion) {

        partes.push(
            usuario.direccion
        );
    }


    if (usuario.comuna) {

        partes.push(
            usuario.comuna
        );
    }


    if (usuario.region) {

        partes.push(
            usuario.region
        );
    }


    if (partes.length === 0) {

        return "Sin dirección registrada";
    }


    return partes.join(", ");
}


function obtenerNuevoIdPedido(
    pedidos
) {

    if (pedidos.length === 0) {

        return 1001;
    }


    const ids =
        pedidos.map(
            function(pedido) {

                return Number(
                    pedido.id
                );
            }
        );


    return Math.max(...ids) + 1;
}


function descontarStock(
    carrito
) {

    const productos =
        obtenerProductosActuales();


    carrito.forEach(
        function(item) {

            const producto =
                productos.find(
                    function(productoActual) {

                        return (
                            productoActual.codigo ===
                            item.codigo
                        );
                    }
                );


            if (producto) {

                producto.stock =
                    Number(
                        producto.stock
                    ) -
                    Number(
                        item.cantidad
                    );


                if (producto.stock < 0) {

                    producto.stock = 0;
                }
            }
        }
    );


    localStorage.setItem(
        "productosAdmin",
        JSON.stringify(productos)
    );
}


function finalizarCompra() {

    const carrito =
        sincronizarCarrito();


    if (carrito.length === 0) {

        alert(
            "Tu carrito está vacío."
        );

        return;
    }


    const usuario =
        obtenerUsuarioActivo();


    if (!usuario) {

        alert(
            "Debes iniciar sesión como cliente para finalizar la compra."
        );


        window.location.href =
            "login.html";


        return;
    }


    if (usuario.rol !== "Cliente") {

        alert(
            "Solo los clientes pueden realizar compras."
        );

        return;
    }


    const productosActuales =
        obtenerProductosActuales();


    for (
        let i = 0;
        i < carrito.length;
        i++
    ) {

        const item =
            carrito[i];


        const producto =
            productosActuales.find(
                function(actual) {

                    return (
                        actual.codigo ===
                        item.codigo
                    );
                }
            );


        if (
            !producto ||
            Number(item.cantidad) >
            Number(producto.stock)
        ) {

            alert(
                "El stock de algunos productos cambió. Revisa tu carrito."
            );


            mostrarCarrito();

            return;
        }
    }


    let total = 0;


    carrito.forEach(
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


    let pedidos = [];


    try {

        pedidos =
            JSON.parse(
                localStorage.getItem(
                    "pedidos"
                )
            ) || [];

    } catch (error) {

        pedidos = [];
    }


    const fecha =
        new Date().toLocaleDateString(
            "es-CL"
        );


    const nuevoPedido = {

        id:
            obtenerNuevoIdPedido(
                pedidos
            ),

        cliente:
            usuario.nombre,

        correo:
            usuario.correo,

        fecha:
            fecha,

        estado:
            "Pendiente",

        direccion:
            obtenerDireccionUsuario(
                usuario.correo
            ),

        productos:
            carrito.map(
                function(producto) {

                    return {

                        codigo:
                            producto.codigo,

                        nombre:
                            producto.nombre,

                        precio:
                            Number(
                                producto.precio
                            ),

                        cantidad:
                            Number(
                                producto.cantidad
                            )

                    };
                }
            ),

        total:
            total

    };


    pedidos.push(
        nuevoPedido
    );


    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );


    localStorage.setItem(
        "ultimoPedido",
        JSON.stringify(
            nuevoPedido
        )
    );


    descontarStock(carrito);

    guardarCarrito([]);


    window.location.href =
        "compra-exitosa.html";
}


if (listaCarrito) {

    if (btnVaciarCarrito) {

        btnVaciarCarrito.addEventListener(
            "click",
            vaciarCarrito
        );
    }


    if (btnFinalizarCompra) {

        btnFinalizarCompra.addEventListener(
            "click",
            finalizarCompra
        );
    }


    mostrarCarrito();
}