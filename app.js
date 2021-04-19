//Variables
const tarjetas = document.getElementsByClassName('rounded'); //Obteniendo elementos html IMG
const arrayTarjetas = [...tarjetas]; //Transformar esos elementos a un array
const dirDorsoTarjeta = './assets/card.png';

let objImagenes = []; //Almacen de objetos img

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
    imagenes.forEach(imagen => { //Arreglo de imagenes a arreglo de objetos imagenes
        
        let objImagen = { //Objeto 
            dir: '',
            estado: false,
            acierto: 0
        }

        objImagen.dir = imagen; //Establecer direccion de la imagen
        objImagenes.push(objImagen); //Almacenarlo doblemente para tener pares de imgs
    });

    imagenes.forEach(imagen => { //Arreglo de imagenes a arreglo de objetos imagenes
        
        let objImagen = { //Objeto 
            dir: '',
            estado: false,
            acierto: 0
        }

        objImagen.dir = imagen; //Establecer direccion de la imagen
        objImagenes.push(objImagen); //Almacenarlo doblemente para tener pares de imgs
    });
    

    barajarImagenes();

    //for (let i = 0; i < arrayTarjetas.length; i++) { //En cada elemento html IMG asignar la direccion de una
    //    arrayTarjetas[i].src = objImagenes[i].dir;
    //}

    //for (let i = 0; i < arrayTarjetas.length; i++) { //En cada elemento html IMG asignar la direccion de una
    //    console.log(objImagenes[i]);
    //}
}

function barajarImagenes() {
    objImagenes.sort(() => {
        return Math.random() - 0.5;
    });
}

function voltearTarjeta(e) {
    const idTarjeta = e.target.id - 1; //Obtener id del html IMG

    objImagenes[idTarjeta].estado = !objImagenes[idTarjeta].estado; //Invertir su estado (volteado)
    //De acuerdo a su estado asignar una imagen
    let imgAMostrar = objImagenes[idTarjeta].estado ? objImagenes[idTarjeta].dir : dirDorsoTarjeta; 
    e.target.src = imgAMostrar; 
}