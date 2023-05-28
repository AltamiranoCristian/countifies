const login = (event) => {
    const usuario = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    event.preventDefault();
    fetch("http://localhost/countify/contify-back/user/read-one.php?user=" + usuario + "&password=" + password)
        .then(response => response.json())
        .then(data => {
            const encodedData = encodeURIComponent(JSON.stringify(data));
            localStorage.setItem('userData', encodedData); // Almacenar data en localStorage
            const url = './dashboard.html?data=' + encodedData;
            window.location.href = url;
        })
        .catch(error => {
            document.getElementById('response').innerHTML = 'Credenciales no encontradas';
        });
}