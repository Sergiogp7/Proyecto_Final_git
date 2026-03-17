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
        item.addEventListener('click', () => {
            const idPagina = item.getAttribute('data-nav-id');
            gestionarNavegacion(idPagina);
        });
    });
}

function gestionarNavegacion(idPagina) {
    if (idPagina === 'home') window.location.href = 'Home.html';
    else if (idPagina === 'shop') window.location.href = 'Shop.html';
    else if (idPagina === 'bookings') window.location.href = 'Bookings.html';
    else if (idPagina === 'social') window.location.href = 'Social.html';
    else if (idPagina === 'profile') window.location.href = 'Profile.html';
    else if (idPagina === 'cart') window.location.href = 'Cart.html';
    else if (idPagina === 'logout') {
        localStorage.removeItem('gymCoreUser');
        window.location.href = '../index.html';
    }
}

function actualizarInsigniaCarrito() {
    const insignia = document.getElementById('cartBadge');
    if (insignia) {
        insignia.innerText = contadorCarrito;
        if (contadorCarrito > 0) {
            insignia.classList.remove('hidden');
            insignia.classList.add('flex');
        } else {
            insignia.classList.add('hidden');
            insignia.classList.remove('flex');
        }
    }
    actualizarDropdownCarrito();
}

function gestionarCarrito() {
    let panel = document.getElementById('cartDropdown');
    if (!panel) return;

    const isOpen = !panel.classList.contains('pointer-events-none');
    if (isOpen) {
        panel.classList.add('pointer-events-none', 'opacity-0', 'scale-95', 'translate-y-2');
    } else {
        panel.classList.remove('pointer-events-none', 'opacity-0', 'scale-95', 'translate-y-2');
    }
}

function actualizarDropdownCarrito() {
    let panel = document.getElementById('cartDropdown');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'cartDropdown';
        panel.className = 'fixed top-20 right-20 w-80 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-[60] overflow-hidden transition-all duration-300 translate-y-2 opacity-0 pointer-events-none scale-95 origin-top-right';
        document.body.appendChild(panel);

        document.addEventListener('click', (e) => {
            const cartBtn = document.querySelector('[onclick*="gestionarNavegacion(\'cart\')"]') || document.querySelector('[data-nav-id="cart"]');
            if (panel && !panel.contains(e.target) && cartBtn && !cartBtn.contains(e.target)) {
                panel.classList.add('pointer-events-none', 'opacity-0', 'scale-95', 'translate-y-2');
            }
        });
    }

    if (articulosCarrito.length === 0) {
        panel.innerHTML = `
            <div class="p-8 text-center">
                <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i data-lucide="shopping-cart" class="w-8 h-8 text-gray-300"></i>
                </div>
                <p class="text-sm text-gray-500">Tu carrito está vacío</p>
                <button onclick="gestionarNavegacion('shop');" class="mt-4 text-xs font-bold text-orange-500 uppercase tracking-widest hover:text-orange-600">Ir a la tienda</button>
            </div>
        `;
    } else {
        const itemsHTML = articulosCarrito.slice(0, 3).map(item => `
            <div class="flex gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50">
                <img src="${item.imagenUrl}" class="w-12 h-12 rounded-lg object-cover">
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-gray-900 truncate">${item.nombre}</p>
                    <p class="text-xs text-orange-600 font-medium">€${item.precio}</p>
                </div>
            </div>
        `).join('');

        const total = articulosCarrito.reduce((sum, item) => sum + (parseFloat(item.precio) || 0), 0);

        panel.innerHTML = `
            <div class="p-4 border-b border-gray-100 flex items-center justify-between bg-orange-50/50">
                <span class="font-bold text-gray-900">Carrito (${articulosCarrito.length})</span>
                <span class="text-xs font-bold text-orange-600">Total: €${total.toFixed(2)}</span>
            </div>
            <div class="max-h-60 overflow-y-auto">
                ${itemsHTML}
            </div>
            ${articulosCarrito.length > 3 ? `<p class="p-2 text-center text-[10px] text-gray-400 font-medium">+ ${articulosCarrito.length - 3} artículos más</p>` : ''}
            <div class="p-4 grid grid-cols-2 gap-2">
                <button onclick="gestionarNavegacion('cart')" class="text-xs font-bold py-3 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all uppercase tracking-tighter">Ver Carrito</button>
                <button onclick="gestionarNavegacion('cart')" class="text-xs font-bold py-3 px-4 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20 uppercase tracking-tighter">Pagar</button>
            </div>
        `;
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
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
    const badge = document.getElementById('notificationBadge');
    if (badge) {
        badge.classList.add('hidden');
    }

    let panel = document.getElementById('notificationPanel');

    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'notificationPanel';
        panel.className = 'fixed top-20 right-6 w-96 bg-white/90 backdrop-blur-xl border border-gray-200/80 rounded-2xl shadow-2xl z-[60] overflow-hidden transition-all duration-300 translate-y-2 opacity-0 pointer-events-none scale-95 origin-top-right';
        panel.innerHTML = `
            <div class="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50 to-transparent">
                <h3 class="font-bold text-gray-900 flex items-center gap-2">
                    <i data-lucide="bell" class="w-5 h-5 text-orange-500"></i>
                    Notificaciones
                </h3>
                <span class="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full uppercase tracking-wider">3 Nuevas</span>
            </div>
            <div class="max-h-[400px] overflow-y-auto overflow-x-hidden scrollbar-hide py-2">
                <div class="hover:bg-orange-50/50 p-4 transition-colors cursor-pointer flex gap-4 items-start group">
                    <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                        <i data-lucide="heart" class="w-5 h-5 fill-current"></i>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm text-gray-800"><span class="font-bold">@lau_fit</span> le ha gustado tu publicación</p>
                        <p class="text-[10px] text-gray-400 mt-1">Hace 5 minutos</p>
                    </div>
                    <div class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                </div>
                <div class="hover:bg-orange-50/50 p-4 transition-colors cursor-pointer flex gap-4 items-start group">
                    <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <i data-lucide="message-circle" class="w-5 h-5"></i>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm text-gray-800"><span class="font-bold">Carlos Ruiz</span> ha comentado: <span class="italic text-gray-500">"¡Esa es la actitud, sigue así! 💪"</span></p>
                        <p class="text-[10px] text-gray-400 mt-1">Hace 15 minutos</p>
                    </div>
                    <div class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                </div>
                <div class="hover:bg-orange-50/50 p-4 transition-colors cursor-pointer flex gap-4 items-start group border-b border-gray-50">
                    <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                        <i data-lucide="message-circle" class="w-5 h-5"></i>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm text-gray-800"><span class="font-bold">Ana Torroja</span> ha comentado: <span class="italic text-gray-500">"¡Vaya cambio! 🔥 Pasé por el gym y te vi entrenando duro."</span></p>
                        <p class="text-[10px] text-gray-400 mt-1">Hace 1 hora</p>
                    </div>
                    <div class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                </div>
            </div>
            <div class="p-3 bg-gray-50 text-center border-t border-gray-100">
                <button onclick="this.parentElement.parentElement.classList.add('pointer-events-none', 'opacity-0', 'scale-95', 'translate-y-2');" class="text-xs font-bold text-gray-500 hover:text-orange-600 transition-colors uppercase tracking-widest">Cerrar Notificaciones</button>
            </div>
        `;
        document.body.appendChild(panel);
        if (typeof lucide !== 'undefined') lucide.createIcons();

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            const bell = document.querySelector('[onclick="gestionarNotificaciones()"]');
            if (panel && !panel.contains(e.target) && !bell.contains(e.target)) {
                panel.classList.add('pointer-events-none', 'opacity-0', 'scale-95', 'translate-y-2');
            }
        });
    }

    const isOpen = !panel.classList.contains('pointer-events-none');
    if (isOpen) {
        panel.classList.add('pointer-events-none', 'opacity-0', 'scale-95', 'translate-y-2');
    } else {
        panel.classList.remove('pointer-events-none', 'opacity-0', 'scale-95', 'translate-y-2');
    }
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
    if (typeof lucide !== 'undefined') lucide.createIcons();

    requestAnimationFrame(() => {
        notificacion.classList.remove('translate-y-20', 'opacity-0');
    });

    setTimeout(() => {
        notificacion.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => notificacion.remove(), 300);
    }, 3000);
}
