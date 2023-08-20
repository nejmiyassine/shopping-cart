let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let favoriteList = document.querySelector('.favorite-list');

let shoppingProducts = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: 'https://images.unsplash.com/photo-1585298723682-7115561c51b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80',
        price: 10,
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: 'https://images.unsplash.com/photo-1566355800052-c1fff02fcbae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
        price: 30,
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: 'https://plus.unsplash.com/premium_photo-1668418188837-d40b734ed6d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
        price: 20,
    },
];
let listCards = [];
let favoriteCards = [];

// Initialize Our App
const initializeApp = () => {
    shoppingProducts.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}" alt="${value.name}" />
            <div class="item-info">
                <p class="title"><strong>${value.name}</strong></p>
                <p class="price">$${value.price.toLocaleString()}</p>
            </div>
            <div class="item-info">
                <button onclick="addToCard(${key})">Add To Card</button>
                <button class="favorite-btn" onclick="addToFavorite(${key})">Add To Favorite</button>
            </div>
            `;
        list.appendChild(newDiv);
    });
};

initializeApp();

const addToCard = (key) => {
    if (listCards[key] == null) {
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(shoppingProducts[key]));
        listCards[key].quantity = 1;
    } else {
        listCards[key].quantity += 1;
        listCards[key].price =
            listCards[key].quantity * shoppingProducts[key].price;
    }

    reloadCard();
};

const addToFavorite = (key) => {
    if (favoriteCards[key] == null) {
        favoriteCards[key] = JSON.parse(JSON.stringify(shoppingProducts[key]));
    }

    favoriteCards.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}" alt="${value.name}"  />
            <div class="item-info">
                <p class="title"><strong>${value.name}</strong></p>
                <p class="price">$${value.price.toLocaleString()}</p>
            </div>
            <div class="item-info">
                <button onclick="addToCard(${key})">Add To Card</button>
                <button class="favorite-btn" onclick="removeFromFavorite(${key})">Remove From Favorite</button>
            </div>
            `;
        favoriteList.appendChild(newDiv);
    });
};

const reloadCard = () => {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newLi = document.createElement('li');
            newLi.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div class="list-card">
                    <div class="list-card-info">
                        <p><strong>${value.name}</strong></p>
                        <p>$${value.price.toLocaleString()}</p>
                    </div>
                    <div class="list-card-buttons">
                        <button onclick="changeQuantity(${key}, ${
                value.quantity - 1
            })">-</button>
                        <div class="count">${value.quantity}</div>
                        <button onclick="changeQuantity(${key}, ${
                value.quantity + 1
            })">+</button>
                    </div>
                    <div class="list-card-delete" onclick=(deleteCard(${key}))>
                        Delete
                    </div>
                </div>
                `;
            listCard.appendChild(newLi);
        }
    });
    total.innerText = `Total: $${totalPrice.toLocaleString()}`;
    quantity.innerText = count;
};

const changeQuantity = (key, quantity) => {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * shoppingProducts[key].price;
    }
    reloadCard();
};

const deleteCard = (key) => {
    delete listCards[key];
    console.log(listCards[key]);
    reloadCard();
};

const removeFromFavorite = (key) => {};
