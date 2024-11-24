// NOS TRAEMOS PRIMERO LOS IDS DE QUE TENEMOS EN EL INDEX PARA CAPTURARLOS
const botonIdChiste = document.getElementById("fetchJoke");
const ulId = document.getElementById("jokeList");
// NOS TRAEMOS EL BODY PARA AGREGAR EL BOTON DE ELIMINAR TODO
const elementBody = document.body;

// HACEMOS LA FUNCION PARA OBTENER EL CHISTE junto con el Fetch y json
function obtenerChiste() {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((response) => {
      if (!response.ok) {
        throw "Solicitud sin éxito";
      }
      return response.json();
    })
    .then((chiste) => {
      console.log(chiste);
      renderizarChiste(chiste);
    });
}

// LUEGO HACEMOS LA FUNCION DEL .ADDEVENTLISTENER PARA EL CLICK DEL BOTON
botonIdChiste.addEventListener("click", function () {
  obtenerChiste();
});

// HACEMOS LA FUNCION DE RENDERIZAR EL CHISTE Y EL DESTRUCTURING
function renderizarChiste(chiste) {
  const { id, value, icon_url } = chiste;
  const copiaChiste = { ...chiste };

 
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
    // LUEGO EN EL LOCALSTORAGE PARA quitar ESE BOTON ELIMINAR
    localStorage.removeItem(botonEliminar.id);
    // ESTO ELIMINA EL ITEM DESDE EL LOCALSTORAGE
    const liRemove = document.getElementById(botonEliminar.id);
    if (liRemove) {
      liRemove.remove(); 
    }
  });

  divContainer.appendChild(parrafo);
  divContainer.appendChild(botonEliminar);
  liElement.appendChild(divContainer);
  ulId.appendChild(liElement);

  guardarLocalStore(id, copiaChiste);
}


function guardarLocalStore(id, chiste) {
  localStorage.setItem(id, JSON.stringify(chiste)); 
}

// la lista de chistes
function cargarListaLocalStore() {
  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    const valor = JSON.parse(localStorage.getItem(key));
    renderizarChiste(valor);
  });
}

// eliminar chistes dom
function BotonlimpiarLocalStore() {
  const keys = Object.entries(localStorage);

  for (let key of keys) {
    const clave = key[0];
    const valor = JSON.parse(key[1]);
    if (valor.icon_url === "https://api.chucknorris.io/img/avatar/chuck-norris.png") {
      renderizarChiste(valor);
    }
  }
}

// para eliminar todo a la vez
function botonLimpiarLocalStore() {
  
  const botonEliminarTodo = document.createElement("button");
  botonEliminarTodo.classList.add("eliminarTodo");
  botonEliminarTodo.textContent = "Eliminar todo";

  botonEliminarTodo.addEventListener("click", function () {
    localStorage.clear(); 
    ulId.innerHTML = ""; 
  });

  
  elementBody.appendChild(botonEliminarTodo);
}

// lista chictes
cargarListaLocalStore();

// boton de eleiminar todo
botonLimpiarLocalStore();
