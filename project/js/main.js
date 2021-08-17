const products = [
    { id: 1, title: 'Notebook', price: 2000, image: './img/notebook.jpg', alt: 'Фото ноутбука' },
    { id: 2, title: 'Mouse', price: 20, image: './img/mouse.jpg', alt: 'Фото мышки' },
    { id: 3, title: 'Keyboard', price: 200, image: './img/keyboard.jpg', alt: 'Фото клавиатуры' },
    { id: 4, title: 'Gamepad', price: 50, image: './img/gamepad.jpg', alt: 'Фото геймпада' },
];

/**
 * Функция для формирования верстки каждого товара
 *
 * @param {Object} item
 * @return {string} 
 */
const renderProduct = item => {
    return `<div class="product-item">
                <h3>${item.title}</h3>
                <img src="${item.image}" alt="${item.alt}">
                <p>Цена: ${item.price} руб.</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

/**
 * Функция для добавления верстки всех товаров на страницу
 *
 * @param {Object} list
 */
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);