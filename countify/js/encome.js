const form = document.querySelector('.row');
let id;
window.onload = function () {
    informacion();
};
const informacion = () => {
    const encodedData = localStorage.getItem('userData');
    data = JSON.parse(decodeURIComponent(encodedData));
    console.log(data);
    id = data.id_usuario;
    document.getElementById('user').innerHTML = data.usuario;
}
// Agregar un evento de envío al formulario
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar que se envíe el formulario

    // Obtener los valores de los campos del formulario
    const fecha = form.querySelector('input[name="fecha"]').value;
    const cuenta = form.querySelector('select[name="cuenta"]').value;
    const categoria = form.querySelector('select[name="categoria"]').value;
    const importe = form.querySelector('input[name="importe"]').value;
    const nota = form.querySelector('input[name="nota"]').value;

    // Crear un objeto con los datos capturados
    const data = {
        id,
        fecha: fecha,
        cuenta: cuenta,
        categoria: categoria,
        importe: importe,
        nota: nota
    };
    fetch('http://localhost/countify/contify-back/egresos/create.php', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(result => {
            // Manejar la respuesta del servidor si es necesario
            console.log(result);
            window.location.reload();
        })
        .catch(error => {
            // Manejar errores en caso de que ocurra alguno
            console.error('Error:', error);
        });

});