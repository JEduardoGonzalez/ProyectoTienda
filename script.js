document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario");
    const mensajeError = document.getElementById("mensajeError");


    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener los valores de los campos
        const user = formulario.user.value;
        const pass = formulario.pass.value;

        // Validar usuario y contraseña (no pueden estar vacíos)
        if (user.trim() === "" || pass.trim() === "") {
            mensajeError.textContent = "El nombre y los apellidos no pueden estar vacíos.";
            return;
        }
        //validar tipo usuario
        else{
            if(/^[a|A][d|D][m|M][i|I][n|N]$/.test(user)&&/^[1][2][3][4][5]$/.test(pass)){
                alert("Sesion iniciada como administrador");
                    // Guardar los datos actuales de inicio de sesión en el almacenamiento local
                    localStorage.removeItem("usuario");
                    localStorage.removeItem("contraseña");
                    localStorage.setItem("usuario", JSON.stringify(user));
                    localStorage.setItem("contrasena", JSON.stringify(pass));
            }
        else{
            alert("Sesion iniciada como cliente");
            localStorage.removeItem("usuario");
            localStorage.removeItem("contraseña");
            localStorage.setItem("usuario", JSON.stringify(user));
            localStorage.setItem("contrasena", JSON.stringify(pass));
                }
            }
     // Redireccionar a la página de tienda
    window.location.href = "Tienda.html";
});
});
