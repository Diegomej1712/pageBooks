const productsOnCart = JSON.parse(localStorage.getItem('products-on-cart'));
const cartContainer = document.querySelector('.cartContainer');
let btnDelete = document.querySelectorAll('.btnDelete');
const totalBuy = document.querySelector('.totalBuy');
const containerBuy = document.querySelector('.containerBuy');
const btnBuy = document.querySelector('.btnBuy');


function addProductOnCart ()
{
    if (productsOnCart && productsOnCart.length > 0)
    {
        let products = '';  // para ir agregando cada producto que se de la agregar al carrito
        let cart = [];  // para almacenar la estructura en forma de arreglo de los books
        cartContainer.innerHTML = '';   // iniciar el DOM en blanco
    
        productsOnCart.forEach(product => {     // se arma la estructura a mostrar de los productos del carrito
            products = products + `
            <div class="card my-1 mx-3 d-flex flex-row align-items-center" style="width: 80%;">
                <div class="card-img" style="width: 7%; height=100px;">
                    <img src="${product.image}" class="card-img-top p-2" alt="${product.title}">
                </div>
                <div class="card-body" style="width: 20%">
                    <h6 class="card-title">${product.title}</h6>
                </div>
                <div class="card-body" style="width: 20%">
                    <h6 class="card-text quantity">${product.quantity}</h6>
                </div>
                <div class="card-body" style="width: 20%">
                    <h6 class="card-text price">${product.price}$</h6>
                </div>
                <div class="card-body" style="width: 20%">
                    <h6 class="card-text price">Total: ${product.price * product.quantity}$</h6>
                </div>
                <div class="card-text d-flex justify-content-center align-items-center" style="width: 20%">
                    <button class="btnDelete" id="${product.id}" style="width: 20%; height: 30px; border: none; background: none"><img src="trash-fill.svg"></button>
                </div>
            </div>
            `;
            cart.push(    //arreglo para guardar cada producto
                {
                    image: product.image,
                    title: product.title,
                    quantity: product.quantity,
                    price: product.price,
                    id: product.id 
                }
            );
        });
    
        cartContainer.innerHTML = products;
        deleteToCart(cart);     //llamado de la funcion eliminar del carro
        total();    //actualizar total en el carrito
    }
    else 
    {
        cartContainer.innerHTML = 'Carrito vacio...';
        containerBuy.classList.remove('d-flex');
        containerBuy.classList.add('d-none');
    }
}

addProductOnCart();

function deleteToCart (cart)        //funcion para eliminar los productos
{
    btnDelete = document.querySelectorAll('.btnDelete');    //llamamos todos los botones de eliminar

    btnDelete.forEach(button => {
        button.addEventListener('click', (event) => {
            const idButton = event.currentTarget.id;    //evento para recuperar los Id
            const index = productsOnCart.findIndex(product => product.id == idButton);  //recuperamos el index de los books
            productsOnCart.splice(index, 1);    // eliminamos de 1 en 1 del arreglo de productsOnCart
            addProductOnCart(); //volvemos a cargar en el carrito

            localStorage.setItem('products-on-cart', JSON.stringify(productsOnCart));   //guardamos en el local storage
        });
    });
}

function total ()
{
    const total = productsOnCart.reduce((i, product) => i + (product.price * product.quantity), 0);
    totalBuy.innerText = `Total: ${total}$`;
}

btnBuy.addEventListener('click', () => {
    productsOnCart.length = 0;
    localStorage.setItem('products-on-cart', JSON.stringify(productsOnCart));
    cartContainer.innerText = 'Gracias por su compra!!';
    containerBuy.classList.remove('d-flex');
    containerBuy.classList.add('d-none');
});