document.addEventListener("DOMContentLoaded",()=>{
    const cafeContainer=document.getElementById("cafes-container");

    function fetchCafes()
    {
        fetch("https://api.sampleapis.com/coffee/hot")
        .then((response) => response.json())
        .then((cafesData) => {
            
            //const cafes = 
            cafeContainer.innerHTML = "";
            cafesData.forEach((cafeProducto) => {
                const cardDiv = document.createElement("div");
                
                cardDiv.className = "cafes-container";

                cardDiv.innerHTML = `
                        <div class="contenedor quicksand-">
                            <img src="${cafeProducto.image}" class="card-img-top" alt="${cafeProducto.title}">
                            <div class="card-body">
                                <h5 class="card-title">${cafeProducto.title}</h5>
                                <p>$${cafeProducto.id}</p>
                                <div class=botones>
                                    <button type="button" class="agregarBoton">Comprar</button>
                                </div>
                                <div class="botones_suma">
                                    <button type="button" class="restarBoton">-</button>
                                    <span class=cantidad>0</span>
                                    <button type="button" class="sumarBoton">+</button>
                                </div>
                            </div>
                        </div>
                    `;

                cafeContainer.appendChild(cardDiv);
                
                let numero=0;
                    const botonRestar = cardDiv.querySelector(".restarBoton"); 
                    const botonSumar = cardDiv.querySelector(".sumarBoton"); 
                    const cantidadCafeProd = cardDiv.querySelector(".cantidad"); 

                    function actualizarNumero(){
                        cantidadCafeProd.textContent = numero;
                    }
                    
                    botonRestar.addEventListener('click', () => {
                        if(numero > 0){
                            numero--;
                            actualizarNumero();
                        }
                    });
                    
                    botonSumar.addEventListener('click', () => {
                        numero++;
                        actualizarNumero();
                    })
                    
                    const botonAgregar = cardDiv.querySelector(".agregarBoton");
                    botonAgregar.addEventListener("click",() => {
                        if(numero>0){
                            agregarAlCarrito(cafeProducto,numero);
                            numero = 0; 
                            actualizarNumero();
                        }
                        else{
                            swal("Seleccione al menos un cafe para el pedido, por favor", "", "error");
                        }
                    });
                    
            });
        })
        .catch((error) => console.error("Error", error));
    }
    function agregarAlCarrito(cafeProducto,numero)
    {
        let cafeCar = JSON.parse(localStorage.getItem("cafeCar")) || [];

        const productoExistente = cafeCar.find(item =>item.title === cafeProducto.title);

        if(productoExistente){
            productoExistente.cantidad += numero;
            productoExistente.subtotal = productoExistente.cantidad*productoExistente.id;
        }
        else{
            cafeProducto.cantidad = numero;
            cafeProducto.subtotal = cafeProducto.id*numero;
            cafeCar.push(cafeProducto); 
        }

        localStorage.setItem("cafeCar",JSON.stringify(cafeCar));
        swal(`${numero} ${cafeProducto.title}`, "ha sido agregrado a tu pedido!");

    }
    fetchCafes();

});