function user_status() {

    const accessToken = localStorage.getItem('accessToken');
    const registerLogin = document.querySelector(".register__login");
    const account = document.querySelector(".account");

    if (accessToken === null) {
        registerLogin.style.display = 'flex';
        account.style.display = 'none';
    } else {
        registerLogin.style.display = 'none';
        account.style.display = 'block'; 
        const tmpname = localStorage.getItem("name");
        account.textContent = `Xin chào ${tmpname}`;
    }
}

user_status();
