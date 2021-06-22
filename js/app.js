const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

eventListeners()

function eventListeners(){
    //Cuando el usuario agrega un nuevo ts
    formulario.addEventListener('submit', agregarTweet)
    //Cuando el doc esta listo
    document.addEventListener('DOMContentLoaded', () =>{
        tweets = JSON.parse ( localStorage.getItem('tweets')) || [];
    
        crearHTML();
    });

}


function agregarTweet(e){
    e.preventDefault();

    // Textarea
    const tweet = document.querySelector('#tweet').value;

    // validacion...
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio')
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }
    //Anadir al arreglo de los twwts
    tweets = [...tweets, tweetObj];

    //Agregamos el html
    crearHTML();

    //Reiniciar HTML
    formulario.reset();
}

//Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p')
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}


//Muestra el listado de los tws

function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {
        //agregar un boton de eliminar
        const btnEliminar = document.createElement('a');
        btnEliminar.classList.add('borrar-tweet')
        btnEliminar.innerText = 'X';

        //Anadir la funcion de eliminar
        btnEliminar.onclick= () => {
            borrarTweet(tweet.id);
        }

        
            //crear html
            const li = document.createElement('li')
            //anadir el text
            li.innerText = tweet.tweet;
            //anadir el btn
            li.appendChild(btnEliminar);
            //insertalo en html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();

}


//Agregar los tws al localstorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

//Eliminar tweet
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);

    crearHTML();
}


//Limpiar html
function limpiarHTML(){
    while ( listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
