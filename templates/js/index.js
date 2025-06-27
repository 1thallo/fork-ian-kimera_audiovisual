document.addEventListener('DOMContentLoaded', () => {
    const navRede = document.getElementById('nav-rede');
    const navBuscar = document.getElementById('nav-buscar');
    const navPerfil = document.getElementById('nav-perfil');
    const navLogin = document.getElementById('nav-login');
    const navRegistro = document.getElementById('nav-registro');

    const token = localStorage.getItem('token');

    if (token) {
        navRede.style.display = 'block';
        navBuscar.style.display = 'block';
        navPerfil.style.display = 'block';

        navLogin.style.display = 'none';
        navRegistro.style.display = 'none';

    } else {
        navLogin.style.display = 'block';
        navRegistro.style.display = 'block';

        navRede.style.display = 'none';
        navBuscar.style.display = 'none';
        navPerfil.style.display = 'none';
    }
});