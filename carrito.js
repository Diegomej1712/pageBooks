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
            <div class="card my-1 mx-3 px-3 d-flex flex-row align-items-center">
                <div class="w-20">
                    <img src="${product.image}" class="card-img-top p-2 w-100" alt="${product.title}">
                </div>
                <div class="card-body w-20">
                    <p class="card-text fontsizeSmall">${product.title}</p>
                </div>
                <div class="card-body w-10">
                    <p class="card-text fontsizeSmall quantity">${product.quantity}</p>
                </div>
                <div class="card-body w-10">
                    <p class="card-text fontsizeSmall price">${product.price}$</p>
                </div>
                <div class="card-body w-20">
                    <p class="card-text fontsizeSmall priceTotal">Total: ${product.price * product.quantity}$</p>
                </div>
                <div class="d-flex align-items-center w-20">
                    <button class="btnDelete w-20 border-0" id="${product.id}" style="background: none"><img src="trash-fill.svg"></button>
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