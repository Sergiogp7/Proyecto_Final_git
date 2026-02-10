let categoriaActual = 'all';
let busquedaActual = '';

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productsGrid')) {
        renderizarTienda();
        configurarOyentesTienda();
    }
});

async function renderizarTienda() {
    const cuadricula = document.getElementById('productsGrid');
    if (!cuadricula) return;

    if (productos.length === 0) {
        try {
            const respuesta = await fetch('/api/products');
            if (respuesta.ok) {
                productos = await respuesta.json();

                productos = productos.map(p => ({
                    ...p,
                    id: p.id,
                    name: p.nombre,
                    category: p.categoria,
                    reviews: p.reviewsCount,
                    image: p.imagenUrl,
                    oldPrice: p.precioAnterior,
                    price: p.precio
                }));
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            cuadricula.innerHTML = '<p class="text-red-500 text-center col-span-3">Error al cargar productos.</p>';
            return;
        }
    }

    cuadricula.innerHTML = '';

    const filtrados = productos.filter(p => {
        const coincideCategoria = categoriaActual === 'all' || p.category === categoriaActual;
        const coincideBusqueda = p.name.toLowerCase().includes(busquedaActual.toLowerCase());
        return coincideCategoria && coincideBusqueda;
    });

    filtrados.forEach(p => {
        const tarjeta = document.createElement('div');
        tarjeta.className = "rounded-xl border bg-card text-card-foreground shadow overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-gray-200 group bg-white fade-in";
        tarjeta.innerHTML = `
            <div class="relative h-72 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                ${p.badge ? `<div class="absolute top-4 left-4 shadow-lg inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gradient-to-r from-${p.badgeColor === 'green' ? 'green-500 to-green-600' : p.badgeColor === 'blue' ? 'blue-500 to-blue-600' : 'orange-500 to-orange-600'} text-white border-0">${p.badge}</div>` : ''}
                ${p.oldPrice ? `<div class="absolute top-4 right-4 bg-red-500 text-white border-0 shadow-lg inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">-${Math.round((1 - p.price / p.oldPrice) * 100)}%</div>` : ''}
            </div>
            <div class="p-5 space-y-4">
                <div>
                    <h3 class="text-lg mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors font-semibold">${p.name}</h3>
                    <div class="flex items-center gap-2">
                        <i data-lucide="star" class="w-4 h-4 fill-orange-400 text-orange-400"></i>
                        <span class="text-sm text-gray-600">${p.rating}</span>
                        <span class="text-sm text-gray-400">(${p.reviews})</span>
                    </div>
                </div>
                <div class="space-y-1">
                    <div class="flex items-baseline gap-2">
                        <span class="text-3xl bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent font-bold">€${p.price}</span>
                        ${p.oldPrice ? `<span class="text-sm text-gray-400 line-through">€${p.oldPrice}</span>` : ''}
                    </div>
                </div>
                <button onclick="agregarAlCarrito(${p.id})" class="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/20 group-hover:shadow-lg group-hover:shadow-orange-500/30 transition-all duration-300 rounded-md text-white font-medium flex items-center justify-center">
                    <i data-lucide="shopping-cart" class="w-4 h-4 mr-2"></i> Añadir al carrito
                </button>
            </div>
        `;
        cuadricula.appendChild(tarjeta);
    });
    inicializarIconos();
}

function configurarOyentesTienda() {
    const entradaBusqueda = document.getElementById('searchInput');
    if (entradaBusqueda) {
        entradaBusqueda.addEventListener('input', (e) => {
            busquedaActual = e.target.value;
            renderizarTienda();
        });
    }

    const pestanas = document.querySelectorAll('[data-tab-category]');
    pestanas.forEach(pestana => {
        pestana.addEventListener('click', () => {
            pestanas.forEach(t => {
                t.classList.remove('bg-gradient-to-r', 'from-orange-500', 'to-orange-600', 'text-white', 'shadow-md');
                t.classList.add('bg-white', 'text-gray-900', 'hover:text-gray-900');
                if (t !== pestana) t.classList.replace('text-gray-900', 'text-gray-500');
            });

            pestana.classList.remove('bg-white', 'text-gray-900', 'text-gray-500');
            pestana.classList.add('bg-gradient-to-r', 'from-orange-500', 'to-orange-600', 'text-white', 'shadow-md');

            categoriaActual = pestana.getAttribute('data-tab-category');
            renderizarTienda();
        });
    });

    const pestanaTodas = document.querySelector('[data-tab-category="all"]');
    if (pestanaTodas) {
        pestanaTodas.classList.remove('bg-white', 'text-gray-900');
        pestanaTodas.classList.add('bg-gradient-to-r', 'from-orange-500', 'to-orange-600', 'text-white', 'shadow-md');
    }
}
