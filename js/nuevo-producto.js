const formularioNuevoProducto =
    document.getElementById(
        "formNuevoProducto"
    );

const codigoNuevoProducto =
    document.getElementById(
        "codigo"
    );

const nombreNuevoProducto =
    document.getElementById(
        "nombre"
    );

const precioNuevoProducto =
    document.getElementById(
        "precio"
    );

const stockNuevoProducto =
    document.getElementById(
        "stock"
    );

const stockCriticoNuevoProducto =
    document.getElementById(
        "stockCritico"
    );

const categoriaNuevoProducto =
    document.getElementById(
        "categoria"
    );

const imagenNuevoProducto =
    document.getElementById(
        "imagen"
    );

const descripcionNuevoProducto =
    document.getElementById(
        "descripcion"
    );

const contadorDescripcion =
    document.getElementById(
        "contadorDescripcion"
    );

const mensajeProducto =
    document.getElementById(
        "mensajeProducto"
    );


function obtenerUsuarioNuevoProducto() {

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


function verificarAdministradorProducto() {

    const usuario =
        obtenerUsuarioNuevoProducto();


    if (
        !usuario ||
        usuario.rol !== "Administrador"
    ) {

        alert(
            "Solo el administrador puede crear productos."
        );


        window.location.href =
            "productos.html";


        return false;
    }


    return true;
}


function obtenerProductosNuevoProducto() {

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

        return [];
    }
}


function guardarProductosNuevoProducto(
    productos
) {

    localStorage.setItem(
        "productosAdmin",
        JSON.stringify(
            productos
        )
    );
}


function mostrarErrorNuevoProducto(
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


function mostrarCorrectoNuevoProducto(
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


function limpiarEstadoNuevoProducto(
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


function validarCodigoNuevoProducto() {

    const valor =
        codigoNuevoProducto.value
            .trim()
            .toUpperCase();


    codigoNuevoProducto.value =
        valor;


    if (valor === "") {

        mostrarErrorNuevoProducto(
            codigoNuevoProducto,
            "errorCodigo",
            "El código es obligatorio."
        );


        return false;
    }


    if (valor.length < 3) {

        mostrarErrorNuevoProducto(
            codigoNuevoProducto,
            "errorCodigo",
            "El código debe tener mínimo 3 caracteres."
        );


        return false;
    }


    const productos =
        obtenerProductosNuevoProducto();


    const existe =
        productos.some(
            function(producto) {

                return (
                    String(
                        producto.codigo || ""
                    ).toUpperCase() ===
                    valor
                );
            }
        );


    if (existe) {

        mostrarErrorNuevoProducto(
            codigoNuevoProducto,
            "errorCodigo",
            "El código ya se encuentra registrado."
        );


        return false;
    }


    mostrarCorrectoNuevoProducto(
        codigoNuevoProducto,
        "errorCodigo"
    );


    return true;
}


function validarNombreNuevoProducto() {

    const valor =
        nombreNuevoProducto.value.trim();


    if (valor === "") {

        mostrarErrorNuevoProducto(
            nombreNuevoProducto,
            "errorNombre",
            "El nombre es obligatorio."
        );


        return false;
    }


    if (valor.length > 100) {

        mostrarErrorNuevoProducto(
            nombreNuevoProducto,
            "errorNombre",
            "El nombre no puede superar los 100 caracteres."
        );


        return false;
    }


    mostrarCorrectoNuevoProducto(
        nombreNuevoProducto,
        "errorNombre"
    );


    return true;
}


function validarPrecioNuevoProducto() {

    const valor =
        precioNuevoProducto.value;


    if (valor === "") {

        mostrarErrorNuevoProducto(
            precioNuevoProducto,
            "errorPrecio",
            "El precio es obligatorio."
        );


        return false;
    }


    const numero =
        Number(valor);


    if (
        Number.isNaN(numero) ||
        numero < 0
    ) {

        mostrarErrorNuevoProducto(
            precioNuevoProducto,
            "errorPrecio",
            "El precio debe ser igual o mayor a 0."
        );


        return false;
    }


    mostrarCorrectoNuevoProducto(
        precioNuevoProducto,
        "errorPrecio"
    );


    return true;
}


function validarStockNuevoProducto() {

    const valor =
        stockNuevoProducto.value;


    if (valor === "") {

        mostrarErrorNuevoProducto(
            stockNuevoProducto,
            "errorStock",
            "El stock es obligatorio."
        );


        return false;
    }


    const numero =
        Number(valor);


    if (
        Number.isNaN(numero) ||
        numero < 0 ||
        !Number.isInteger(numero)
    ) {

        mostrarErrorNuevoProducto(
            stockNuevoProducto,
            "errorStock",
            "El stock debe ser un número entero igual o mayor a 0."
        );


        return false;
    }


    mostrarCorrectoNuevoProducto(
        stockNuevoProducto,
        "errorStock"
    );


    return true;
}


function validarStockCriticoNuevoProducto() {

    const valor =
        stockCriticoNuevoProducto.value;


    if (valor === "") {

        limpiarEstadoNuevoProducto(
            stockCriticoNuevoProducto,
            "errorStockCritico"
        );


        return true;
    }


    const numero =
        Number(valor);


    if (
        Number.isNaN(numero) ||
        numero < 0 ||
        !Number.isInteger(numero)
    ) {

        mostrarErrorNuevoProducto(
            stockCriticoNuevoProducto,
            "errorStockCritico",
            "El stock crítico debe ser un número entero igual o mayor a 0."
        );


        return false;
    }


    mostrarCorrectoNuevoProducto(
        stockCriticoNuevoProducto,
        "errorStockCritico"
    );


    return true;
}


function validarCategoriaNuevoProducto() {

    if (
        categoriaNuevoProducto.value === ""
    ) {

        mostrarErrorNuevoProducto(
            categoriaNuevoProducto,
            "errorCategoria",
            "Selecciona una categoría."
        );


        return false;
    }


    mostrarCorrectoNuevoProducto(
        categoriaNuevoProducto,
        "errorCategoria"
    );


    return true;
}


function validarDescripcionNuevoProducto() {

    const valor =
        descripcionNuevoProducto.value;


    if (valor.length > 500) {

        mostrarErrorNuevoProducto(
            descripcionNuevoProducto,
            "errorDescripcion",
            "La descripción no puede superar los 500 caracteres."
        );


        return false;
    }


    if (valor.trim() === "") {

        limpiarEstadoNuevoProducto(
            descripcionNuevoProducto,
            "errorDescripcion"
        );


        return true;
    }


    mostrarCorrectoNuevoProducto(
        descripcionNuevoProducto,
        "errorDescripcion"
    );


    return true;
}


function normalizarRutaImagen(
    ruta
) {

    let valor =
        ruta.trim();


    if (valor === "") {

        return "img/producto1.jpg";
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


function guardarNuevoProducto() {

    const productos =
        obtenerProductosNuevoProducto();


    const nuevoProducto = {

        codigo:
            codigoNuevoProducto.value
                .trim()
                .toUpperCase(),

        nombre:
            nombreNuevoProducto.value
                .trim(),

        descripcion:
            descripcionNuevoProducto.value
                .trim(),

        precio:
            Number(
                precioNuevoProducto.value
            ),

        stock:
            Number(
                stockNuevoProducto.value
            ),

        stockCritico:
            stockCriticoNuevoProducto.value === ""
                ? ""
                : Number(
                    stockCriticoNuevoProducto.value
                ),

        categoria:
            categoriaNuevoProducto.value,

        imagen:
            normalizarRutaImagen(
                imagenNuevoProducto.value
            )
    };


    productos.push(
        nuevoProducto
    );


    guardarProductosNuevoProducto(
        productos
    );
}


codigoNuevoProducto.addEventListener(
    "input",
    validarCodigoNuevoProducto
);


nombreNuevoProducto.addEventListener(
    "input",
    validarNombreNuevoProducto
);


precioNuevoProducto.addEventListener(
    "input",
    validarPrecioNuevoProducto
);


stockNuevoProducto.addEventListener(
    "input",
    validarStockNuevoProducto
);


stockCriticoNuevoProducto.addEventListener(
    "input",
    validarStockCriticoNuevoProducto
);


categoriaNuevoProducto.addEventListener(
    "change",
    validarCategoriaNuevoProducto
);


descripcionNuevoProducto.addEventListener(
    "input",
    function() {

        contadorDescripcion.textContent =
            descripcionNuevoProducto.value.length;


        validarDescripcionNuevoProducto();
    }
);


formularioNuevoProducto.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        mensajeProducto.textContent = "";

        mensajeProducto.className =
            "mensaje-login";


        const codigoValido =
            validarCodigoNuevoProducto();

        const nombreValido =
            validarNombreNuevoProducto();

        const precioValido =
            validarPrecioNuevoProducto();

        const stockValido =
            validarStockNuevoProducto();

        const stockCriticoValido =
            validarStockCriticoNuevoProducto();

        const categoriaValida =
            validarCategoriaNuevoProducto();

        const descripcionValida =
            validarDescripcionNuevoProducto();


        if (
            !codigoValido ||
            !nombreValido ||
            !precioValido ||
            !stockValido ||
            !stockCriticoValido ||
            !categoriaValida ||
            !descripcionValida
        ) {

            mensajeProducto.textContent =
                "Revisa los campos marcados antes de guardar.";


            mensajeProducto.className =
                "mensaje-login mensaje-login-error";


            return;
        }


        guardarNuevoProducto();


        mensajeProducto.textContent =
            "Producto guardado correctamente.";


        mensajeProducto.className =
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
    verificarAdministradorProducto()
) {

    contadorDescripcion.textContent =
        descripcionNuevoProducto.value.length;
}