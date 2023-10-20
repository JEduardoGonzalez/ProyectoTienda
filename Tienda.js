document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculator").style.display = 'none';
    // Comprobar si existen usuario y contraseña en el almacenamiento local
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    const contrasenaGuardada = JSON.parse(localStorage.getItem("contrasena"));

    if (!usuarioGuardado || !contrasenaGuardada) {
        // Si no se encuentran usuario y contraseña, redirigir a la página de inicio de sesión
        window.location.href = "Form.html";
    } else{
        if(/^[a|A][d|D][m|M][i|I][n|N]$/.test(usuarioGuardado)&&/^[1][2][3][4][5]$/.test(contrasenaGuardada)){
        }
        else{
            document.getElementById("cat").style.display = 'none';
        }
    }
    const catalogoContainer = document.getElementById("catalogo");
    const resumenCompra = document.getElementById("resumenCompra");
    const total = document.getElementById("total");
    let catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];
    const carrito = [];

    // Función para llenar el catálogo de productos
        catalogo.forEach((producto) => {
            const card = document.createElement("div");
            card.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="Producto ${producto.id}">
                <div class="card-body">
                    <h5 class="card-title">Producto: ${producto.id}</h5>
                    <p class="card-text">${producto.descripcion} <br> Precio: $${producto.precio}<br> Cantidad de Producto: 
                    <input class="cantidadp" id="cantidadProducto${producto.id}" type="number" value="1" min="1"></p>
                    <button class="btn btn-primary">Agregar al Carrito</button>
                </div>
            </div>
            `;
            catalogoContainer.appendChild(card);

            const botonAgregar = card.querySelector("button");
            botonAgregar.addEventListener("click", function () {
                const cantidad = parseInt(document.getElementById(`cantidadProducto${producto.id}`).value);
                if (cantidad > 0) {
                    agregarProductoAlCarrito(producto, cantidad);
                }
            });
        });

    // Agrega un evento de clic al botón de "habilitar calculadora"
    const habilitar = document.getElementById("habilitar");
    habilitar.addEventListener("click", function () {
            document.getElementById("calculator").style.display = 'block';
        });
        // Agrega un evento de clic al botón de "deshabilitar calculadora"
        const deshabilitar = document.getElementById("deshabilitar");
        deshabilitar.addEventListener("click", function () {
        document.getElementById("calculator").style.display = 'none';
    });

    // Agrega un evento al salir
    const out = document.getElementById("out");
    out.addEventListener("click", function () {
        localStorage.removeItem("usuario");
        localStorage.removeItem("contraseña");
});

    function agregarProductoAlCarrito(producto, cantidad) {
        // Busca si el producto ya está en el carrito
        const productoEnCarrito = carrito.find((item) => item.producto.id === producto.id);

        if (productoEnCarrito) {
            // Si ya está en el carrito, actualiza la cantidad
            productoEnCarrito.cantidad += cantidad;
        } else {
            // Si no está en el carrito, agrega un nuevo elemento al carrito
            carrito.push({ producto, cantidad });
        }

        // Actualiza el resumen de la compra
        actualizarResumenCompra();
    }

    function actualizarResumenCompra() {
        // Limpia el resumen de compra
        resumenCompra.innerHTML = `
        `;
        let subtotalTotal = 0;

        carrito.forEach((item) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
            <td>Producto ${item.producto.id}</td>
            <td>${item.producto.descripcion}</td>
            <td>${item.cantidad}</td>
            <td>${item.producto.precio}</td>
            <td>$${item.producto.precio * item.cantidad}</td>
            `;
            resumenCompra.appendChild(fila);

            subtotalTotal += item.producto.precio * item.cantidad;
        });

        // Actualiza el total
        total.textContent = `$${subtotalTotal}`;
    }

    const finalizarCompra = document.getElementById("finalizarCompra")
    finalizarCompra.addEventListener("click",function (){
        localStorage.setItem("carrito", JSON.stringify(carrito));
            // Redirige a la página "Ticket.html"
            window.location.href = "Ticket.html";
    });
});