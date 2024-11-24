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
    const {id, value,} = chiste;
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
  botonEliminar.addEventListener("click", function () {
    localStorage.removeItem(id); 
    liElement.remove(); 
  });

  divContainer.appendChild(parrafo);
  divContainer.appendChild(botonEliminar);
  liElement.appendChild(divContainer);
  ulId.appendChild(liElement);

  guardarLocalStore(id, copiaChiste);
}

// GUARDAR CHISTE LOCALSTORAGE
function guardarLocalStore(id, chiste) {
  localStorage.setItem(id, JSON.stringify(chiste)); 
}


/// CARGAR LISTA
function cargarListaLocalStore() {
    const keys = Object.keys(localStorage); 
    keys.forEach((key) => {
      const valor = JSON.parse(localStorage.getItem(key));
      renderizarChiste(valor); 
    });
  }
  
  // ELIMINAMOS CHISTES GUARDADOS - DOM
  function BotonlimpiarlocalStore() {
    
    const botonEliminarTodo = document.createElement("button");
    botonEliminarTodo.classList.add("EliminarTodo");
    botonEliminarTodo.textContent = "Eliminar todo";
  
  
    botonEliminarTodo.addEventListener("click", function () {
      
      localStorage.clear(); // Limpiamos localstorage
      ulId.innerHTML = ''; // Limpiamos DOM
    });
  
    // Boton al body
    elementBody.appendChild(botonEliminarTodo);
  }
  
  //  cargamos la lista de chistes al inicio
  cargarListaLocalStore();
  
  // Creamos botón de "Eliminar todo"
  BotonlimpiarlocalStore();