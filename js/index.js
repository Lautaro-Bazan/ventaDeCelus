const contenedorTarjetas = document.getElementById("productos-container");


function crearTarjetasProductosInicio(productos){
productos.forEach(producto => {
    const nuevoCelu = document.createElement("div");
    nuevoCelu.classList = "tarjeta-producto"
    nuevoCelu.innerHTML = `
    <div class="cont-img"><img src="assets/celu${producto.id}.jpeg" alt="celu 1"></div>
    <h3>${producto.nombre}</h3>
    <p class="precio">$${producto.precio}</p>
    <button>Agregar al carrito</button>`
    contenedorTarjetas.appendChild(nuevoCelu);
    nuevoCelu.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
});
}
crearTarjetasProductosInicio(celus);