const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.products = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.products = data;
                this.render()
            });
        this._init();
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.products) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {
                let productId = +e.target.dataset['id'];
                let product = this.products.find(product => product.id_product == productId);
                cart.addProduct(product);
            }
        });
    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn" data-id="${this.id}">Купить</button>
                </div>
            </div>`
    }
}

class Cart {
    constructor(container = '.cart-block') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getGoods()
            .then(data => { //data - объект js
                this.goods = data.contents;
                this.render()
            });
        this._init();
    }

    _getGoods() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    _getTotalPrice() {
        let totalPrice = 0;
        let a = document.querySelectorAll('.product-price');
        a.forEach(el => {
            totalPrice += parseInt(el.innerText.replace(/[^\d]/g, ''));
        });
        document.querySelector('.cart-totalPrice').innerText = totalPrice;
    }

    addProduct(product) {
        let productId = product.id_product;
        let result = this.goods.find(product => product.id_product == productId);
        if (result) {
            result.quantity++;
            this._updateCart(result);
        } else {
            product.quantity = 1;
            this.goods.push(product);
            const block = document.querySelector(this.container);
            const productObj = new CartItem(product);
            block.insertAdjacentHTML('afterbegin', productObj.render());
        }
    }

    removeProduct(productId) {
        let result = this.goods.find(product => product.id_product == productId);
        if (result.quantity > 1) {
            result.quantity--;
            this._updateCart(result);
        } else {
            this.goods.splice(this.goods.indexOf(result), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
            this._getTotalPrice();
        }
    }

    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `${product.quantity * product.price}$`;
        this._getTotalPrice();
    }

    render() {
        const block = document.querySelector(this.container);
        for (let good of this.goods) {
            const productObj = new CartItem(good);
            block.insertAdjacentHTML('afterbegin', productObj.render());
        }
        this._getTotalPrice();
    }

    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('hidden');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                let productId = +e.target.dataset['id'];
                this.removeProduct(productId);
            }
        })
    }
}

class CartItem {
    constructor(good, img = 'https://via.placeholder.com/100x75') {
        this.title = good.product_name;
        this.price = good.price;
        this.id = good.id_product;
        this.quantity = good.quantity;
        this.img = img;
    }
    render() {
        return `<div class="cart-item" data-id="${this.id}">
            <div class="product-bio">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.title}</p>
            <p class="product-quantity">Quantity: ${this.quantity}</p>
        <p class="product-single-price">$${this.price} each</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">${this.quantity * this.price}$</p>
            <button class="del-btn" data-id="${this.id}">&times;</button>
        </div>
        </div>`
    }
}

let cart = new Cart();
let list = new ProductsList();


