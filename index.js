const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const cardContainer = document.getElementById("card-container")
const cartCount = document.getElementById("cart-count");
let shopCount = 0;
const productList = [
    { 'name': 'Footbal Ball', 'description': '6 mini size blue/red', 'price': 12.33, 'category': 'Sport', 'image': './Photos/bella-lac-LTyPTQ2tgNA-unsplash.jpg' },
    { 'name': 'Sunglasses', 'description': 'UV sunglasses with golder frame', 'price': 34.50, 'category': 'Accessory', 'image': './Photos/charlesdeluvio-1-nx1QR5dTE-unsplash.jpg' },
    { 'name': 'Pen', 'description': 'golden/blue pen', 'price': 41.89, 'category': 'Stationery', 'image': './Photos/liviu-c-d_eLSvL4v9w-unsplash.jpg' },
    { 'name': 'Color Pencil', 'description': '36 color pencil', 'price': 22.55, 'category': 'Stationery', 'image': './Photos/lucas-george-wendt-LX1o9IC7lGA-unsplash.jpg' },
    { 'name': 'Tennis Racket', 'description': 'Green/Black tennis Racket pro', 'price': 89.50, 'category': 'Sport', 'image': './Photos/opollo-photography-4qoDhKnShI0-unsplash.jpg' },
    { 'name': 'Hat', 'description': 'Black jean hat', 'price': 67.99, 'category': 'Accessory', 'image': './Photos/yang-deng-2loKxdi6Hmo-unsplash.jpg' },
]

updatePage();

searchInput.addEventListener("input", () => {
    updateProductsView();
});

categoryFilter.addEventListener("change", () => {
    updateProductsView();
});

const addToCartButton = document.querySelectorAll(".add-to-cart");
addToCartButton.forEach((button) => {
    button.addEventListener("click", () => {
        shopCount++;
        setCartCount(shopCount);
    });
});

function updatePage() {
    updatePageBar();
    updateProductsView();
    setCartCount(shopCount);
}

function updatePageBar() {
    setupCategories();
}

function setCartCount(number) {
    cartCount.innerHTML = number;
}

function setupCategories() {
    let options = '<option value="all" selected>Category</option>';
    const categories = findCategories();
    categories.forEach((category) => {
        options += `<option value="${category}">${category}</option>`
    });
    categoryFilter.innerHTML = options;
}

function findCategories() {
    const categories = [];
    productList.map((product) => {
        let category = product.category
        if (!categories.includes(category)) {
            categories.push(category);
        }
    });
    return categories;
}

function updateProductsView() {
    let products = filterProducts();
    let productsView = '';

    products.map((product) => {
        productsView += `<div class="card">
        <img src="${product.image}" class="card-img-top" alt="${product.description}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <div class="card-details">
            <p class="card-price">price: ${product.price}$</p>
            <button class="add-to-cart btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>`
    });
    cardContainer.innerHTML = productsView;
}

function filterProducts() {
    const category = categoryFilter.value;
    const search = searchInput.value;
    let productsByCategory;
    let productsBySearch;

    if (category != 'all') {
        productsByCategory = productList.filter((product) => {
            return product.category == category
        });
    } else {
        productsByCategory = productList;
    }

    if (search != '') {
        productsBySearch = productsByCategory.filter((product) => {
            return product.name.toLowerCase().includes(search);
        });
    } else {
        return productsByCategory;
    }
    return productsBySearch;
}