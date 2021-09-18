Vue.component('products', {
    data() {
        return {
            filtered: [],
            products: []
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    item.imgPath = `img/card${item.id_product}.jpg`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: ` <div class="cards">
                    <product v-for="item of filtered" 
                    :key="item.id_product" 
                    :img = "item.imgPath"
                    :product="item"
                    @add-product="$parent.$refs.cart.addProduct"></product>
                    <div class="cards__button">
                        <a href="#" class="button">Browse All Product</a>
                    </div>
                </div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    template: ` <article class="card">
                    <a href="#">
                        <img class="card__img" :src="img" alt="card1">
                        <div class="card__text">
                            <h4>{{product.product_name}}</h4>
                            <p>{{product.product_describe}}</p>
                            <p class="price">{{product.price}} $</p>
                        </div>
                    </a>
                    <div class="card-add">
                        <button class="card-add__cart" @click="$emit('add-product', product)">
                            <span class="iconify cart_icon" data-inline="false" data-icon="mdi-light:cart"></span>
                            <p>Add to Cart</p>
                        </button>
                    </div>
                </article>`
})