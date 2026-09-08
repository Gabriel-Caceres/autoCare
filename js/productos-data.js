const productosIniciales = [

    {
        codigo: "AUT001",
        nombre: "Kit Lavado Premium",
        descripcion: "Kit completo para mantener tu vehículo limpio y protegido.",
        precio: 24990,
        stock: 10,
        categoria: "Limpieza",
        imagen: "img/producto1.jpg"
    },

    {
        codigo: "AUT002",
        nombre: "Aspiradora Portátil 12V",
        descripcion: "Aspiradora portátil ideal para limpiar el interior de tu vehículo.",
        precio: 32990,
        stock: 8,
        categoria: "Interior",
        imagen: "img/producto2.jpg"
    },

    {
        codigo: "AUT003",
        nombre: "Cera Protectora",
        descripcion: "Cera para proteger la pintura y entregar brillo al vehículo.",
        precio: 15990,
        stock: 12,
        categoria: "Exterior",
        imagen: "img/producto3.jpg"
    },

    {
        codigo: "AUT004",
        nombre: "Paños de Microfibra",
        descripcion: "Paños suaves para limpieza interior y exterior sin rayar superficies.",
        precio: 7990,
        stock: 20,
        categoria: "Limpieza",
        imagen: "img/producto4.jpg"
    },

    {
        codigo: "AUT005",
        nombre: "Soporte para Celular",
        descripcion: "Soporte ajustable para utilizar el celular cómodamente en el vehículo.",
        precio: 12990,
        stock: 15,
        categoria: "Accesorios",
        imagen: "img/producto5.jpg"
    },

    {
        codigo: "AUT006",
        nombre: "Kit de Emergencia",
        descripcion: "Elementos básicos de seguridad para situaciones de emergencia en carretera.",
        precio: 34990,
        stock: 5,
        categoria: "Seguridad",
        imagen: "img/producto6.jpg"
    }

];


function inicializarProductos() {

    const datos = localStorage.getItem("productosAdmin");


    if (datos === null) {

        localStorage.setItem(
            "productosAdmin",
            JSON.stringify(productosIniciales)
        );

        return;
    }


    try {

        const productosGuardados = JSON.parse(datos);


        if (!Array.isArray(productosGuardados)) {

            localStorage.setItem(
                "productosAdmin",
                JSON.stringify(productosIniciales)
            );
        }

    } catch (error) {

        localStorage.setItem(
            "productosAdmin",
            JSON.stringify(productosIniciales)
        );
    }
}


function obtenerProductosTienda() {

    inicializarProductos();


    try {

        const productosGuardados = JSON.parse(
            localStorage.getItem("productosAdmin")
        );


        if (Array.isArray(productosGuardados)) {

            return productosGuardados;
        }


        return [];


    } catch (error) {

        return [];
    }
}


inicializarProductos();