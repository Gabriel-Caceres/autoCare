const detalleProducto =
    document.getElementById("detalleProducto");

const cantidadCarrito =
    document.getElementById("cantidadCarrito");

const parametros =
    new URLSearchParams(window.location.search);

const codigoProducto =
    parametros.get("codigo");


function formatoPrecio(precio) {

    return "$" +
        Number(precio).toLocaleString("es-CL");
}


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

        console.error(
            "Error al leer el carrito:",
            error
        );

        return [];
    }
}


function guardarCarrito(carrito) {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
}


function actualizarCantidadCarrito() {

    if (!cantidadCarrito) {
        return;
    }

    const carrito =
        obtenerCarrito();

    let cantidad = 0;

    carrito.forEach(function(producto) {

        cantidad +=
            Number(producto.cantidad);
    });

    cantidadCarrito.textContent =
        cantidad;
}


function mostrarDetalle() {

    if (!detalleProducto) {
        return;
    }

    if (
        typeof obtenerProductosTienda !==
        "function"
    ) {

        detalleProducto.innerHTML = `
            <div class="producto-no-encontrado">

                <h2>
                    No se pudieron cargar los productos
                </h2>

                <a
                    href="productos.html"
                    class="btn btn-principal"
                >
                    Volver a productos
                </a>

            </div>
        `;

        return;
    }

    const productos =
        obtenerProductosTienda();

    const producto =
        productos.find(function(item) {

            return (
                item.codigo ===
                codigoProducto
            );
        });

    if (!producto) {

        detalleProducto.innerHTML = `
            <div class="producto-no-encontrado">

                <h2>
                    Producto no encontrado
                </h2>

                <p>
                    El producto solicitado
                    no está disponible.
                </p>

                <a
                    href="productos.html"
                    class="btn btn-principal"
                >
                    Volver a productos
                </a>

            </div>
        `;

        return;
    }

    const stock =
        Number(producto.stock);

    detalleProducto.innerHTML = `

        <div class="detalle-contenedor">

            <div class="detalle-imagen">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                >

            </div>


            <div class="detalle-informacion">

                <span class="producto-categoria">
                    ${producto.categoria}
                </span>

                <p class="detalle-codigo">
                    Código: ${producto.codigo}
                </p>

                <h2>
                    ${producto.nombre}
                </h2>

                <p class="detalle-descripcion">
                    ${producto.descripcion}
                </p>

                <div class="detalle-datos">

                    <p>
                        <strong>Stock:</strong>
                        ${stock} unidades
                    </p>

                </div>

                <p class="detalle-precio">
                    ${formatoPrecio(producto.precio)}
                </p>

                <div class="detalle-cantidad">

                    <label for="cantidadProducto">
                        Cantidad
                    </label>

                    <input
                        type="number"
                        id="cantidadProducto"
                        min="1"
                        max="${stock}"
                        value="${stock > 0 ? 1 : 0}"
                        ${stock <= 0 ? "disabled" : ""}
                    >

                </div>

                <p
                    id="errorCantidad"
                    class="mensaje-error"
                ></p>

                <button
                    type="button"
                    id="btnAgregarDetalle"
                    class="btn-detalle-carrito"
                    ${stock <= 0 ? "disabled" : ""}
                >
                    ${
                        stock <= 0
                            ? "Sin stock"
                            : "Agregar al carrito"
                    }
                </button>

                <a
                    href="productos.html"
                    class="volver-productos"
                >
                    ← Volver a productos
                </a>

            </div>

        </div>
    `;

    const boton =
        document.getElementById(
            "btnAgregarDetalle"
        );

    if (boton) {

        boton.addEventListener(
            "click",
            function() {

                agregarProducto(producto);
            }
        );
    }
}


function agregarProducto(producto) {

    const inputCantidad =
        document.getElementById(
            "cantidadProducto"
        );

    const errorCantidad =
        document.getElementById(
            "errorCantidad"
        );

    if (
        !inputCantidad ||
        !errorCantidad
    ) {
        return;
    }

    const cantidad =
        Number(inputCantidad.value);

    const stock =
        Number(producto.stock);

    errorCantidad.textContent = "";

    if (stock <= 0) {

        errorCantidad.textContent =
            "Este producto no tiene stock disponible.";

        return;
    }

    if (
        !Number.isInteger(cantidad) ||
        cantidad < 1
    ) {

        errorCantidad.textContent =
            "Ingresa una cantidad válida.";

        return;
    }

    if (cantidad > stock) {

        errorCantidad.textContent =
            "La cantidad supera el stock disponible.";

        return;
    }

    const carrito =
        obtenerCarrito();

    const productoCarrito =
        carrito.find(function(item) {

            return (
                item.codigo ===
                producto.codigo
            );
        });

    if (productoCarrito) {

        const cantidadFinal =
            Number(productoCarrito.cantidad) +
            cantidad;

        if (cantidadFinal > stock) {

            errorCantidad.textContent =
                "La cantidad total supera el stock disponible.";

            return;
        }

        productoCarrito.cantidad =
            cantidadFinal;

        productoCarrito.nombre =
            producto.nombre;

        productoCarrito.precio =
            Number(producto.precio);

        productoCarrito.imagen =
            producto.imagen;

        productoCarrito.stock =
            stock;

    } else {

        carrito.push({

            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: Number(producto.precio),
            imagen: producto.imagen,
            stock: stock,
            cantidad: cantidad

        });
    }

    guardarCarrito(carrito);

    actualizarCantidadCarrito();

    alert(
        producto.nombre +
        " fue agregado al carrito."
    );
}


mostrarDetalle();

actualizarCantidadCarrito();