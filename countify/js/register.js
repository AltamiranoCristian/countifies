//Esta funcion ingresa los datos del usuario por medio de api
const enviar = (event) => {
    const user = document.getElementById('user').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const amount = document.getElementById('amount').value;
    const phone = document.getElementById('phone').value;
    const data = { user, email, password, amount, phone }
    //console.log(data);
    event.preventDefault();
    fetch('http://localhost/countify/contify-back/user/create.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            location.reload();
        })
        .catch(error => {
            console.error('Error al insertar los datos:', error);
        });
}
