document.addEventListener("DOMContentLoaded" , () => {

    const carritoItemsStorage = JSON.parse(localStorage.getItem('cafeCar')) || [];
    const carritoTableBody = document.getElementById('cafeCarrito');
    const totalgeneral = document.getElementById('precioTotal');

    function cargaCarrito(){
        carritoTableBody.innerHTML = "";
        let total = 0;

        carritoItemsStorage.forEach((cafe,index) => {
            const subtotal = cafe.cantidad * cafe.id;
            total += subtotal;
            
            const tablaCafes = document.createElement("tr");

            tablaCafes.className = "cafeCarrito";

            tablaCafes.innerHTML = `
            <td><img src=${cafe.image}></td>
            <td>${cafe.title}</td>
            <td>$${cafe.id}</td>
            <td>
                    <div>
                        <button type="button" class="restarBoton">-</button>
                        <span>${cafe.cantidad}</span>
                        <button type="button" class="sumarBoton">+</button>
                    </div>
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td><i class="fa-solid fa-trash" style="color: #61360d; cursor: pointer;"></i></td>
        `;

            carritoTableBody.appendChild(tablaCafes);

            const botonRestar = tablaCafes.querySelector(".restarBoton");
            const botonSumar = tablaCafes.querySelector(".sumarBoton");

            botonRestar.addEventListener("click", () => {
                if (cafe.cantidad > 1) {
                    cafe.cantidad--;
                    actualizarCarrito();
                }
            });

            botonSumar.addEventListener("click", () => {
                cafe.cantidad++;
                actualizarCarrito();
            });
            
            const iconoPapelera = tablaCafes.querySelector(".fa-trash");
            iconoPapelera.addEventListener("click", () => {
                carritoItemsStorage.splice(index, 1); // Elimina el producto del arreglo
                actualizarCarrito();
            });

        });
        totalgeneral.textContent = `$${total.toFixed(2)}`;
    }

    function actualizarCarrito() {
        localStorage.setItem('cafeCar', JSON.stringify(carritoItemsStorage));
        cargaCarrito(); //Recarga el carrito en caso de cambios
    }

    cargaCarrito();//Inicia el carrito
        
        // Botón para limpiar carrito
    document.getElementById('limpiar-carrito').addEventListener('click', () => {
        localStorage.removeItem('cafeCar');
        window.location.href = 'carrito.html';
    });

    // Botón para finalizar compra
    document.getElementById('finalizar-compra').addEventListener('click', () => {
        alert(`Compra procesada`);
        localStorage.removeItem('cafeCar');
        setTimeout(() => {
            window.location.href = 'carrito.html';
        }, 1000);
    });
});