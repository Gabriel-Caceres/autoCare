const listaProductos = document.getElementById("listaProductos");
const buscarProducto = document.getElementById("buscar");
const filtroCategoria = document.getElementById("categoria");
const mensajeProductos = document.getElementById("mensajeProductos");

let productos = [];

function cargarProductos() {

    if (typeof obtenerProductosTienda === "function") {

        productos = obtenerProductosTienda();

    } else {

        productos = [];

        console.error(
            "No se pudo cargar productos-data.js"
        );
    }
}

function formatoPrecio(precio) {

    return "$" +
        Number(precio).toLocaleString("es-CL");
}

function mostrarProductos(productosMostrar) {

    if (!listaProductos) {
        return;
    }

    listaProductos.innerHTML = "";

    if (mensajeProductos) {
        mensajeProductos.textContent = "";
    }

    if (productosMostrar.length === 0) {

        listaProductos.innerHTML = `
            <div class="sin-productos">

                <h3>
                    No encontramos productos
                </h3>

                <p>
                    Prueba con otra búsqueda o categoría.
                </p>

            </div>
        `;

        return;
    }

    productosMostrar.forEach(function(producto) {

        const tarjeta =
            document.createElement("article");

        tarjeta.className = "producto-card";

        const stock = Number(producto.stock);

        tarjeta.innerHTML = `

            <a
                href="detalle-producto.html?codigo=${producto.codigo}"
                class="producto-imagen"
            >

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                >

            </a>

            <div class="producto-info">

                <span class="producto-categoria">
                    ${producto.categoria}
                </span>

                <h3>
                    ${producto.nombre}
                </h3>

                <p class="producto-descripcion">
                    ${producto.descripcion}
                </p>

                <p class="producto-stock">

                    ${
                        stock > 0
                            ? "Stock disponible: " + stock
                            : "Producto sin stock"
                    }

                </p>

                <div class="producto-final">

                    <strong class="producto-precio">
                        ${formatoPrecio(producto.precio)}
                    </strong>

                    <a
                        href="detalle-producto.html?codigo=${producto.codigo}"
                        class="btn-producto"
                    >
                        Ver detalle
                    </a>

                </div>

                <button
                    type="button"
                    class="btn-agregar-producto"
                    data-codigo="${producto.codigo}"
                    ${stock <= 0 ? "disabled" : ""}
                >

                    ${
                        stock <= 0
                            ? "Sin stock"
                            : "Añadir al carrito"
                    }

                </button>

            </div>
        `;

        listaProductos.appendChild(tarjeta);
    });

    activarBotonesCarrito();
}

function filtrarProductos() {

    if (!buscarProducto || !filtroCategoria) {
        return;
    }

    const texto =
        buscarProducto.value
            .trim()
            .toLowerCase();

    const categoria =
        filtroCategoria.value;

    const resultado =
        productos.filter(function(producto) {

            const nombre =
                String(producto.nombre || "")
                    .toLowerCase();

            const descripcion =
                String(producto.descripcion || "")
                    .toLowerCase();

            const codigo =
                String(producto.codigo || "")
                    .toLowerCase();

            const coincideTexto =
                nombre.includes(texto) ||
                descripcion.includes(texto) ||
                codigo.includes(texto);

            const coincideCategoria =
                categoria === "Todos" ||
                producto.categoria === categoria;

            return (
                coincideTexto &&
                coincideCategoria
            );
        });

    mostrarProductos(resultado);

    if (mensajeProductos) {

        if (
            texto !== "" ||
            categoria !== "Todos"
        ) {

            mensajeProductos.textContent =
                "Se encontraron " +
                resultado.length +
                " producto(s).";

        } else {

            mensajeProductos.textContent = "";
        }
    }
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

function agregarAlCarrito(codigo) {

    cargarProductos();

    const producto =
        productos.find(function(item) {

            return item.codigo === codigo;
        });

    if (!producto) {

        alert(
            "No se encontró el producto."
        );

        return;
    }

    const stock =
        Number(producto.stock);

    if (stock <= 0) {

        alert(
            "Este producto no tiene stock disponible."
        );

        return;
    }

    const carrito =
        obtenerCarrito();

    const productoExistente =
        carrito.find(function(item) {

            return item.codigo === codigo;
        });

    if (productoExistente) {

        const cantidadActual =
            Number(productoExistente.cantidad);

        if (cantidadActual >= stock) {

            alert(
                "No hay más unidades disponibles."
            );

            return;
        }

        productoExistente.cantidad =
            cantidadActual + 1;

        productoExistente.precio =
            Number(producto.precio);

        productoExistente.stock =
            stock;

        productoExistente.imagen =
            producto.imagen;

        productoExistente.nombre =
            producto.nombre;

    } else {

        carrito.push({

            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: Number(producto.precio),
            imagen: producto.imagen,
            stock: stock,
            cantidad: 1

        });
    }

    guardarCarrito(carrito);

    actualizarCantidadCarrito();

    alert(
        producto.nombre +
        " fue añadido al carrito."
    );
}

function activarBotonesCarrito() {

    const botones =
        document.querySelectorAll(
            ".btn-agregar-producto"
        );

    botones.forEach(function(boton) {

        boton.addEventListener(
            "click",
            function() {

                agregarAlCarrito(
                    boton.dataset.codigo
                );
            }
        );
    });
}

function actualizarCantidadCarrito() {

    const contador =
        document.getElementById(
            "cantidadCarrito"
        );

    if (!contador) {
        return;
    }

    const carrito =
        obtenerCarrito();

    let cantidadTotal = 0;

    carrito.forEach(function(producto) {

        cantidadTotal +=
            Number(producto.cantidad);
    });

    contador.textContent =
        cantidadTotal;
}

if (buscarProducto) {

    buscarProducto.addEventListener(
        "input",
        filtrarProductos
    );
}

if (filtroCategoria) {

    filtroCategoria.addEventListener(
        "change",
        filtrarProductos
    );
}

cargarProductos();

mostrarProductos(productos);

actualizarCantidadCarrito();