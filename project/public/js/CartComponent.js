Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    item.imgPath = `img/${item.id_product}small.jpg`;
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
    template: `<div>
<button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
        <div class="cart-block" v-show="showCart">
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
    <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some img">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity"> {{ cartItem.quantity }} p.</div>
                            <button class="del-btn" @click="$emit('add', cartItem)">+</button>
                            <div class="product-single-price"> {{ cartItem.price }}$ each</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                        <div class="product-price">{{cartItem.quantity*cartItem.price}}$</div>
                    </div>
                </div>
    `
})