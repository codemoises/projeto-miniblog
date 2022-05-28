function enter() {
    window.location.href = "feedScreen.html";
}

function username() {
    const userName = document.getElementById('username');
    const user = document.getElementById('user');

    const name = 'Marcelo Rodriguez';
    const user1 = 'marcelinhopika123';
    

    userName.innerHTML = `<h1>${name}</h1>`;
    user.innerHTML = `<p>@${user1}</p>`
}
username()

function menuView() {
    const options = document.getElementById('options');
    const menuView = document.getElementById('menu');

    

    if (menuView) {
        options.style.display = 'block';
        menuView.style.display = 'none';
    }
}

function closeMenu() {
    const options = document.getElementById('options');
    const menuView = document.getElementById('menu');

    

    if (menuView) {
        options.style.display = 'none';
        menuView.style.display = 'block';
    }
}