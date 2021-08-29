document.querySelector('.form').addEventListener('submit', e => {
    const name = document.getElementById('name');
    const tel = document.getElementById('tel');
    const mail = document.getElementById('email');
    const text = document.getElementById('text');

    const isName = /^[A-Z]+$/i.test(name.value);
    if (!isName) {
        document.querySelector('.nameErr').classList.remove('hidden');
        name.classList.add('inputErr');
        e.preventDefault();
    } else {
        document.querySelector('.nameErr').classList.add('hidden');
        document.getElementById('name').classList.remove('inputErr');
    }

    let rightTel = tel.value.replace(/\D+/g, '')
    const isTel = /^(7|8)?9\d{9}$/.test(rightTel);
    if (!isTel) {
        document.querySelector('.telErr').classList.remove('hidden');
        tel.classList.add('inputErr');
        e.preventDefault();
    } else {
        document.querySelector('.telErr').classList.add('hidden');
        tel.classList.remove('inputErr');
    }

    const isEmail = /^(.+)@mail.ru$/.test(mail.value);
    if (!isEmail) {
        document.querySelector('.mailErr').classList.remove('hidden');
        mail.classList.add('inputErr');
        e.preventDefault();
    } else {
        document.querySelector('.mailErr').classList.add('hidden');
        mail.classList.remove('inputErr');
    }

    const isText = /^(.+)$/.test(text.value);
    if (!isText) {
        document.querySelector('.textErr').classList.remove('hidden');
        text.classList.add('inputErr');
        e.preventDefault();
    } else {
        document.querySelector('.textErr').classList.add('hidden');
        text.classList.remove('inputErr');
    }
});