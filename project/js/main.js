class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();
        this.calcProductsPrice();
    }

    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000, image: './img/notebook.jpg', alt: 'Фото ноутбука' },
            { id: 2, title: 'Mouse', price: 20, image: './img/mouse.jpg', alt: 'Фото мышки' },
            { id: 3, title: 'Keyboard', price: 200, image: './img/keyboard.jpg', alt: 'Фото клавиатуры' },
            { id: 4, title: 'Gamepad', price: 50, image: './img/gamepad.jpg', alt: 'Фото геймпада' },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }

    calcProductsPrice() {
        let productsPrice = 0;
        for (let product of this.goods) {
            productsPrice += product.price;
        }
        console.log(productsPrice);
    }
}

class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = product.image;
        this.alt = product.alt;
    }
    render() {
        return `<div class="product-item">
                <h3>${this.title}</h3>
                <img src="${this.img}" alt="${this.alt}">
                <p>Цена: ${this.price} руб.</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class Cart {
    constructor() {
        this.addProduct();
        this.removeProduct();
        this.changeCartCount();
        this.clearCart();
        this.calcCartTotalPrice();
    }
}

class CartItem {
    constructor() {
        this.render();
        this.calcItemCount();
        this.calcItemTotalPrice();
    }
}

let list = new ProductList();