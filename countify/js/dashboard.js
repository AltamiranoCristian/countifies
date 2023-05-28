let ingreso;
let egreso;
let user;


window.onload = function () {
    informacion();
    obtenerDatosGrafica();
    obtenerDatosGraficaE()
};

const informacion = () => {
    usuario()
        .then(() => Promise.all([ingresos(), egresos()]))
        .then(() => grafica())
        .catch(error => {
            console.error('Error:', error);
        });
}

const usuario = () => {
    return new Promise((resolve, reject) => {
        const encodedData = localStorage.getItem('userData');
        const data = JSON.parse(decodeURIComponent(encodedData));
        console.log(data);
        user = data.id_usuario;
        document.getElementById('usuario').innerHTML = data.usuario;
        resolve();
    });
};

const ingresos = () => {
    return new Promise((resolve, reject) => {
        const encodedData = localStorage.getItem('userData');
        const data = JSON.parse(decodeURIComponent(encodedData));
        const usuario = data.id_usuario;

        fetch('http://localhost/countify/contify-back/ingresos/contar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error al contar registros:', data.error);
                    reject(data.error);
                } else {
                    ingreso = data.total;
                    console.log(ingreso);
                    document.getElementById('ingresos').innerHTML = ingreso;
                    resolve();
                }
            })
            .catch(error => {
                console.error('Error al contar registros:', error);
                reject(error);
            });
    });
};

const egresos = () => {
    return new Promise((resolve, reject) => {
        const encodedData = localStorage.getItem('userData');
        const data = JSON.parse(decodeURIComponent(encodedData));
        const usuario = data.id_usuario;
        fetch('http://localhost/countify/contify-back/egresos/contar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error al contar registros:', data.error);
                    reject(data.error);
                } else {
                    egreso = data.total;
                    document.getElementById('egresos').innerHTML = egreso;
                    resolve();
                }
            })
            .catch(error => {
                console.error('Error al contar registros:', error);
                reject(error);
            });
    });
};

const grafica = () => {
    // Crear los datos del gráfico
    const data = {
        labels: ['Ingresos', 'Egresos'],
        datasets: [{
            data: [ingreso, egreso],
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)']
        }]
    };

    // Crear el gráfico de pastel
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: data
    });
};

const obtenerDatosGrafica = () => {
    fetch('http://localhost/countify/contify-back/ingresos/categorias.php?usuario=' + encodeURIComponent(user))
        .then(response => response.json())
        .then(data => {
            // Obtén las categorías y los totales de los datos
            const categorias = data.map(item => item.categoria);
            const totales = data.map(item => item.total);

            // Genera la gráfica utilizando Chart.js
            generarGrafica(categorias, totales);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
};

const generarGrafica = (categorias, totales) => {
    // Obtén el elemento canvas donde se mostrará la gráfica
    const canvas = document.getElementById('grafica');

    // Crea la gráfica utilizando Chart.js
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categorias,
            datasets: [{
                data: totales,
                backgroundColor: generarColoresDinamicos(categorias.length),
            }]
        },
        options: {
            responsive: true
        }
    });
};

const generarColoresDinamicos = (cantidad) => {
    // Genera una lista de colores aleatorios utilizando valores RGB
    const colores = [];
    for (let i = 0; i < cantidad; i++) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        colores.push(`rgb(${r}, ${g}, ${b})`);
    }
    return colores;
};

//Egresos por categoria
const obtenerDatosGraficaE = () => {
    fetch('http://localhost/countify/contify-back/egresos/categorias.php?usuario=' + encodeURIComponent(user))
        .then(response => response.json())
        .then(data => {
            // Obtén las categorías y los totales de los datos
            const categorias = data.map(item => item.categoria);
            const totales = data.map(item => item.total);

            // Genera la gráfica utilizando Chart.js
            generarGraficaE(categorias, totales);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
};

const generarGraficaE = (categorias, totales) => {
    // Obtén el elemento canvas donde se mostrará la gráfica
    const canvas = document.getElementById('graficaEgreso');

    // Crea la gráfica utilizando Chart.js
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categorias,
            datasets: [{
                data: totales,
                backgroundColor: generarColoresDinamicosE(categorias.length),
            }]
        },
        options: {
            responsive: true
        }
    });
};

const generarColoresDinamicosE = (cantidad) => {
    // Genera una lista de colores aleatorios utilizando valores RGB
    const colores = [];
    for (let i = 0; i < cantidad; i++) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        colores.push(`rgb(${r}, ${g}, ${b})`);
    }
    return colores;
};
const cerrar = () => {
    localStorage.removeItem('userData');
    window.location.href = '../index.html'
}