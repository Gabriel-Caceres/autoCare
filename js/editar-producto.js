const formularioEditarProducto =
    document.getElementById(
        "formEditarProducto"
    );

const codigoEditarProducto =
    document.getElementById(
        "codigo"
    );

const nombreEditarProducto =
    document.getElementById(
        "nombre"
    );

const precioEditarProducto =
    document.getElementById(
        "precio"
    );

const stockEditarProducto =
    document.getElementById(
        "stock"
    );

const stockCriticoEditarProducto =
    document.getElementById(
        "stockCritico"
    );

const categoriaEditarProducto =
    document.getElementById(
        "categoria"
    );

const imagenEditarProducto =
    document.getElementById(
        "imagen"
    );

const descripcionEditarProducto =
    document.getElementById(
        "descripcion"
    );

const contadorDescripcionEditar =
    document.getElementById(
        "contadorDescripcion"
    );

const mensajeEditarProducto =
    document.getElementById(
        "mensajeProducto"
    );


const parametrosEditarProducto =
    new URLSearchParams(
        window.location.search
    );


const codigoProductoEditar =
    parametrosEditarProducto.get(
        "codigo"
    );


function obtenerUsuarioEditarProducto() {

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


function verificarAdministradorEditarProducto() {

    const usuario =
        obtenerUsuarioEditarProducto();


    if (
        !usuario ||
        usuario.rol !== "Administrador"
    ) {

        alert(
            "Solo el administrador puede editar productos."
        );


        window.location.href =
            "productos.html";


        return false;
    }


    return true;
}


function obtenerProductosEditar() {

    try {

        const datos =
            localStorage.getItem(
                "productosAdmin"
            );


        if (!datos) {

            return [];
        }


        const productos =
            JSON.parse(
                datos
            );


        if (
            Array.isArray(
                productos
            )
        ) {

            return productos;
        }


        return [];

    } catch (error) {

        return [];
    }
}


function guardarProductosEditar(
    productos
) {

    localStorage.setItem(
        "productosAdmin",
        JSON.stringify(
            productos
        )
    );
}


function mostrarErrorEditarProducto(
    campo,
    errorId,
    mensaje
) {

    const error =
        document.getElementById(
            errorId
        );


    if (error) {

        error.textContent =
            mensaje;
    }


    campo.classList.remove(
        "campo-correcto"
    );


    campo.classList.add(
        "campo-error"
    );
}


function mostrarCorrectoEditarProducto(
    campo,
    errorId
) {

    const error =
        document.getElementById(
            errorId
        );


    if (error) {

        error.textContent = "";
    }


    campo.classList.remove(
        "campo-error"
    );


    campo.classList.add(
        "campo-correcto"
    );
}


function limpiarEstadoEditarProducto(
    campo,
    errorId
) {

    const error =
        document.getElementById(
            errorId
        );


    if (error) {

        error.textContent = "";
    }


    campo.classList.remove(
        "campo-error",
        "campo-correcto"
    );
}


function cargarProductoEditar() {

    if (!codigoProductoEditar) {

        alert(
            "No se indicó el producto que deseas editar."
        );


        window.location.href =
            "productos.html";


        return false;
    }


    const productos =
        obtenerProductosEditar();


    const producto =
        productos.find(
            function(item) {

                return (
                    String(
                        item.codigo
                    ) ===
                    String(
                        codigoProductoEditar
                    )
                );
            }
        );


    if (!producto) {

        alert(
            "Producto no encontrado."
        );


        window.location.href =
            "productos.html";


        return false;
    }


    codigoEditarProducto.value =
        producto.codigo || "";

    nombreEditarProducto.value =
        producto.nombre || "";

    precioEditarProducto.value =
        producto.precio ?? "";

    stockEditarProducto.value =
        producto.stock ?? "";

    stockCriticoEditarProducto.value =
        producto.stockCritico ?? "";

    categoriaEditarProducto.value =
        producto.categoria || "";

    imagenEditarProducto.value =
        producto.imagen || "";

    descripcionEditarProducto.value =
        producto.descripcion || "";


    contadorDescripcionEditar.textContent =
        descripcionEditarProducto.value.length;


    return true;
}


function validarNombreEditarProducto() {

    const valor =
        nombreEditarProducto.value
            .trim();


    if (valor === "") {

        mostrarErrorEditarProducto(
            nombreEditarProducto,
            "errorNombre",
            "El nombre es obligatorio."
        );


        return false;
    }


    if (valor.length > 100) {

        mostrarErrorEditarProducto(
            nombreEditarProducto,
            "errorNombre",
            "El nombre no puede superar los 100 caracteres."
        );


        return false;
    }


    mostrarCorrectoEditarProducto(
        nombreEditarProducto,
        "errorNombre"
    );


    return true;
}


function validarPrecioEditarProducto() {

    if (
        precioEditarProducto.value === ""
    ) {

        mostrarErrorEditarProducto(
            precioEditarProducto,
            "errorPrecio",
            "El precio es obligatorio."
        );


        return false;
    }


    const valor =
        Number(
            precioEditarProducto.value
        );


    if (
        Number.isNaN(valor) ||
        valor < 0
    ) {

        mostrarErrorEditarProducto(
            precioEditarProducto,
            "errorPrecio",
            "El precio debe ser igual o mayor a 0."
        );


        return false;
    }


    mostrarCorrectoEditarProducto(
        precioEditarProducto,
        "errorPrecio"
    );


    return true;
}


function validarStockEditarProducto() {

    if (
        stockEditarProducto.value === ""
    ) {

        mostrarErrorEditarProducto(
            stockEditarProducto,
            "errorStock",
            "El stock es obligatorio."
        );


        return false;
    }


    const valor =
        Number(
            stockEditarProducto.value
        );


    if (
        Number.isNaN(valor) ||
        valor < 0 ||
        !Number.isInteger(valor)
    ) {

        mostrarErrorEditarProducto(
            stockEditarProducto,
            "errorStock",
            "El stock debe ser un número entero igual o mayor a 0."
        );


        return false;
    }


    mostrarCorrectoEditarProducto(
        stockEditarProducto,
        "errorStock"
    );


    return true;
}


function validarStockCriticoEditarProducto() {

    if (
        stockCriticoEditarProducto.value === ""
    ) {

        limpiarEstadoEditarProducto(
            stockCriticoEditarProducto,
            "errorStockCritico"
        );


        return true;
    }


    const valor =
        Number(
            stockCriticoEditarProducto.value
        );


    if (
        Number.isNaN(valor) ||
        valor < 0 ||
        !Number.isInteger(valor)
    ) {

        mostrarErrorEditarProducto(
            stockCriticoEditarProducto,
            "errorStockCritico",
            "El stock crítico debe ser un número entero igual o mayor a 0."
        );


        return false;
    }


    mostrarCorrectoEditarProducto(
        stockCriticoEditarProducto,
        "errorStockCritico"
    );


    return true;
}


function validarCategoriaEditarProducto() {

    if (
        categoriaEditarProducto.value === ""
    ) {

        mostrarErrorEditarProducto(
            categoriaEditarProducto,
            "errorCategoria",
            "Selecciona una categoría."
        );


        return false;
    }


    mostrarCorrectoEditarProducto(
        categoriaEditarProducto,
        "errorCategoria"
    );


    return true;
}


function validarDescripcionEditarProducto() {

    const valor =
        descripcionEditarProducto.value;


    if (
        valor.length > 500
    ) {

        mostrarErrorEditarProducto(
            descripcionEditarProducto,
            "errorDescripcion",
            "La descripción no puede superar los 500 caracteres."
        );


        return false;
    }


    if (
        valor.trim() === ""
    ) {

        limpiarEstadoEditarProducto(
            descripcionEditarProducto,
            "errorDescripcion"
        );


        return true;
    }


    mostrarCorrectoEditarProducto(
        descripcionEditarProducto,
        "errorDescripcion"
    );


    return true;
}


function normalizarImagenEditarProducto(
    ruta
) {

    let valor =
        ruta.trim();


    if (valor === "") {

        return "";
    }


    while (
        valor.startsWith("../")
    ) {

        valor =
            valor.substring(3);
    }


    if (
        valor.startsWith("./")
    ) {

        valor =
            valor.substring(2);
    }


    return valor;
}


function guardarCambiosEditarProducto() {

    const productos =
        obtenerProductosEditar();


    const indice =
        productos.findIndex(
            function(producto) {

                return (
                    String(
                        producto.codigo
                    ) ===
                    String(
                        codigoProductoEditar
                    )
                );
            }
        );


    if (
        indice === -1
    ) {

        return false;
    }


    let rutaImagen =
        normalizarImagenEditarProducto(
            imagenEditarProducto.value
        );


    if (
        rutaImagen === ""
    ) {

        rutaImagen =
            productos[indice].imagen ||
            "img/producto1.jpg";
    }


    productos[indice] = {

        ...productos[indice],

        codigo:
            codigoEditarProducto.value
                .trim()
                .toUpperCase(),

        nombre:
            nombreEditarProducto.value
                .trim(),

        descripcion:
            descripcionEditarProducto.value
                .trim(),

        precio:
            Number(
                precioEditarProducto.value
            ),

        stock:
            Number(
                stockEditarProducto.value
            ),

        stockCritico:
            stockCriticoEditarProducto.value === ""
                ? ""
                : Number(
                    stockCriticoEditarProducto.value
                ),

        categoria:
            categoriaEditarProducto.value,

        imagen:
            rutaImagen
    };


    guardarProductosEditar(
        productos
    );


    return true;
}


nombreEditarProducto.addEventListener(
    "input",
    validarNombreEditarProducto
);


precioEditarProducto.addEventListener(
    "input",
    validarPrecioEditarProducto
);


stockEditarProducto.addEventListener(
    "input",
    validarStockEditarProducto
);


stockCriticoEditarProducto.addEventListener(
    "input",
    validarStockCriticoEditarProducto
);


categoriaEditarProducto.addEventListener(
    "change",
    validarCategoriaEditarProducto
);


descripcionEditarProducto.addEventListener(
    "input",
    function() {

        contadorDescripcionEditar.textContent =
            descripcionEditarProducto.value.length;


        validarDescripcionEditarProducto();
    }
);


formularioEditarProducto.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        mensajeEditarProducto.textContent =
            "";


        mensajeEditarProducto.className =
            "mensaje-login";


        const nombreValido =
            validarNombreEditarProducto();

        const precioValido =
            validarPrecioEditarProducto();

        const stockValido =
            validarStockEditarProducto();

        const stockCriticoValido =
            validarStockCriticoEditarProducto();

        const categoriaValida =
            validarCategoriaEditarProducto();

        const descripcionValida =
            validarDescripcionEditarProducto();


        if (
            !nombreValido ||
            !precioValido ||
            !stockValido ||
            !stockCriticoValido ||
            !categoriaValida ||
            !descripcionValida
        ) {

            mensajeEditarProducto.textContent =
                "Revisa los campos marcados antes de guardar.";


            mensajeEditarProducto.className =
                "mensaje-login mensaje-login-error";


            return;
        }


        const guardado =
            guardarCambiosEditarProducto();


        if (!guardado) {

            mensajeEditarProducto.textContent =
                "No fue posible actualizar el producto.";


            mensajeEditarProducto.className =
                "mensaje-login mensaje-login-error";


            return;
        }


        mensajeEditarProducto.textContent =
            "Producto actualizado correctamente.";


        mensajeEditarProducto.className =
            "mensaje-login mensaje-login-exito";


        setTimeout(
            function() {

                window.location.href =
                    "productos.html";
            },
            700
        );
    }
);


if (
    verificarAdministradorEditarProducto()
) {

    cargarProductoEditar();
}