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