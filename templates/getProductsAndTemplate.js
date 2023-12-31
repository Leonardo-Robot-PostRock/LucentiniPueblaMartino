async function getProducts() {
    const API = 'https://dummyjson.com/products';

    try {
        const response = await fetch(API);
        let data = await response.json();
        console.log("res", response);
        response.status === 200 ?
            renderProducts(data.products) : renderSpinner();
    } catch (error) {
        console.log('Fetch error', error);
    }
}

const gridElement = document.getElementById('container-products');

const renderSpinner = () => {
    const spinnerTemplate = document.createElement('div');
    spinnerTemplate.innerHTML = `<div class="container-spinner"><div class="lds-dual-ring"></div></div>`

    gridElement.appendChild(spinnerTemplate);
}

const renderProducts = async (data) => {
    gridElement.className = 'animate__animated animate__fadeIn';
    gridElement.innerHTML = '';

    data.forEach((product) => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        const titleElement = document.createElement('h3');
        titleElement.textContent = product.title;
        titleElement.className = 'product-title';
        productElement.appendChild(titleElement);

        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', product.thumbnail);
        imgElement.className = 'product-image';
        productElement.appendChild(imgElement);

        const priceElement = document.createElement('p');
        priceElement.textContent = `Price: $${product.price}`;
        priceElement.className = 'product-price';
        productElement.appendChild(priceElement);

        const shoppingCartElement = document.createElement('span');
        shoppingCartElement.className = 'material-symbols-outlined shopping-cart'
        shoppingCartElement.textContent = 'add_shopping_cart';
        productElement.appendChild(shoppingCartElement);

        const buyElement = document.createElement('div');
        buyElement.classList.add('buy-container');
        buyElement.appendChild(priceElement);
        buyElement.appendChild(shoppingCartElement);
        productElement.appendChild(buyElement);


        gridElement.appendChild(productElement);
    });
};


const mainProduct = document.getElementById('main-products');

// Button go to home and material symbols span

const nortSpanElement = document.createElement('span');
nortSpanElement.className = 'material-symbols-outlined nort-span';
nortSpanElement.textContent = 'north';

const goHomeElement = document.createElement('button');
goHomeElement.className = 'go-home';
goHomeElement.appendChild(nortSpanElement);
mainProduct.appendChild(goHomeElement);

goHomeElement.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

window.addEventListener('scroll', function () {
    if (window.pageYOffset > 0) {
        goHomeElement.style.display = 'block';
    } else {
        goHomeElement.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    getProducts();
});