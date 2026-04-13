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
            tabs.forEach(t => {
                t.classList.remove('bg-white', 'text-gray-900', 'shadow-sm');
                t.classList.add('text-gray-500', 'hover:text-gray-900');
            });
            tab.classList.remove('text-gray-500', 'hover:text-gray-900');
            tab.classList.add('bg-white', 'text-gray-900', 'shadow-sm');
            
            filtroCategoria = tab.getAttribute('data-tab-category');
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

    lista.innerHTML = '';
    filtrados.forEach((p, index) => {
        const el = document.createElement('div');
        el.className = "group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-700 fade-in-scale glass-card";
        el.style.animationDelay = `${index * 0.05}s`;
        
        el.innerHTML = `
            <div class="relative aspect-[4/5] overflow-hidden bg-gray-50">
                <img src="${p.imagenUrl}" alt="${p.nombre}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000">
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                ${p.badge ? `
                <div class="absolute top-5 left-5">
                    <span class="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white shadow-xl text-orange-600 border border-orange-50">
                        ${p.badge}
                    </span>
                </div>` : ''}
            </div>
            <div class="p-6">
                <div class="flex items-center gap-1.5 mb-3">
                    <div class="flex text-orange-400">
                        <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                    </div>
                    <span class="text-xs font-black text-gray-900">${p.rating || '5.0'}</span>
                    <span class="text-[10px] text-gray-400 font-medium uppercase tracking-widest">(${p.reviewsCount || '12'} reviews)</span>
                </div>
                <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 text-lg leading-tight group-hover:text-orange-600 transition-colors">${p.nombre}</h3>
                <div class="flex items-end justify-between mt-auto pt-4">
                    <div class="flex flex-col">
                        ${p.precioAnterior ? `<span class="text-xs text-gray-400 line-through mb-0.5">€${p.precioAnterior}</span>` : ''}
                        <span class="text-2xl font-black text-gray-900 tracking-tighter">€${p.precio}</span>
                    </div>
                    <div class="flex flex-col items-end gap-2">
                        <span class="text-[9px] font-black text-green-600 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-widest">Disponible</span>
                        <button onclick="agregarAlCarrito(${p.id})" class="mt-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-bold rounded-xl transition flex items-center shadow-lg shadow-orange-500/20">
                            <i data-lucide="shopping-cart" class="w-4 h-4 mr-1.5"></i> Añadir
                        </button>
                    </div>
                </div>
            </div>
        `;
        lista.appendChild(el);
    });

    inicializarIconos();
}
