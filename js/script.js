//NOS TRAEMOS PRIMERO LOS IDS DE QUE TENEMOS EN EL INDEX PARA CAPTURARLOS
const botonIdChiste = document.getElementById("fetchJoke");
const ulId = document.getElementById("jokeList");
//NOS TRAEMOS EL BODY PARA AGREGAR EL BOTON DE ELIMINAR TODO
const elementBody = document.body;

//HACEMOS LA FUNCION PARA OBTENER EL CHISTE junto con el Fetch y json
function obtenerChiste() {
fetch("https://api.chucknorris.io/jokes/random").then((response) => {
    if (!response.ok) {
        throw "Solicitud sin exito"
    }
    return response.json();
})
.then ((chiste) => {
    console.log(chiste)
    renderizarChiste(chiste);
})
}
//LUEGO HACEMOS LA FUNCION DEL .ADDEVENTLISTENER PARA EL CLICK DEL BOTON
botonIdChiste.addEventListener("click", function() {
    obtenerChiste();
})

//HACEMOS LA FUNCION DE RENDERIZAR EL CHISTE Y EL DESTRUCTURING
function renderizarChiste(chiste) {
    const {id, value, icon_url} = chiste;
    const copiaChiste = {...chiste};

//CREAMOS LOS ELEMENTOS NECESARIOS LI, DIV, P,  EL BOTON DE ELIMINAR
// Y HACEMOS OTRA FUNCION CON EL ADDEVENTLISTENER
const liElement = document.createElement("li");
liElement.id = id;

const divContainer = document.createElement("div");
divContainer.classList.add("divContainer");

const parrafo = document.createElement("p");
parrafo.textContent = value;

const botonEliminar = document.createElement("button");
botonEliminar.id = id;
botonEliminar.textContent = "Eliminar";
botonEliminar.addEventListener("click", function() {
//LUEGO EN EL LOCALSTORAGE PARA REMOVER ESE BOTONELIMINAR
localStorage.removeItem(botonEliminar.id);
//ESTO ELIMINA EL ITEM DESDE EL LOCALSTORAGE
const liRemove = document.getElementById("botonEliminar.id");
if (liRemove) {
    liRemove.remove(); //ELIMINA EL LI ELEMENTO DESDE EL DOM
}
});

divContainer.appendChild(parrafo);
divContainer.appendChild(botonEliminar);
liElement.appendChild(divContainer);
ulId.appendChild(liElement);
guardarLocalStore(id, copiaChiste);

}
//LUEGO HACEMOS OTRA FUNCION PARA GUARDAR EL CHISTE (ID Y CHISTE) EN EL LOCALSTORAGE
function guardarLocalStore(id, chiste) {
    localStorage.setItem(id, JSON.stringify(chiste)); //GUARDA LA BROMA EN EL LOCALSTORAGE

}

//LUEGO HACEMOS OTRA FUNCION PARA CARGAR LA LISTA EN EL LOCALSTORE
function cargarListaLocalStore() {
    const keys = Object.entries(localStorage);
    //HACEMOS EL METODO OBJETO DEL ENTRIES PARA DEVOLVER
    //EL ARRAY DE LOS ARRAYS
    for (let key of keys) {
        const clave = key[0];
        const valor = JSON.parse(key[1]);
    
    if (valor.icon_url === 
        'https://api.chucknorris.io/img/avatar/chuck-norris.png') {
            renderizarChiste(valor);
        }    
    }

}
//CREAMOS UN BOTON PARA ELIMINAR TODOS LOS ELEMENTOS A LA VEZ
function BotonlimpiarlocalStore() {
    //creamos en el DOM un boton para eliminar todo el Localstorage
    const botonEliminarTodo = document.createElement("button");
    botonEliminarTodo.classList.add("EliminarTodo");
    botonEliminarTodo.textContent = "Eliminar todo";

//Agregamos el manejador al boton
botonEliminarTodo.addEventListener("click", function() {
    for (let i = localStorage.length -1; i >= 0; i--) {
        const key = localStorage.key(i);
        const value =
    JSON.parse(localStorage.getItem(key));
    if (value && value.icon_url) {
        localStorage.removeItem(key);
        const liRemove =
    document.getElementById(key);
    if (liRemove) {
        liRemove.remove();

     }    

   } 
 }
});

//AÑADIMOS el botonEliminartodo en el body 
elementBody.appendChild(botonEliminarTodo)
}
cargarListaLocalStore();
BotonlimpiarlocalStore();