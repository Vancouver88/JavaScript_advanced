Vue.component('filter-el', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: ` <form action="#" class="search" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" class="search__input" placeholder="Search" v-model="userSearch">
                <button class="search__button" type="submit">
                <img src="./img/search.svg" width="26" height="27" alt="search">
                </button>
                </form>`
})