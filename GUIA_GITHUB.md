# Guía para entregar AutoCare en GitHub

## Estructura del repositorio

El contenido de la carpeta `AutoCare` debe quedar directamente en la raíz del repositorio. No subas el archivo ZIP ni dejes una carpeta duplicada `AutoCare/AutoCare`.

```text
AutoCare/
├── README.md
├── GUIA_GITHUB.md
├── index.html
├── login.html
├── registro.html
├── productos.html
├── detalle-producto.html
├── carrito.html
├── compra-exitosa.html
├── nosotros.html
├── blog.html
├── blog-detalle-1.html
├── blog-detalle-2.html
├── contacto.html
├── admin/
├── css/
├── js/
├── img/
├── video/
└── Documentacion/
```

## Crear y subir el repositorio

1. En GitHub selecciona **New repository**.
2. Usa un nombre como `autocare-dsy1104`.
3. Selecciona **Public**.
4. No agregues otro README si utilizarás el incluido en el proyecto.
5. Abre una terminal dentro de la carpeta `AutoCare` y ejecuta:

```bash
git init
git branch -M main
git add .
git commit -m "feat: crear estructura inicial de la tienda AutoCare"
git remote add origin https://github.com/TU-USUARIO/autocare-dsy1104.git
git push -u origin main
```

Reemplaza `TU-USUARIO` por el usuario propietario del repositorio.

## Trabajo colaborativo recomendado

Cada integrante debe aceptar la invitación como colaborador y hacer commits reales desde su propia cuenta. Ejemplos:

```text
feat: implementar catálogo y detalle de productos
feat: agregar registro y validación de RUN
feat: implementar carrito con localStorage
feat: crear mantenedor administrativo de usuarios
feat: agregar gestión de productos y stock crítico
docs: completar ERS y planilla de requerimientos
fix: corregir enlaces y permisos del panel administrativo
```

No conviene usar mensajes como `cambios`, `listo`, `actualización` o `prueba`, porque no explican qué se modificó.

## Verificación antes de entregar

- El repositorio es público.
- `index.html` aparece en la raíz.
- Todos los integrantes tienen commits visibles.
- Los documentos están dentro de `Documentacion`.
- El enlace entregado abre el repositorio sin pedir permisos.
- No se subió una carpeta duplicada ni el ZIP dentro del repositorio.
