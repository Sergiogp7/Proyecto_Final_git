let productos = [];
let articulosCarrito = [];
let contadorCarrito = 0;

try {
    const guardado = localStorage.getItem('gymCoreCart');
    if (guardado) {
        articulosCarrito = JSON.parse(guardado);
        contadorCarrito = articulosCarrito.reduce((suma, item) => suma + (item.cantidad || 1), 0);
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
                    <p class="text-sm font-bold text-gray-900 truncate">${item.nombre} <span class="text-gray-500 font-normal">x${item.cantidad || 1}</span></p>
                    <p class="text-xs text-orange-600 font-medium">€${item.precio}</p>
                </div>
            </div>
        `).join('');

        const total = articulosCarrito.reduce((sum, item) => sum + (parseFloat(item.precio) || 0) * (item.cantidad || 1), 0);

        panel.innerHTML = `
            <div class="p-4 border-b border-gray-100 flex items-center justify-between bg-orange-50/50">
                <span class="font-bold text-gray-900">Carrito (${contadorCarrito})</span>
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
        const itemExistente = articulosCarrito.find(item => item.id === idProducto);
        if (itemExistente) {
            itemExistente.cantidad = (itemExistente.cantidad || 1) + 1;
        } else {
            articulosCarrito.push({ ...producto, cantidad: 1 });
        }
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

let notificaciones = [];

document.addEventListener('DOMContentLoaded', () => {
    inicializarIconos();
    configurarNavegacion();
    actualizarInsigniaCarrito();
    actualizarInsigniaNotificaciones();
});

async function actualizarInsigniaNotificaciones() {
    const usuarioGuardado = localStorage.getItem('gymCoreUser');
    if (!usuarioGuardado) return;
    const u = JSON.parse(usuarioGuardado);

    try {
        const respuesta = await fetch(`/api/notificaciones/${u.username}`);
        if (respuesta.ok) {
            notificaciones = await respuesta.json();
            const badge = document.getElementById('notificationBadge');
            if (badge) {
                const unreadCount = notificaciones.filter(n => !n.leida).length;
                badge.innerText = unreadCount;
                if (unreadCount > 0) {
                    badge.classList.remove('hidden');
                    badge.classList.add('flex');
                } else {
                    badge.classList.add('hidden');
                    badge.classList.remove('flex');
                }
            }
        }
    } catch (error) {
        console.error('Error cargando notificaciones:', error);
    }
}

function gestionarNotificaciones() {
    let panel = document.getElementById('notificationPanel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'notificationPanel';
        panel.className = 'fixed top-20 right-6 w-96 bg-white/95 backdrop-blur-xl border border-gray-200/80 rounded-2xl shadow-2xl z-[60] overflow-hidden transition-all duration-300 translate-y-2 opacity-0 pointer-events-none scale-95 origin-top-right';
        document.body.appendChild(panel);

        document.addEventListener('click', (e) => {
            if (panel && !panel.contains(e.target) && !e.target.closest('[onclick="gestionarNotificaciones()"]')) {
                panel.classList.add('pointer-events-none', 'opacity-0', 'scale-95', 'translate-y-2');
            }
        });
    }

    renderizarNotificaciones(panel);

    const isOpen = !panel.classList.contains('pointer-events-none');
    if (isOpen) {
        panel.classList.add('pointer-events-none', 'opacity-0', 'scale-95', 'translate-y-2');
    } else {
        panel.classList.remove('pointer-events-none', 'opacity-0', 'scale-95', 'translate-y-2');
    }
}

function renderizarNotificaciones(panel) {
    const unreadCount = notificaciones.filter(n => !n.leida).length;
    
    const itemsHTML = notificaciones.map(n => {
        let color = 'bg-orange-100 text-orange-600';
        let icono = 'bell';
        if (n.tipo === 'like') { color = 'bg-orange-100 text-orange-600'; icono = 'heart'; }
        else if (n.tipo === 'comment') { color = 'bg-blue-100 text-blue-600'; icono = 'message-circle'; }

        return `
            <div onclick="marcarComoLeida(${n.id})" class="hover:bg-orange-50/50 p-4 transition-colors cursor-pointer flex gap-4 items-start group ${n.leida ? 'opacity-60' : ''}">
                <div class="w-10 h-10 rounded-full ${color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <i data-lucide="${icono}" class="w-5 h-5 ${icono === 'heart' ? 'fill-current' : ''}"></i>
                </div>
                <div class="flex-1">
                    <p class="text-sm text-gray-800">${n.mensaje}</p>
                    <p class="text-[10px] text-gray-400 mt-1">Recientemente</p>
                </div>
                ${!n.leida ? '<div class="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm shadow-orange-500/40 animate-pulse mt-2"></div>' : ''}
            </div>
        `;
    }).join('');

    panel.innerHTML = `
        <div class="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50 to-transparent">
            <h3 class="font-bold text-gray-900 flex items-center gap-2">
                <i data-lucide="bell" class="w-5 h-5 text-orange-500"></i>
                Notificaciones
            </h3>
            ${unreadCount > 0 ? `<span class="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full uppercase tracking-wider">${unreadCount} Nuevas</span>` : ''}
        </div>
        <div class="max-h-[400px] overflow-y-auto overflow-x-hidden scrollbar-hide py-2">
            ${notificaciones.length > 0 ? itemsHTML : `
                <div class="text-center py-12">
                    <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i data-lucide="bell-off" class="w-8 h-8 text-gray-300"></i>
                    </div>
                    <p class="text-gray-500 font-medium text-base">No hay notificaciones</p>
                    <p class="text-xs text-gray-400 mt-1">Estás al día con todo.</p>
                </div>
            `}
        </div>
        <div class="p-4 bg-gray-50/50 border-t border-gray-100 flex gap-2">
            <button onclick="marcarTodasLeidas()" class="flex-1 text-[10px] font-bold py-2 rounded-lg border border-gray-200 hover:bg-white transition-all uppercase tracking-widest text-gray-500 hover:text-orange-600">Leídas</button>
            <button onclick="document.getElementById('notificationPanel').classList.add('pointer-events-none', 'opacity-0', 'scale-95', 'translate-y-2');" class="flex-1 text-[10px] font-bold py-2 rounded-lg bg-white border border-gray-200 hover:border-orange-200 transition-all uppercase tracking-widest text-gray-400">Cerrar</button>
        </div>
    `;
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

async function marcarComoLeida(id) {
    try {
        const response = await fetch(`/api/notificaciones/leer/${id}`, { method: 'POST' });
        if (response.ok) {
            actualizarInsigniaNotificaciones().then(() => {
                const panel = document.getElementById('notificationPanel');
                if (panel) renderizarNotificaciones(panel);
            });
        }
    } catch (error) {
        console.error('Error marcando notificación:', error);
    }
}

async function marcarTodasLeidas() {
    const usuarioGuardado = localStorage.getItem('gymCoreUser');
    if (!usuarioGuardado) return;
    const u = JSON.parse(usuarioGuardado);

    try {
        const response = await fetch(`/api/notificaciones/leer-todas/${u.username}`, { method: 'POST' });
        if (response.ok) {
            actualizarInsigniaNotificaciones().then(() => {
                const panel = document.getElementById('notificationPanel');
                if (panel) renderizarNotificaciones(panel);
            });
        }
    } catch (error) {
        console.error('Error marcando todas las notificaciones:', error);
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
