const formularioContacto =
    document.getElementById(
        "formContacto"
    );

const nombreContacto =
    document.getElementById(
        "nombre"
    );

const correoContacto =
    document.getElementById(
        "correo"
    );

const comentarioContacto =
    document.getElementById(
        "comentario"
    );

const contadorComentario =
    document.getElementById(
        "cantidadCaracteres"
    );

const mensajeContacto =
    document.getElementById(
        "mensajeContacto"
    );


function mostrarErrorContacto(
    campo,
    errorId,
    mensaje
) {

    const elementoError =
        document.getElementById(
            errorId
        );


    if (elementoError) {

        elementoError.textContent =
            mensaje;
    }


    campo.classList.remove(
        "campo-correcto"
    );


    campo.classList.add(
        "campo-error"
    );
}


function mostrarCorrectoContacto(
    campo,
    errorId
) {

    const elementoError =
        document.getElementById(
            errorId
        );


    if (elementoError) {

        elementoError.textContent = "";
    }


    campo.classList.remove(
        "campo-error"
    );


    campo.classList.add(
        "campo-correcto"
    );
}


function validarNombreContacto() {

    const valor =
        nombreContacto.value.trim();


    if (valor === "") {

        mostrarErrorContacto(
            nombreContacto,
            "errorNombre",
            "El nombre es obligatorio."
        );

        return false;
    }


    if (valor.length > 100) {

        mostrarErrorContacto(
            nombreContacto,
            "errorNombre",
            "El nombre no puede superar los 100 caracteres."
        );

        return false;
    }


    mostrarCorrectoContacto(
        nombreContacto,
        "errorNombre"
    );


    return true;
}


function correoContactoPermitido(
    valor
) {

    const correo =
        valor.toLowerCase();


    return (
        correo.endsWith(
            "@duoc.cl"
        ) ||
        correo.endsWith(
            "@profesor.duoc.cl"
        ) ||
        correo.endsWith(
            "@gmail.com"
        )
    );
}


function validarCorreoContacto() {

    const valor =
        correoContacto.value
            .trim()
            .toLowerCase();


    if (valor === "") {

        mostrarErrorContacto(
            correoContacto,
            "errorCorreo",
            "El correo electrónico es obligatorio."
        );

        return false;
    }


    if (valor.length > 100) {

        mostrarErrorContacto(
            correoContacto,
            "errorCorreo",
            "El correo no puede superar los 100 caracteres."
        );

        return false;
    }


    if (
        !correoContactoPermitido(
            valor
        )
    ) {

        mostrarErrorContacto(
            correoContacto,
            "errorCorreo",
            "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."
        );

        return false;
    }


    mostrarCorrectoContacto(
        correoContacto,
        "errorCorreo"
    );


    return true;
}


function validarComentario() {

    const valor =
        comentarioContacto.value.trim();


    if (valor === "") {

        mostrarErrorContacto(
            comentarioContacto,
            "errorComentario",
            "El comentario es obligatorio."
        );

        return false;
    }


    if (valor.length > 500) {

        mostrarErrorContacto(
            comentarioContacto,
            "errorComentario",
            "El comentario no puede superar los 500 caracteres."
        );

        return false;
    }


    mostrarCorrectoContacto(
        comentarioContacto,
        "errorComentario"
    );


    return true;
}


function actualizarContador() {

    if (!contadorComentario) {
        return;
    }


    contadorComentario.textContent =
        comentarioContacto.value.length;
}


function limpiarFormularioContacto() {

    formularioContacto.reset();


    nombreContacto.classList.remove(
        "campo-correcto",
        "campo-error"
    );


    correoContacto.classList.remove(
        "campo-correcto",
        "campo-error"
    );


    comentarioContacto.classList.remove(
        "campo-correcto",
        "campo-error"
    );


    document.getElementById(
        "errorNombre"
    ).textContent = "";


    document.getElementById(
        "errorCorreo"
    ).textContent = "";


    document.getElementById(
        "errorComentario"
    ).textContent = "";


    actualizarContador();
}


if (nombreContacto) {

    nombreContacto.addEventListener(
        "input",
        validarNombreContacto
    );


    nombreContacto.addEventListener(
        "blur",
        validarNombreContacto
    );
}


if (correoContacto) {

    correoContacto.addEventListener(
        "input",
        validarCorreoContacto
    );


    correoContacto.addEventListener(
        "blur",
        validarCorreoContacto
    );
}


if (comentarioContacto) {

    comentarioContacto.addEventListener(
        "input",
        function() {

            actualizarContador();

            validarComentario();
        }
    );


    comentarioContacto.addEventListener(
        "blur",
        validarComentario
    );
}


if (formularioContacto) {

    formularioContacto.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            mensajeContacto.textContent = "";

            mensajeContacto.className =
                "mensaje-login";


            const nombreValido =
                validarNombreContacto();

            const correoValido =
                validarCorreoContacto();

            const comentarioValido =
                validarComentario();


            if (
                !nombreValido ||
                !correoValido ||
                !comentarioValido
            ) {

                mensajeContacto.textContent =
                    "Revisa los campos marcados antes de enviar el formulario.";


                mensajeContacto.className =
                    "mensaje-login mensaje-login-error";


                return;
            }


            mensajeContacto.textContent =
                "Mensaje enviado correctamente. Gracias por contactarnos.";


            mensajeContacto.className =
                "mensaje-login mensaje-login-exito";


            limpiarFormularioContacto();
        }
    );
}


actualizarContador();