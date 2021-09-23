Vue.component('menu-el', {
    data() {
        return {
            showMenu: false
        }
    },
    template: `     <div class="header__item">
                        <div class="header__button" @click="showMenu = !showMenu">
                            <img src="./img/menu.svg" width="32" height="23" alt="menu">
                            <div class="header__menu" v-show="showMenu">
                                <h4>menu</h4>
                                <div class="header__menu__list">
                                    <h4>man</h4>
                                    <ul class="menu__list">
                                        <li><a href="#">Accessories</a></li>
                                        <li><a href="#">Bags</a></li>
                                        <li><a href="#">Denim</a></li>
                                        <li><a href="#">T-Shirts</a></li>
                                    </ul>
                                </div>
                                <div class="header__menu__list">
                                    <h4>woman</h4>
                                    <ul class="menu__list">
                                        <li><a href="#">Accessories</a></li>
                                        <li><a href="#">Jackets & Coats</a></li>
                                        <li><a href="#">Polos</a></li>
                                        <li><a href="#">T-Shirts</a></li>
                                        <li><a href="#">Shirts</a></li>
                                    </ul>
                                </div>
                                <div class="header__menu__list">
                                    <h4>kids</h4>
                                    <ul class="menu__list">
                                        <li><a href="#">Accessories</a></li>
                                        <li><a href="#">Jackets & Coats</a></li>
                                        <li><a href="#">Polos</a></li>
                                        <li><a href="#">T-Shirts</a></li>
                                        <li><a href="#">Shirts</a></li>
                                        <li><a href="#">Bags</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>`
})