Vue.component('error', {
    template: `<p v-show="$parent.error">Ошибка соединения с сервером!</p>`
})