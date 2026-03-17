let filtroCategoria = 'all';
let filtroBusqueda = '';

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productList')) {
        cargarProductos();
        configurarFiltros();
    }
});

async function cargarProductos() {
    try {
        const respuesta = await fetch('/api/products');
        if (respuesta.ok) {
            productos = await respuesta.json();
            renderizarProductos();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function configurarFiltros() {
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('bg-gray-900', 'text-white'));
            tab.classList.add('bg-gray-900', 'text-white');
            filtroCategoria = tab.getAttribute('data-category');
            renderizarProductos();
        });
    });

    const buscador = document.getElementById('searchInput');
    if (buscador) {
        buscador.addEventListener('input', (e) => {
            filtroBusqueda = e.target.value.toLowerCase();
            renderizarProductos();
        });
    }
}

function renderizarProductos() {
    const lista = document.getElementById('productList');
    if (!lista) return;

    const filtrados = productos.filter(p => {
        const coincideCat = filtroCategoria === 'all' || p.categoria === filtroCategoria;
        const coincideBusq = p.nombre.toLowerCase().includes(filtroBusqueda);
        return coincideCat && coincideBusq;
    });

    lista.innerHTML = filtrados.map(p => `
        <div class="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-500">
            <div class="relative aspect-square overflow-hidden bg-gray-50">
                <img src="${p.imagenUrl}" alt="${p.nombre}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                ${p.badge ? `
                <div class="absolute top-4 left-4">
                    <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-${p.badgeColor}-600 border border-${p.badgeColor}-100 shadow-sm">
                        ${p.badge}
                    </span>
                </div>` : ''}
                <button onclick="agregarAlCarrito(${p.id})" class="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 w-12 h-12 rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 flex items-center justify-center hover:bg-orange-600">
                    <i data-lucide="shopping-cart" class="w-5 h-5"></i>
                </button>
            </div>
            <div class="p-6">
                <div class="flex items-center gap-1 mb-2">
                    <div class="flex text-orange-400">
                        <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
                    </div>
                    <span class="text-xs font-bold text-gray-900">${p.rating || '5.0'}</span>
                    <span class="text-xs text-gray-400">(${p.reviewsCount || '0'})</span>
                </div>
                <h3 class="font-bold text-gray-900 mb-2 line-clamp-1">${p.nombre}</h3>
                <div class="flex items-center justify-between">
                    <div class="flex flex-col">
                        ${p.precioAnterior ? `<span class="text-xs text-gray-400 line-through">€${p.precioAnterior}</span>` : ''}
                        <span class="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">€${p.precio}</span>
                    </div>
                    <span class="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">EN STOCK</span>
                </div>
            </div>
        </div>
    `).join('');

    inicializarIconos();
}
