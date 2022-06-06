function enter() {
   console.log('Acessar seu perfil');
}

function menu() {
    const menuClose = document.getElementById('menu-close');
    const menu = document.getElementById('menu');

    menu.addEventListener('mouseenter', () => menuClose.style.display = 'block');
    menu.addEventListener('mouseleave', () => menuClose.style.display = 'none');

}

menu();