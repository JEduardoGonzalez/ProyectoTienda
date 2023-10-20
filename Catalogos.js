document.addEventListener("DOMContentLoaded", function () {
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
            // Si no se inició sesion como administrador, redirigir a la página de tienda
            window.location.href = "Tienda.html";
        }
    }
    const tablaproductos = document.getElementById("tablaproductos");
    const registros = document.getElementById("registros");
    const catalogo = [];
    cargar();
    function cargar(){
    // Cargar los catálogos del almacenamiento local
    const catalogoGuardado = JSON.parse(localStorage.getItem("catalogo")) || [];
    catalogo.push(...catalogoGuardado);
    actualizarTablaProductos();
}
    // Función para verificar si el ID ya existe
    function idExiste(id) {
        return catalogo.some((producto) => producto.id === id);
    }

    function actualizarTablaProductos() {
        // Limpiar la tabla actual
        tablaproductos.innerHTML = "";
    // Genera los productos en la tabla
    catalogo.forEach((producto) => {
        const rg = document.createElement("tr");
        rg.innerHTML = `
        <td>${producto.id}</td>
        <td><img src="${producto.imagen}" alt="(Imagen no Encontrada)" class="card-img-top"></td>
        <td>${producto.descripcion}</td>
        <td>$${producto.precio}</td>
        `;
        tablaproductos.appendChild(rg);
    });
    }

    // Función para eliminar datos del almacenamiento local
    function eliminarDatosLocalStorage(id) {
        const datos = JSON.parse(localStorage.getItem("catalogo")) || [];
        const nuevosdatos = datos.filter((producto) => producto.id !== id);
        localStorage.setItem("catalogo", JSON.stringify(nuevosdatos));
    }

        // Agrega un evento de clic al botón de Añadir
        const agregar = document.getElementById("agregar");
        agregar.addEventListener("click", function () {
                // Obtener los valores de los campos de añadir
                const id = registros.id.value;
                const imagen = registros.imagen.value;
                const precio = registros.precio.value;
                const descripcion = registros.descripcion.value;
            // Validar campos añadir(no vacíos)
            if (id.trim() === "" || imagen.trim() === "" || precio.trim() === "" || descripcion.trim() === "") {
                alert("Los Campos no pueden estar vacíos");
                return;
            }
            else{
                // Validar que el ID sea numérico
                if (!/^\d+$/.test(id)) {
                    alert("El ID debe ser un valor numérico.");
                    return;
                }
                else{
                    // Verificar si el ID ya existe en el catálogo
                    if (idExiste(id)) {
                        alert("El ID ya existe dentro de la tabla.");
                        return;
                    }
                    else{
                        // Validar que el precio sea numerico
                if (!/^\d+$/.test(precio)) {
                    alert("El precio debe ser numérico.");
                    return;
                }
                        // Validar que el precio no sea negativo
                        if (precio < 0) {
                            alert("El precio no puede ser negativo.");
                            return;
                        }
                        else{
                        const nuevoProducto = {
                            id: id,
                            imagen: imagen,
                            precio: precio,
                            descripcion: descripcion,
                        };
                        catalogo.push(nuevoProducto);
                        localStorage.setItem("catalogo", JSON.stringify(catalogo));
                        actualizarTablaProductos();
                        }
                    }
                }
            }
        });

        // Agrega un evento de clic al botón de eliminar
        const eliminar = document.getElementById("eliminar");
        eliminar.addEventListener("click", function () {
             // Obtener el id
             const id = registros.id.value;
             // Validar id a eliminar(no vacío)
             if (id.trim() === "") {
                 alert("Agregue un id");
                 return;
             }
             else{
                if (id !== null) {
                    // Buscar la fila que contiene el ID a eliminar
                    const filas = tablaproductos.getElementsByTagName("tr");
                    for (let i = 0; i < filas.length; i++) {
                        const fila = filas[i];
                        const idFila = fila.getElementsByTagName("td")[0].textContent; // Suponiendo que el ID está en la primera columna (td)
                        if (idFila === id) {
                            tablaproductos.deleteRow(i);
                            // También puedes eliminar los datos del almacenamiento local
                            eliminarDatosLocalStorage(id);
                            break; // Salir del bucle una vez que se encuentra y elimina la fila
                        }
                    }
                }
            }
        });

        // Agrega un evento de clic al botón de modificar
        const modificar = document.getElementById("modificar");
        modificar.addEventListener("click", function () {
            // Obtener los valores de los campos de cambios
            const id = registros.id.value;
            const imagen = registros.imagen.value;
            const precio = registros.precio.value;
            const descripcion = registros.descripcion.value;
            // Validar campos modificar(no vacíos)
            if (id.trim() === "" || imagen.trim() === "" || precio.trim() === "" || descripcion.trim() === "") {
                alert("Los Campos no pueden estar vacíos");
                return;
            }
            else{
                // Validar que el ID sea numérico
                if (!/^\d+$/.test(id)) {
                    alert("El ID debe ser un valor numérico.");
                    return;
                }
                // Validar que el precio sea numerico
                if (!/^\d+$/.test(precio)) {
                    alert("El precio debe ser numérico.");
                    return;
                }
                // Validar que el precio no sea negativo
                if (precio < 0) {
                    alert("El precio no puede ser negativo.");
                    return;
                }
                else{
                    const actualizado = {
                        id: id,
                        imagen: imagen,
                        precio: precio,
                        descripcion: descripcion,
                    }
                    if (id !== null) {
                        // Buscar la fila que contiene el ID a eliminar
                        const filas = tablaproductos.getElementsByTagName("tr");
                        for (let i = 0; i < filas.length; i++) {
                            const fila = filas[i];
                            const idFila = fila.getElementsByTagName("td")[0].textContent; // Suponiendo que el ID está en la primera columna (td)
                            if (idFila === id) {
                                tablaproductos.deleteRow(i);
                                const datos = JSON.parse(localStorage.getItem("catalogo")) || [];
                                const nuevosdatos = datos.filter((producto) => producto.id !== id);
                                nuevosdatos.push(actualizado);
                                localStorage.setItem("catalogo", JSON.stringify(nuevosdatos));
                                break; // Salir del bucle una vez que se encuentra y elimina la fila
                            }
                        }
                    }
                    window.location.href="catalogos.html";
                }
            }
        });

    // Agrega un evento al salir
    const out = document.getElementById("out");
    out.addEventListener("click", function () {
        localStorage.removeItem("usuario");
        localStorage.removeItem("contraseña");
});
});