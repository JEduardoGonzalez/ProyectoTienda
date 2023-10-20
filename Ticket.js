document.addEventListener("DOMContentLoaded", function () {
    // Comprobar si existen usuario y contraseña en el almacenamiento local
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    const contrasenaGuardada = JSON.parse(localStorage.getItem("contrasena"));

    if (!usuarioGuardado || !contrasenaGuardada) {
        // Si no se encuentran usuario y contraseña, redirigir a la página de inicio de sesión
        window.location.href = "Form.html";
    }
    // Recupera los datos del carrito y el subtotal del almacenamiento local
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    const total = document.getElementById("total");
    const ticket = document.getElementById("ticket");

        // Crea una tabla para mostrar los detalles de la compra
        const tabla = document.createElement("table");
        tabla.classList.add("table");

        // Crea la cabecera de la tabla
        const thead = document.createElement("thead");
        thead.innerHTML = `
            <tr>
            <th>Clave Producto</th>
            <th>Descripción</th>
            <th class="num">Cantidad</th>
            <th class="num">Precio Unitario</th>
            <th class="num">Subtototal</th>
            </tr>
        `;
        // Crea el cuerpo de la tabla
        const tbody = document.createElement("tbody");
        let subtotalTotal = 0;
        carrito.forEach((item) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
            <td>Producto ${item.producto.id}</td>
            <td>${item.producto.descripcion}</td>
            <td class="num">$${item.cantidad}</td>
            <td class="num">$${item.producto.precio}</td>
            <td class="num">$${item.producto.precio * item.cantidad}</td>
            `;
            subtotalTotal += item.producto.precio * item.cantidad;
            tbody.appendChild(fila);
        });
        total.textContent = `$${subtotalTotal}`;
        
        // Agrega la tabla al ticket
        tabla.appendChild(thead);
        tabla.appendChild(tbody);
        ticket.appendChild(tabla);

    const volver = document.getElementById("volver")
    volver.addEventListener("click", function (event) {
            event.preventDefault();
            localStorage.removeItem("carrito");
            window.history.back();
        });
});