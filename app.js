//Variables
const tarjetas = document.getElementsByClassName('rounded');
const arrayTarjetas = [...tarjetas];

//Listeners
listeners();

function listeners() {
    arrayTarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('click', voltearTarjeta);
    });
}

//Funciones
function voltearTarjeta() {
    console.log("Todo bien");
}