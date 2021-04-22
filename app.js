//Variables
const tarjetas = document.getElementsByClassName('rounded'); //Obteniendo elementos html IMG
const arrayTarjetas = [...tarjetas]; //Transformar esos elementos a un array

const dirDorsoTarjeta = './assets/card.png';

let objTarjetas = []; //Almacen de objetos img
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
    //Cargar arreglo de objetosTarjetas con el src de cada imagen
    for (let i = 0; objTarjetas.length < imagenes.length*2; i++) {
        
        if(i===imagenes.length) i=0; //Repetir imagenes para el par
        
        let objTarjeta = { //Objeto 
            dir: '',
            estado: false,
        }
        console.log(i);
        objTarjeta.dir = imagenes[i]; //Establecer direccion de la imagen
        objTarjetas.push(objTarjeta); //Almacenarlo ojeto
    }
    console.log(objTarjetas);
    barajarImagenes();
}

function barajarImagenes() {
    objTarjetas.sort(() => {
        return Math.random() - 0.5;
    });
}

function voltearTarjeta(e) {
    const idTarjeta = e.target.id - 1; //Obtener id del html IMG

    objTarjetas[idTarjeta].estado = !objTarjetas[idTarjeta].estado; //Invertir su estado (volteado)
    //De acuerdo a su estado asignar una imagen
    let imgAMostrar = objTarjetas[idTarjeta].estado ? objTarjetas[idTarjeta].dir : dirDorsoTarjeta; 
    //Cuando la tarjeta este boca arriba que no sea clickeable
    let clickeable = objTarjetas[idTarjeta].estado ? 'none' : 'auto'; 
    e.target.src = imgAMostrar; 
    e.target.style.pointerEvents = clickeable;

    if(tarjetaVolteada === null) {
        tarjetaVolteada = idTarjeta;
        
    } else {
        tVolteadaTemp = tarjetaVolteada; //Almacenar tarjeta volteada primero porque sera nula 
        intentos++;
        //No dejar que se presionen mas tarjetas cuando ya hay dos levantadas
        inhabilitarTarjetas(); 
        if(objTarjetas[idTarjeta].dir === objTarjetas[tarjetaVolteada].dir) {
            aciertos++;
            console.log('Acertaste');

            //Remover las tarjetas correctas del arreglo
            //Evitando habilitarlas(clickeables)
            habilitarTarjetas();
        } else {
            console.log('Diferente');
            //Dejar ver un segundo ambas tarjetas diferentes levantadas
            setTimeout(() => {
                arrayTarjetas[tVolteadaTemp].src = dirDorsoTarjeta;
                objTarjetas[tVolteadaTemp].estado = false;

                e.target.src = dirDorsoTarjeta;
                objTarjetas[idTarjeta].estado = false;
                habilitarTarjetas();
            }, 1000);
        }
        tarjetaVolteada = null;
    }

    setTimeout(() => { //Necesario para que aparezca despues de voltear tarjeta
        if(aciertos === 8) {
            inhabilitarTarjetas();
            confirm('¡Felicidades has ganado despues de ' + intentos + ' intentos!');
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