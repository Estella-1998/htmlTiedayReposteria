// Variables
const carrito = document.querySelector('#Lista-Carrito');
const listaProductos = document.querySelector('#lista\\ -1');
const vaciarCarritoBtn = document.querySelector('#Vaciar\\ Carrito');

let productosCarrito = [];

// Listeners
cargarEventListeners();
function cargarEventListeners() {
    listaProductos.addEventListener('click', agregarProducto);
    carrito.addEventListener('click', eliminarProducto);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

// Funciones
function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const producto = e.target.parentElement.parentElement;
        leerDatosProducto(producto);
    }
}
function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.Precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    const existe = productosCarrito.some(prod => prod.id === infoProducto.id);
    if (existe) {
        const productos = productosCarrito.map(prod => {
            if (prod.id === infoProducto.id) {
                prod.cantidad++;
                return prod;
            } else {
                return prod;
            }
        });
        productosCarrito = productos;
    } else {
        productosCarrito.push(infoProducto);
    }

    mostrarCarrito();
}
function mostrarCarrito() {
    limpiarCarrito();

    productosCarrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="50"></td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}">❌</a>
            </td>
        `;
        carrito.appendChild(row);
    });
}

function limpiarCarrito() {
    while (carrito.firstChild) {
        carrito.removeChild(carrito.firstChild);
    }
}
function eliminarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-producto')) {
        const productoId = e.target.getAttribute('data-id');
        productosCarrito = productosCarrito.filter(prod => prod.id !== productoId);
        mostrarCarrito();
    }
}

function vaciarCarrito(e) {
    e.preventDefault();
    productosCarrito = [];
    limpiarCarrito();
}
