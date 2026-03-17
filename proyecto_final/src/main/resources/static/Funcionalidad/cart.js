document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cartItemsContainer')) {
        renderizarCarrito();
    }
});

function renderizarCarrito() {
    const contenedor = document.getElementById('cartItemsContainer');
    const elSubtotal = document.getElementById('cartSubtotal');
    const elTotal = document.getElementById('cartTotal');

    if (!contenedor) return;

    if (articulosCarrito.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center py-12 bg-white rounded-xl border border-gray-200">
                <i data-lucide="shopping-cart" class="w-12 h-12 text-gray-300 mx-auto mb-4"></i>
                <p class="text-gray-500 text-lg">Tu carrito está vacío</p>
                <button onclick="window.location.href='Shop.html'" class="mt-4 text-orange-600 font-medium hover:underline">Volver a la tienda</button>
            </div>
        `;
        if (elSubtotal) elSubtotal.innerText = '€0.00';
        if (elTotal) elTotal.innerText = '€0.00';
    } else {
        contenedor.innerHTML = '';
        let total = 0;

        articulosCarrito.forEach((item, index) => {
            const precio = parseFloat(item.precio || 0);
            total += precio;
            const el = document.createElement('div');
            el.className = 'flex gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm items-center';
            el.innerHTML = `
                <div class="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src="${item.imagenUrl}" alt="${item.nombre}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <h3 class="font-medium text-lg leading-tight mb-1">${item.nombre}</h3>
                    <p class="text-sm text-gray-500 mb-2">${item.categoria}</p>
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-lg">€${precio.toFixed(2)}</span>
                        <button onclick="eliminarDelCarrito(${index})" class="text-red-500 hover:text-red-700 text-sm font-medium">Eliminar</button>
                    </div>
                </div>
            `;
            contenedor.appendChild(el);
        });

        if (elSubtotal) elSubtotal.innerText = '€' + total.toFixed(2);
        if (elTotal) elTotal.innerText = '€' + total.toFixed(2);
    }
    inicializarIconos();
}

function eliminarDelCarrito(indice) {
    articulosCarrito.splice(indice, 1);
    contadorCarrito = articulosCarrito.length;
    localStorage.setItem('gymCoreCart', JSON.stringify(articulosCarrito));
    actualizarInsigniaCarrito();
    renderizarCarrito();
}

function gestionarPago() {
    if (!articulosCarrito || articulosCarrito.length === 0) {
        mostrarNotificacion('Tu carrito está vacío', 'error');
        return;
    }

    const btn = document.getElementById('checkoutBtn');
    if (btn) {
        const textoOriginal = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 mr-2 animate-spin"></i> Procesando...';
        btn.disabled = true;

        if (typeof lucide !== 'undefined') lucide.createIcons();

        setTimeout(() => {
            articulosCarrito = [];
            localStorage.setItem('gymCoreCart', JSON.stringify(articulosCarrito));
            contadorCarrito = 0;
            actualizarInsigniaCarrito();
            renderizarCarrito();

            mostrarNotificacion('¡Pago realizado con éxito!', 'success');

            btn.innerHTML = textoOriginal;
            btn.disabled = false;

            setTimeout(() => { window.location.href = 'Home.html'; }, 2000);
        }, 1500);
    }
}
