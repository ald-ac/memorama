//Variables
const tarjetas = document.getElementsByClassName('rounded');
const arrayTarjetas = [...tarjetas];

let objImagenes = [];

//Listeners
listeners();

function listeners() {

    document.addEventListener('DOMContentLoaded', cargarArregloImg);

    arrayTarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('click', voltearTarjeta);
    });
}

//Funciones
function cargarArregloImg() {
    imagenes.forEach(imagen => {
        
        let objImagen = {
            dir: '',
            estado: 0,
            acierto: 0
        }

        objImagen.dir = imagen;
        objImagenes.push(objImagen);
    });

    arrayTarjetas.forEach(tarj => {
        tarj.src = objImagenes[0].dir;
    })

}

function voltearTarjeta() {
    
}