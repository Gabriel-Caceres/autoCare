const tablaUsuarios =
    document.getElementById(
        "tablaUsuarios"
    );

const buscarUsuario =
    document.getElementById(
        "buscarUsuario"
    );

const mensajeUsuariosAdmin =
    document.getElementById(
        "mensajeUsuariosAdmin"
    );


function obtenerUsuariosAdmin() {

    try {

        const datos =
            localStorage.getItem(
                "usuariosAdmin"
            );


        if (!datos) {

            return [];
        }


        const usuarios =
            JSON.parse(datos);


        if (
            Array.isArray(
                usuarios
            )
        ) {

            return usuarios;
        }


        return [];

    } catch (error) {

        console.error(
            "Error al cargar los usuarios:",
            error
        );


        return [];
    }
}


function guardarUsuariosAdmin(
    usuarios
) {

    localStorage.setItem(
        "usuariosAdmin",
        JSON.stringify(
            usuarios
        )
    );
}


function obtenerUsuarioActivoAdminUsuarios() {

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


function obtenerNombreCompletoUsuario(
    usuario
) {

    const nombre =
        usuario.nombre || "";


    const apellidos =
        usuario.apellidos ||
        usuario.apellido ||
        "";


    return (
        nombre +
        " " +
        apellidos
    ).trim();
}


function mostrarUsuariosAdmin(
    usuarios
) {

    if (!tablaUsuarios) {

        return;
    }


    tablaUsuarios.innerHTML = "";


    if (mensajeUsuariosAdmin) {

        mensajeUsuariosAdmin.innerHTML =
            "";
    }


    if (
        usuarios.length === 0
    ) {

        if (mensajeUsuariosAdmin) {

            mensajeUsuariosAdmin.innerHTML = `

                <div class="admin-vacio">

                    <h3>
                        No se encontraron usuarios
                    </h3>

                    <p>
                        Intenta realizar otra búsqueda.
                    </p>

                </div>
            `;
        }


        return;
    }


    usuarios.forEach(
        function(usuario) {

            const fila =
                document.createElement(
                    "tr"
                );


            const nombreCompleto =
                obtenerNombreCompletoUsuario(
                    usuario
                );


            fila.innerHTML = `

                <td>
                    ${usuario.run || "Sin RUN"}
                </td>

                <td>
                    <strong>
                        ${nombreCompleto || "Sin nombre"}
                    </strong>
                </td>

                <td>
                    ${usuario.correo || ""}
                </td>

                <td>

                    <span class="rol-usuario">
                        ${usuario.rol || "Cliente"}
                    </span>

                </td>

                <td>
                    ${usuario.region || "No registrada"}
                </td>

                <td>
                    ${usuario.comuna || "No registrada"}
                </td>

                <td>

                    <div class="acciones-tabla">

                        <a
                            href="editar-usuario.html?id=${usuario.id}"
                            class="btn-editar"
                        >
                            Editar
                        </a>

                        <button
                            type="button"
                            class="btn-eliminar-admin"
                            data-id="${usuario.id}"
                        >
                            Eliminar
                        </button>

                    </div>

                </td>
            `;


            tablaUsuarios.appendChild(
                fila
            );
        }
    );


    activarBotonesEliminarUsuario();
}


function activarBotonesEliminarUsuario() {

    const botones =
        document.querySelectorAll(
            ".btn-eliminar-admin"
        );


    botones.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    eliminarUsuarioAdmin(
                        boton.dataset.id
                    );
                }
            );
        }
    );
}


function eliminarUsuarioAdmin(
    id
) {

    const usuarios =
        obtenerUsuariosAdmin();


    const usuario =
        usuarios.find(
            function(item) {

                return (
                    String(
                        item.id
                    ) ===
                    String(
                        id
                    )
                );
            }
        );


    if (!usuario) {

        alert(
            "No se encontró el usuario."
        );


        return;
    }


    if (
        String(
            usuario.correo
        ).toLowerCase() ===
        "admin@duoc.cl"
    ) {

        alert(
            "El administrador principal no puede ser eliminado."
        );


        return;
    }


    const usuarioActivo =
        obtenerUsuarioActivoAdminUsuarios();


    if (
        usuarioActivo &&
        String(
            usuarioActivo.id
        ) ===
        String(
            id
        )
    ) {

        alert(
            "No puedes eliminar tu propia cuenta mientras tienes la sesión iniciada."
        );


        return;
    }


    const nombreCompleto =
        obtenerNombreCompletoUsuario(
            usuario
        );


    const confirmar =
        confirm(
            "¿Deseas eliminar al usuario " +
            nombreCompleto +
            "?"
        );


    if (!confirmar) {

        return;
    }


    const nuevosUsuarios =
        usuarios.filter(
            function(item) {

                return (
                    String(
                        item.id
                    ) !==
                    String(
                        id
                    )
                );
            }
        );


    guardarUsuariosAdmin(
        nuevosUsuarios
    );


    filtrarUsuariosAdmin();
}


function filtrarUsuariosAdmin() {

    const usuarios =
        obtenerUsuariosAdmin();


    if (!buscarUsuario) {

        mostrarUsuariosAdmin(
            usuarios
        );


        return;
    }


    const texto =
        buscarUsuario.value
            .trim()
            .toLowerCase();


    if (
        texto === ""
    ) {

        mostrarUsuariosAdmin(
            usuarios
        );


        return;
    }


    const resultado =
        usuarios.filter(
            function(usuario) {

                const run =
                    String(
                        usuario.run || ""
                    ).toLowerCase();


                const nombre =
                    String(
                        usuario.nombre || ""
                    ).toLowerCase();


                const apellidos =
                    String(
                        usuario.apellidos ||
                        usuario.apellido ||
                        ""
                    ).toLowerCase();


                const correo =
                    String(
                        usuario.correo || ""
                    ).toLowerCase();


                const rol =
                    String(
                        usuario.rol || ""
                    ).toLowerCase();


                const region =
                    String(
                        usuario.region || ""
                    ).toLowerCase();


                const comuna =
                    String(
                        usuario.comuna || ""
                    ).toLowerCase();


                return (
                    run.includes(texto) ||
                    nombre.includes(texto) ||
                    apellidos.includes(texto) ||
                    correo.includes(texto) ||
                    rol.includes(texto) ||
                    region.includes(texto) ||
                    comuna.includes(texto)
                );
            }
        );


    mostrarUsuariosAdmin(
        resultado
    );
}


if (buscarUsuario) {

    buscarUsuario.addEventListener(
        "input",
        filtrarUsuariosAdmin
    );
}


mostrarUsuariosAdmin(
    obtenerUsuariosAdmin()
);