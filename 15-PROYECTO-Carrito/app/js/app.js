//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener(){
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

// Funciones
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement; 
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
    }
    
}

//Funcion lee datos del curso

function leerDatosCurso(curso){
    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //Retorna el objeto actualizado
            } else {
                return curso; //Retorna los objetos que no son los duplicados
            } 
        });
        articulosCarrito = [...cursos];
    } else {
        //Agrega elementos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    carritoHTML();
    
    }

//Muestra el curso seleccionado en el carrito
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML();


    //Agrega el carrito de compras al HTML
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        `;
        contenedorCarrito.appendChild(row);
    });
}

//Elimina los cursos del tbody
function limpiarHTML() {
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

    //Forma lenta
    // contenedorCarrito.innerHTML = '';
    
}

//Funcion vaciar carrito
function vaciarCarrito() {
    
    articulosCarrito = []; //Reseteamos el arreglo
    //Limpiar el HTML
    limpiarHTML();
}