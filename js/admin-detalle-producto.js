const detalleProductoAdmin =
    document.getElementById(
        "detalleProductoAdmin"
    );


const parametrosDetalleAdmin =
    new URLSearchParams(
        window.location.search
    );


const codigoProductoAdmin =
    parametrosDetalleAdmin.get(
        "codigo"
    );


function obtenerProductosDetalleAdmin() {

    try {

        const datos =
            localStorage.getItem(
                "productosAdmin"
            );


        if (!datos) {

            return [];
        }


        const productos =
            JSON.parse(datos);


        if (
            Array.isArray(
                productos
            )
        ) {

            return productos;
        }


        return [];

    } catch (error) {

        console.error(
            "Error al cargar los productos:",
            error
        );


        return [];
    }
}


function obtenerUsuarioDetalleAdmin() {

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


function formatoPrecioDetalleAdmin(
    valor
) {

    return "$" +
        Number(
            valor
        ).toLocaleString(
            "es-CL"
        );
}


function obtenerRutaImagenAdmin(
    imagen
) {

    if (!imagen) {

        return "../img/producto1.jpg";
    }


    if (
        imagen.startsWith("../")
    ) {

        return imagen;
    }


    if (
        imagen.startsWith("./")
    ) {

        return "../" +
            imagen.substring(2);
    }


    return "../" + imagen;
}


function mostrarDetalleProductoAdmin() {

    if (!detalleProductoAdmin) {

        return;
    }


    const productos =
        obtenerProductosDetalleAdmin();


    const producto =
        productos.find(
            function(item) {

                return (
                    String(
                        item.codigo
                    ) ===
                    String(
                        codigoProductoAdmin
                    )
                );
            }
        );


    if (!producto) {

        detalleProductoAdmin.innerHTML = `

            <div class="producto-no-encontrado">

                <h2>
                    Producto no encontrado
                </h2>

                <p>
                    No fue posible encontrar
                    el producto seleccionado.
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


    const usuario =
        obtenerUsuarioDetalleAdmin();


    const esAdministrador =
        usuario &&
        usuario.rol ===
        "Administrador";


    let botonEditar = "";


    if (esAdministrador) {

        botonEditar = `

            <a
                href="editar-producto.html?codigo=${producto.codigo}"
                class="btn btn-principal"
            >
                Editar producto
            </a>
        `;
    }


    const stock =
        Number(
            producto.stock
        ) || 0;


    const stockCritico =
        producto.stockCritico !== undefined &&
        producto.stockCritico !== ""
            ? Number(
                producto.stockCritico
            )
            : null;


    let textoStockCritico =
        "No definido";


    if (
        stockCritico !== null &&
        !Number.isNaN(
            stockCritico
        )
    ) {

        textoStockCritico =
            stockCritico +
            " unidades";
    }


    detalleProductoAdmin.innerHTML = `

        <div class="admin-detalle-grid">

            <div class="admin-detalle-imagen">

                <img
                    src="${obtenerRutaImagenAdmin(
                        producto.imagen
                    )}"
                    alt="${producto.nombre}"
                >

            </div>


            <div class="admin-detalle-info">

                <span class="producto-categoria">
                    ${producto.categoria}
                </span>


                <h2>
                    ${producto.nombre}
                </h2>


                <p class="admin-detalle-codigo">

                    Código:

                    <strong>
                        ${producto.codigo}
                    </strong>

                </p>


                <p class="admin-detalle-descripcion">

                    ${
                        producto.descripcion ||
                        "Sin descripción registrada."
                    }

                </p>


                <div class="admin-detalle-datos">

                    <div>

                        <span>
                            Precio
                        </span>

                        <strong>
                            ${formatoPrecioDetalleAdmin(
                                producto.precio
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Stock
                        </span>

                        <strong>
                            ${stock}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Stock crítico
                        </span>

                        <strong>
                            ${textoStockCritico}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Categoría
                        </span>

                        <strong>
                            ${producto.categoria}
                        </strong>

                    </div>

                </div>


                <div
                    id="accionesProductoAdmin"
                    class="admin-detalle-acciones"
                >
                    ${botonEditar}
                </div>

            </div>

        </div>
    `;
}


mostrarDetalleProductoAdmin();