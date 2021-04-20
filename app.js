//Variables
const tarjetas = document.getElementsByClassName('rounded'); //Obteniendo elementos html IMG
const arrayTarjetas = [...tarjetas]; //Transformar esos elementos a un array
const dirDorsoTarjeta = './assets/card.png';

let objImagenes = []; //Almacen de objetos img
let tarjetaVolteada = null;
let tVolteadaTemp = null; //Auxiliar para voltear boca abajo tarjeta (util en setTimout)
let aciertos = 0;
let intentos = 0;

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
    //Cuando la tarjeta este boca arriba que no sea clickeable
    let clickeable = objImagenes[idTarjeta].estado ? 'none' : 'auto'; 
    e.target.src = imgAMostrar; 
    e.target.style.pointerEvents = clickeable;

    if(tarjetaVolteada === null) {
        tarjetaVolteada = idTarjeta;
        
    } else {
        tVolteadaTemp = tarjetaVolteada; //Almacenar tarjeta volteada primero porque sera nula 
        intentos++;
        //No dejar que se presionen mas tarjetas cuando ya hay dos levantadas
        inhabilitarTarjetas(); 
        if(e.target.src === arrayTarjetas[tarjetaVolteada].src) {
            aciertos++;
            console.log('Acertaste');
            habilitarTarjetas();
        } else {
            console.log('Diferente');
            //Dejar ver un segundo ambas tarjetas diferentes levantadas
            setTimeout(() => {
                arrayTarjetas[tVolteadaTemp].src = dirDorsoTarjeta;
                //arrayTarjetas[tVolteadaTemp].style.pointerEvents = 'auto';
                objImagenes[tVolteadaTemp].estado = false;

                e.target.src = dirDorsoTarjeta;
                //e.target.style.pointerEvents = 'auto';
                objImagenes[idTarjeta].estado = false;
                habilitarTarjetas();
            }, 1000);
        }
        tarjetaVolteada = null;
    }

    setTimeout(() => {
        if(aciertos === 8) {
            inhabilitarTarjetas();
            prompt('¡Felicidades has ganado despues de ' + intentos + ' intentos!');
        }
    });
}

//Evitar que sean clickeables todas las tarjeta
function inhabilitarTarjetas() {
    arrayTarjetas.forEach(tarjeta => {
        tarjeta.style.pointerEvents = 'none';
    });
}

//Hacer que sean clickeables todas las tarjeta
function habilitarTarjetas() {
    arrayTarjetas.forEach(tarjeta => {
        tarjeta.style.pointerEvents = 'auto';
    });
}