Vue.component('cart', {
    data() {
        return {
            cartItems: [],
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    item.imgPath = `img/card${item.id_product}small.jpg`;
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        fetchProducts(url) {
            return fetch(url)
                .then(answer => answer.json())
                .catch(error => console.log(error));
        },
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${product.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${product.id_product}`, product)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        } else {
                            console.log('error');
                        }
                    })
            }
        }
    },
    template: ` <div class="header__item">
                    <button class="header__button" type="button" @click="showCart = !showCart">
                        <img src="./img/basket.svg" width="32" height="29" alt="basket">
                    </button>
                    <div class="cart" v-show="showCart">
                    <p v-if="!cartItems.length">Корзина пуста!</p>
                        <cart-item v-for="item of cartItems" 
                        :key="item.id_product" 
                        :img="item.imgPath" 
                        :cart-item="item" 
                        @remove="remove" 
                        @add="addProduct">
                        </cart-item>
                    </div>
                </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
                <div class="cart__item">
                    <div class="cart__item-left">
                        <img :src="img" alt="Some img">
                        <div class="product-desc">
                            <div class="product-title">Name: {{cartItem.product_name}}</div>
                            <div class="product-quantity">Quantity: {{cartItem.quantity}}
                                <button class="add-btn" @click="$emit('add', cartItem)">+</button>
                            </div>
                            <div class="product-single-price">Price: {{cartItem.price}}$ each</div>
                        </div>
                    </div>
                    <div class="cart__item-right">
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                        <div class="product-price">Total: {{cartItem.quantity*cartItem.price}}$</div>
                    </div>
                </div>
    `
})