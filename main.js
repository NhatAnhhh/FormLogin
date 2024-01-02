const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const form = document.querySelector('form');
const container = document.querySelector('.container')

function showError(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector('small')
    parent.classList.add('error')
    small.innerText = message
}

function showSuccess(input) {
    let parent = input.parentElement;
    let small = parent.querySelector('small')
    parent.classList.remove('error')
    small.innerText = ''
}

function checkEmptyError(listInput) {
    listInput.forEach(input => {
        input.value = input.value.trim();

        if (!input.value) {
            showError(input, 'loi')
        } else {
            showSuccess(input)
        }
    });
}

function checkEmailError(input) {
    const regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    input.value = input.value.trim();

    let isEmptyEmail = !regexEmail.test(input.value)
    if (regexEmail.test(input.value)) {
        showSuccess(input)
    } else {
        showError(input, 'Email Invalid')
    }
    return isEmptyEmail
}

function checkLengthError(input, min, max) {
    input.value = input.value.trim()

    if (input.value.length < min) {
        showError(input, `phai co it nhat ${min} ky tu`)
        return true
    } else if (input.value.length > max) {
        showError(input, `khong duoc qua ${max} ky tu`)
        return true
    }
    showSuccess(input)
    return false;
}

function checkMatchPass(passwordInput, cfPassword) {
    if (passwordInput.value !== cfPassword.value) {
        showError(cfPassword, 'Password not match ')
        return true
    }
    return false;
}

function saveData() {
    localStorage.setItem('dataForm', container.innerHTML)
}

function showData() {
    container.innerHTML = localStorage.getItem('dataForm')
}



form.addEventListener('submit', function (e) {
    e.preventDefault()


    let isEmptyError = checkEmptyError([username, email, password, confirmPassword])
    let isEmptyEmail = checkEmailError(email)
    let checkLengthUsername = checkLengthError(username, 4, 10)
    let checkLengthPassword = checkLengthError(password, 4, 10)
    let isCheckMatch = checkMatchPass(password, confirmPassword)

    if (isEmptyError || isEmptyEmail || checkLengthUsername || checkLengthPassword || isCheckMatch) {
        alert('Dang nhap khong thanh cong')
    } else {
        alert('Dang nhap thanh cong')
        saveData()
    }

})
