const contenedorTarjetas = document.getElementById("cart-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");


function crearTarjetasProductosCarrito() {
    contenedorTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("celus"));
    if (productos && productos.length > 0) {
        productos.forEach((producto) => {
        const nuevoCelu = document.createElement("div");
        nuevoCelu.classList = "tarjeta-producto";
        nuevoCelu.innerHTML = `
        <img src="assets/celu${producto.id}.jpeg" alt="celu 1">
        <h3>${producto.nombre}</h3>
        <span>$${producto.precio}</span>
        <div>
        <button>-</button>
        <span class="cantidad">${producto.cantidad}</span>
        <button>+</button>
        </div>
        `;
        contenedorTarjetas.appendChild(nuevoCelu);
        nuevoCelu
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
            const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
            cantidadElement.innerText = restarAlCarrito(producto);
            crearTarjetasProductosCarrito();
            actualizarTotales();
        });
        nuevoCelu
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
            const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
            cantidadElement.innerText = agregarAlCarrito(producto);
            actualizarTotales();
        });
    });
}
    revisarMensajeVacio();
    actualizarTotales();
    actualizarNumeroCarrito();
}

crearTarjetasProductosCarrito();

function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem("celus"));
    let cantidad = 0;
    let precio = 0;
    if (productos && productos.length > 0) {
        productos.forEach((producto) => {
        cantidad += producto.cantidad;
        precio += producto.precio * producto.cantidad;
    });
    }
    cantidadElement.innerText = cantidad;
    precioElement.innerText = precio;
    if(precio === 0) {
        reiniciarCarrito();
        revisarMensajeVacio();
    }
}

document.getElementById("reiniciar").addEventListener("click", () => {
    contenedorTarjetas.innerHTML = "";
    reiniciarCarrito();
    revisarMensajeVacio();
});

function revisarMensajeVacio() {
    const productos = JSON.parse(localStorage.getItem("celus"));
    carritoVacioElement.classList.toggle("escondido", productos);
    totalesContainer.classList.toggle("escondido", !productos);
}