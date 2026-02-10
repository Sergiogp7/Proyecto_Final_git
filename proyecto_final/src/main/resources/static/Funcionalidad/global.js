let productos = [];
let articulosCarrito = [];
let contadorCarrito = 0;

try {
    const guardado = localStorage.getItem('gymCoreCart');
    if (guardado) {
        articulosCarrito = JSON.parse(guardado);
        contadorCarrito = articulosCarrito.length;
    }
} catch (e) { }

document.addEventListener('DOMContentLoaded', () => {
    inicializarIconos();
    configurarNavegacion();
    actualizarInsigniaCarrito();
});

function inicializarIconos() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function configurarNavegacion() {
    const itemsNav = document.querySelectorAll('[data-nav-id]');
    itemsNav.forEach(item => {
        item.addEventListener('click', (e) => {
            const idPagina = item.getAttribute('data-nav-id');
            gestionarNavegacion(idPagina);
        });
    });
}

function gestionarNavegacion(idPagina) {
    // Using absolute paths for consistency
    if (idPagina === 'home') window.location.href = '/Estructura/Home.html';
    else if (idPagina === 'shop') window.location.href = '/Estructura/Shop.html';
    else if (idPagina === 'bookings') window.location.href = '/Estructura/Bookings.html';
    else if (idPagina === 'social') window.location.href = '/Estructura/Social.html';
    else if (idPagina === 'profile') window.location.href = '/Estructura/Profile.html';
    else if (idPagina === 'cart') window.location.href = '/Estructura/Cart.html';
    else if (idPagina === 'logout') window.location.href = '/index.html';
}

function actualizarInsigniaCarrito() {
    const insignia = document.getElementById('cartBadge');
    if (insignia) insignia.innerText = contadorCarrito;
}

function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    if (producto) {
        articulosCarrito.push(producto);
        contadorCarrito++;
        localStorage.setItem('gymCoreCart', JSON.stringify(articulosCarrito));
        actualizarInsigniaCarrito();

        mostrarNotificacion('Producto añadido al carrito', 'success');
    }
}

function gestionarBusquedaGlobal() {
    if (window.location.href.includes('Shop.html')) {
        const input = document.getElementById('searchInput');
        if (input) {
            input.focus();
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } else {
        mostrarNotificacion('Ve a la Tienda para buscar productos', 'info');
    }
}

function gestionarNotificaciones() {
    mostrarNotificacion('Tienes 3 notificaciones nuevas', 'info');
}

function gestionarNoImplementado(caracteristica) {
    mostrarNotificacion(`${caracteristica} estará disponible próximamente`, 'info');
}

function mostrarNotificacion(mensaje, tipo = 'success') {
    const notificacion = document.createElement('div');
    notificacion.className = `fixed bottom-6 right-6 z-[1000] transform transition-all duration-300 translate-y-20 opacity-0`;
    notificacion.innerHTML = `
        <div class="bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-gray-800">
            <div class="${tipo === 'error' ? 'bg-red-500' : tipo === 'info' ? 'bg-blue-500' : 'bg-green-500'} rounded-full p-1">
                <i data-lucide="${tipo === 'error' ? 'x' : tipo === 'info' ? 'info' : 'check'}" class="w-4 h-4 text-white"></i>
            </div>
            <div>
                <h4 class="font-medium">${tipo === 'error' ? 'Error' : tipo === 'info' ? 'Info' : 'Éxito'}</h4>
                <p class="text-sm text-gray-300">${mensaje}</p>
            </div>
        </div>
    `;

    document.body.appendChild(notificacion);
    lucide.createIcons();

    requestAnimationFrame(() => {
        notificacion.classList.remove('translate-y-20', 'opacity-0');
    });

    setTimeout(() => {
        notificacion.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => notificacion.remove(), 300);
    }, 3000);
}
