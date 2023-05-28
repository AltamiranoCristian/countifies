let data;
window.onload = function () {
    informacion();

};
const informacion = () => {
    const encodedData = localStorage.getItem('userData');
    data = JSON.parse(decodeURIComponent(encodedData));
    console.log(data);

    document.getElementById('user').innerHTML = data.usuario;
    document.getElementById('usuario').value = data.usuario;
    document.getElementById('contraseña').value = data.password;
    document.getElementById('correo').value = data.email;
    document.getElementById('ingresos').value = data.ingresos;
    document.getElementById('telefono').value = data.telefono;
}
const cerrar = () => {
    localStorage.removeItem('userData');
    window.location.href = '../index.html'
}
const guardarDatos = (event) => {
    event.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;
    const correo = document.getElementById('correo').value;
    const ingresos = document.getElementById('ingresos').value;
    const telefono = document.getElementById('telefono').value;
    const id = data.id_usuario;
    const datos = { id, usuario, contraseña, correo, ingresos, telefono }
    console.log(datos)
    fetch('http://localhost/contify-back/user/update.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    }).then(response => {
        response.json();
        location.reload();
    })
        .then(data => console.log(data))
        .catch(error => console.error(error));
    data.usuario = usuario;
    data.password = contraseña;
    data.email = correo;
    data.ingresos = ingresos;
    data.telefono = telefono;

    // Guardar los datos actualizados en el Local Storage
    localStorage.setItem('userData', encodeURIComponent(JSON.stringify(data)));

    // Mostrar mensaje de éxito o redireccionar a otra página
    alert('Datos actualizados correctamente');
};

// Asignar el evento onclick al botón "Save"
