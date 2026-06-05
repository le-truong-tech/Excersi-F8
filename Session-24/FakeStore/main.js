const getProducts = async () => {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        return await res.json();
    } catch (e) {
        console.log(e);
        return null;
    }
}

function renderProductCard(product) {
    const productListEl = document.querySelector('.products-list');

    const productCardEl = document.createElement('div');
    productCardEl.classList = 'product-card';

    const productCardNameEl = document.createElement('div');
    productCardNameEl.setAttribute('class', 'product-card__name');
    productCardNameEl.innerText = product.category;
    productCardEl.append(productCardNameEl);

    const productCardImgEl = document.createElement('img');
    productCardImgEl.classList = 'product-card__img';
    productCardImgEl.setAttribute('src', product.image);
    productCardEl.append(productCardImgEl);

    const productCardTitleEl = document.createElement('div');
    productCardTitleEl.classList = 'product-card__title';
    productCardTitleEl.innerText = product.title;
    productCardEl.append(productCardTitleEl);

    const productCardRaTing = document.createElement('div');
    const productCardRaTingStar = document.createElement('span');
    const productCardRaTingScore = document.createElement('span');
    const productCardRaTingCount = document.createElement('span');
    productCardRaTingStar.classList = 'fa fa-star';
    productCardRaTingScore.classList = 'product-card__rating-score';
    productCardRaTingCount.classList = 'product-card__rating-count';
    productCardRaTingScore.innerText = product.rating.rate;
    productCardRaTingCount.innerText = ` (${product.rating.count})`;
    productCardRaTing.append(productCardRaTingStar);
    productCardRaTing.append(productCardRaTingScore);
    productCardRaTing.append(productCardRaTingCount);
    productCardEl.append(productCardRaTing);

    const productCardFooter = document.createElement('div');
    const productCardPrice = document.createElement('span');
    const productCardCartButton = document.createElement('button');
    const productCardCartButtonIcon = document.createElement('i');
    productCardFooter.classList = 'product-card__footer';
    productCardPrice.classList = 'product-card__price';
    productCardCartButton.classList = 'product-card__cart-btn';
    productCardCartButtonIcon.classList = 'fa shopping-cart';
    productCardPrice.innerText = `$${product.price}`;
    productCardCartButtonIcon.innerHTML = '&#xf07a;';
    productCardCartButton.append(productCardCartButtonIcon);
    productCardFooter.append(productCardPrice);
    productCardFooter.append(productCardCartButton);
    productCardEl.append(productCardFooter);

    productListEl.append(productCardEl);
}

const renderProductsList = (products) => {
    const contentHeaderEl = document.querySelector('.content-header');

    let productQuantityEl = document.querySelector('.quantity-product');
    if (!productQuantityEl) {
        productQuantityEl = document.createElement('p');
        productQuantityEl.classList.add('quantity-product');
    }
    productQuantityEl.innerHTML = '';
    productQuantityEl.innerText = `Show ${products.length} item`;
    contentHeaderEl.append(productQuantityEl);

    const productListEl = document.querySelector('.products-list');
    productListEl.innerHTML = '';
    products.forEach(product => renderProductCard(product))
    clickProductCardButton();
}

async function onClick (category, products) {
    if (category === 'all') renderProductsList(products);
    else {
        const productsByCategory = products.filter(p => {
            return p.category === category;
        })
        renderProductsList(productsByCategory);
    }
}

const renderCategories = async (categories, products) => {
    const sidebarEl = document.querySelector('.sidebar');
    const categoriesEl = document.createElement('ul');

    renderProductsList(products);
    const categoryAllProductsEl = document.querySelector('.all-products');
    categoryAllProductsEl.classList.add('active');
    categoryAllProductsEl.addEventListener('click', () => {
        const currentActive= document.querySelector('.sidebar ul li.active');
        if (currentActive) currentActive.classList.remove('active');
        categoryAllProductsEl.classList.add('active');
        onClick('all', products
        )});

    categories.forEach(c => {
        const categoryEl = document.createElement('li');
        categoryEl.addEventListener('click', () => {
            const currentActive= document.querySelector('.sidebar ul li.active');
            if (currentActive) currentActive.classList.remove('active');
            categoryEl.classList.add('active')
            onClick(c, products);
        });
        categoryEl.innerText = `${c}`
        categoriesEl.append(categoryEl);

    });
    sidebarEl.append(categoriesEl);
}

function addCar() {
    let addCountCardEl = document.querySelector('.add-count-card');

    if (!addCountCardEl) {
        addCountCardEl = document.createElement('div');
        addCountCardEl.classList.add('add-count-card');
        addCountCardEl.innerText = '1';

        const shoppingCardEl = document.querySelector('.count-shopping-cart');
        shoppingCardEl.append(addCountCardEl)
    } else {
        let count = Number(addCountCardEl.textContent)
        addCountCardEl.innerText = `${++count}`;
    }


}

const clickProductCardButton = () => {
    const productCardButtonEl = document.getElementsByClassName('product-card__cart-btn');
    Array.from(productCardButtonEl).forEach(btn => {
        btn.addEventListener('click', () => {
            addCar();
        })
    })
}

const init = async () => {
    const products = await getProducts();

    let categories = Array.from(new Set(products.map(p => p.category)));
    await renderCategories(categories, products);
}
init();

