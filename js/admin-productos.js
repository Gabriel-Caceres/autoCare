const tablaProductos =
    document.getElementById(
        "tablaProductos"
    );

const buscarProducto =
    document.getElementById(
        "buscarProducto"
    );

const mensajeProductosAdmin =
    document.getElementById(
        "mensajeProductosAdmin"
    );


function obtenerProductosAdmin() {

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


function guardarProductosAdmin(
    productos
) {

    localStorage.setItem(
        "productosAdmin",
        JSON.stringify(
            productos
        )
    );
}


function obtenerUsuarioProductos() {

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


function esAdministradorProductos() {

    const usuario =
        obtenerUsuarioProductos();


    return (
        usuario &&
        usuario.rol ===
        "Administrador"
    );
}


function formatoPrecioAdmin(
    precio
) {

    return "$" +
        Number(
            precio
        ).toLocaleString(
            "es-CL"
        );
}


function mostrarProductosAdmin(
    productos
) {

    if (!tablaProductos) {

        return;
    }


    tablaProductos.innerHTML = "";


    if (mensajeProductosAdmin) {

        mensajeProductosAdmin.textContent =
            "";
    }


    if (
        productos.length === 0
    ) {

        if (mensajeProductosAdmin) {

            mensajeProductosAdmin.textContent =
                "No se encontraron productos.";
        }


        return;
    }


    productos.forEach(
        function(producto) {

            const fila =
                document.createElement(
                    "tr"
                );


            let acciones = `

                <a
                    href="detalle-producto.html?codigo=${producto.codigo}"
                    class="btn-ver-admin"
                >
                    Ver
                </a>
            `;


            if (
                esAdministradorProductos()
            ) {

                acciones += `

                    <a
                        href="editar-producto.html?codigo=${producto.codigo}"
                        class="btn-editar"
                    >
                        Editar
                    </a>

                    <button
                        type="button"
                        class="btn-eliminar-admin"
                        data-codigo="${producto.codigo}"
                    >
                        Eliminar
                    </button>
                `;
            }


            fila.innerHTML = `

                <td>
                    ${producto.codigo}
                </td>

                <td>
                    <strong>
                        ${producto.nombre}
                    </strong>
                </td>

                <td>
                    ${producto.categoria}
                </td>

                <td>
                    ${formatoPrecioAdmin(
                        producto.precio
                    )}
                </td>

                <td>
                    ${Number(
                        producto.stock
                    )}
                </td>

                <td>

                    <div class="acciones-tabla">
                        ${acciones}
                    </div>

                </td>
            `;


            tablaProductos.appendChild(
                fila
            );
        }
    );


    if (
        esAdministradorProductos()
    ) {

        activarEliminarProducto();
    }
}


function activarEliminarProducto() {

    const botones =
        document.querySelectorAll(
            ".btn-eliminar-admin"
        );


    botones.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    eliminarProductoAdmin(
                        boton.dataset.codigo
                    );
                }
            );
        }
    );
}


function eliminarProductoAdmin(
    codigo
) {

    if (
        !esAdministradorProductos()
    ) {

        alert(
            "No tienes permisos para eliminar productos."
        );


        return;
    }


    const productos =
        obtenerProductosAdmin();


    const producto =
        productos.find(
            function(item) {

                return (
                    item.codigo ===
                    codigo
                );
            }
        );


    if (!producto) {

        alert(
            "No se encontró el producto."
        );


        return;
    }


    const confirmar =
        confirm(
            "¿Deseas eliminar el producto " +
            producto.nombre +
            "?"
        );


    if (!confirmar) {

        return;
    }


    const nuevosProductos =
        productos.filter(
            function(item) {

                return (
                    item.codigo !==
                    codigo
                );
            }
        );


    guardarProductosAdmin(
        nuevosProductos
    );


    filtrarProductosAdmin();
}


function filtrarProductosAdmin() {

    const productos =
        obtenerProductosAdmin();


    if (!buscarProducto) {

        mostrarProductosAdmin(
            productos
        );


        return;
    }


    const texto =
        buscarProducto.value
            .trim()
            .toLowerCase();


    if (texto === "") {

        mostrarProductosAdmin(
            productos
        );


        return;
    }


    const resultado =
        productos.filter(
            function(producto) {

                const codigo =
                    String(
                        producto.codigo ||
                        ""
                    ).toLowerCase();


                const nombre =
                    String(
                        producto.nombre ||
                        ""
                    ).toLowerCase();


                const categoria =
                    String(
                        producto.categoria ||
                        ""
                    ).toLowerCase();


                return (
                    codigo.includes(
                        texto
                    ) ||
                    nombre.includes(
                        texto
                    ) ||
                    categoria.includes(
                        texto
                    )
                );
            }
        );


    mostrarProductosAdmin(
        resultado
    );
}


function controlarNuevoProducto() {

    const boton =
        document.getElementById(
            "btnNuevoProducto"
        );


    if (!boton) {

        return;
    }


    if (
        !esAdministradorProductos()
    ) {

        boton.style.display =
            "none";
    }
}


if (buscarProducto) {

    buscarProducto.addEventListener(
        "input",
        filtrarProductosAdmin
    );
}


controlarNuevoProducto();

mostrarProductosAdmin(
    obtenerProductosAdmin()
);