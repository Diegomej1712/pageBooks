const library = document.querySelector('.libraryContainer');
let btnAdd = document.querySelectorAll('.addToCart');

async function getApi() 
{
    try
    {
        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=search+terms'); //llamado a la api
        const data = await response.json(); // respuesta de la api
        console.log(data);
        
        let books = ''; // arreglo para la estructura de cada libro en el html
        let standBooks = []; // arreglo para los libros que da la api
        data.items.forEach((book) => {
            const firstAuthor = book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Autor Desconocido';
            books = books + `
            <div class="card col-md-3 my-3 mx-3" style="width: 14rem;">
                <img src="${book.volumeInfo.imageLinks.smallThumbnail}" class="card-img-top" alt="...">
                <div class="card-body d-flex justify-content-center align-items-center flex-column">
                    <h6 class="card-title">${book.volumeInfo.title}</h6>
                    <p class="card-text fontsizeSmall">${firstAuthor}</p>
                    <h6 class="card-text price">${book.volumeInfo.pageCount}$</h6>
                    <a href="#" class="btn btn-primary addToCart" id="${book.id}">Agregar a carrito</a>
                </div>
            </div>
            `;
            standBooks.push(    //arreglo para guardar cada producto
                {
                    image: book.volumeInfo.imageLinks.smallThumbnail,
                    title: book.volumeInfo.title,
                    author: book.volumeInfo.authors,
                    price: book.volumeInfo.pageCount,
                    id: book.id 
                }
            );
        });
        library.innerHTML = books;
        addProduct(standBooks);
    }
    catch (error)
    {
        console.error(error);
    }
}

getApi();

let productsOnCart;
let productsOnCartLS = localStorage.getItem('products-on-cart');   //traigo el local storage

if (productsOnCartLS)   //si hay algo guardado en el local storage se guardara el la variable
{
    productsOnCart = JSON.parse(productsOnCartLS);
}
else    //sino sera un arreglo vacio
{
    productsOnCart = [];
}

function addProduct (standBooks)    //al darle al btn de agregar, se agrega el book con toda su info para luego llevar al carrito
{
    btnAdd = document.querySelectorAll('.addToCart');

    btnAdd.forEach(button => {
        button.addEventListener('click', (event) => {
            const idButton = event.currentTarget.id;    //recupera la id de cada book al que se le de agregar al carrito
            const productAdd = standBooks.find(product => product.id == idButton); // se busca el id recuperado con los id de cada libro en el arreglo
            
            if (productsOnCart.some(product => product.id == idButton))  // se pregunta si existe el producto en el carrito
            {
                const index = productsOnCart.findIndex(product => product.id == idButton)   // se verifica el index que posee el producto en el carrito
                productsOnCart[index].quantity = productsOnCart[index].quantity + 1;  // si se repite el producto se le va sumando una cantidad (aqui se agrego quantity a los books)
            }
            else
            {
                productAdd.quantity = 1;    //si no esta agregado se guarda con la quantity 1 usando el push luego
                productsOnCart.push(productAdd);
            }

            localStorage.setItem('products-on-cart', JSON.stringify(productsOnCart)); //Para recuperar la info luego en el html de carrito
        });
    });
};