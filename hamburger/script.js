'use strict';

class ComponentsList {
    constructor() {
        this.size = [
            { name: 'small', cost: 50, cal: 20 },
            { name: 'large', cost: 100, cal: 40 }
        ]
        this.options = [
            { name: 'cheese', cost: 10, cal: 20 },
            { name: 'salad', cost: 20, cal: 5 },
            { name: 'potato', cost: 15, cal: 10 },
            { name: 'spice', cost: 15, cal: 0 },
            { name: 'mayonez', cost: 20, cal: 5 }
        ]
    }
}

class Hamburger {
    constructor(componentsList) {
        this.size = '';
        this.options = [];
        this.componentsList = componentsList;
    }

    createHamburger() {

        this.size = document.querySelector('input[name="size"]:checked').id;

        let options = [];
        const optionsInputs = document.getElementsByName('add');

        optionsInputs.forEach(el => {
            if (el.checked) options.push(el.id);
        });

        this.options = options;

        this.drawResult();
    }

    calcParam() {
        let result = { cost: 0, cal: 0 };

        this.componentsList.size.forEach(el => {
            if (el.name === this.size) {
                result.cost += el.cost;
                result.cal += el.cal;
            }
        });

        this.componentsList.options.forEach(el => {
            this.options.forEach(item => {
                if (el.name === item) {
                    result.cost += el.cost;
                    result.cal += el.cal;
                }
            });
        });

        return result;
    }

    drawResult() {
        const burgerResult = this.calcParam();
        document.getElementById('burger-cost').innerText = burgerResult.cost;
        document.getElementById('burger-cal').innerText = burgerResult.cal;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const componentsList = new ComponentsList();
    const burger = new Hamburger(componentsList);

    burger.createHamburger();

    document.addEventListener('input', () => {
        burger.createHamburger();
    });
});