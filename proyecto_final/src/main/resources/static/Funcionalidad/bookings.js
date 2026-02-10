// Funcionalidad/bookings.js

// --- DATA ---
const gimnasios = [
    {
        id: 1,
        name: 'GymCore Centro',
        location: 'Calle Gran Vía, 28, Madrid',
        rating: 4.9,
        rooms: [
            { id: 1, name: 'Sala de Pesas', capacity: 15, price: 25, features: ['Máquinas', 'Pesas libres'] },
            { id: 2, name: 'Sala Crossfit', capacity: 20, price: 30, features: ['Boxes', 'Barras'] },
            { id: 3, name: 'Sala VIP', capacity: 5, price: 50, features: ['Privada', 'Premium'] }
        ]
    },
    {
        id: 2,
        name: 'GymCore Norte',
        location: 'Av. Diagonal, 123, Barcelona',
        rating: 4.8,
        rooms: [
            { id: 4, name: 'Sala de Pesas', capacity: 15, price: 25, features: ['Máquinas', 'Pesas libres'] },
            { id: 5, name: 'Sala Funcional', capacity: 12, price: 28, features: ['TRX', 'Cardio'] }
        ]
    }
];

let idGimnasioSeleccionado = null;
let idSalaSeleccionada = null;
let tiempoSeleccionado = null;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('gymList')) {
        renderizarGimnasios();
        renderizarHorarios();
        configurarOyentesReserva();
    }
});

function renderizarGimnasios() {
    const lista = document.getElementById('gymList');
    if (!lista) return;
    lista.innerHTML = '';

    gimnasios.forEach(gimnasio => {
        const estaSeleccionado = idGimnasioSeleccionado === gimnasio.id;
        const el = document.createElement('div');
        el.className = `p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${estaSeleccionado ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-white shadow-lg shadow-orange-500/10' : 'border-gray-200 hover:border-orange-300 hover:shadow-md'}`;
        el.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <h3 class="text-2xl font-medium">${gimnasio.name}</h3>
                         <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-white border-orange-200 text-orange-600 shadow-sm">
                             <i data-lucide="star" class="w-3 h-3 mr-1 fill-orange-500 text-orange-500"></i> ${gimnasio.rating}
                        </div>
                    </div>
                    <div class="flex items-center text-gray-600">
                        <i data-lucide="map-pin" class="w-5 h-5 mr-2 text-orange-500"></i>
                         <span class="text-lg">${gimnasio.location}</span>
                    </div>
                </div>
                 ${estaSeleccionado ? `<div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-md"> <i data-lucide="check-circle-2" class="w-3.5 h-3.5 mr-1"></i> Seleccionado</div>` : ''}
            </div>
        `;
        el.onclick = () => seleccionarGimnasio(gimnasio.id);
        lista.appendChild(el);
    });
    inicializarIconos();
}

function seleccionarGimnasio(id) {
    idGimnasioSeleccionado = id;
    idSalaSeleccionada = null;
    renderizarGimnasios();
    renderizarSalas();
    actualizarResumen();
}

function renderizarSalas() {
    const lista = document.getElementById('roomList');
    if (!lista) return;
    lista.innerHTML = '';

    if (!idGimnasioSeleccionado) {
        lista.innerHTML = '<p class="text-gray-500 col-span-2 text-center py-4">Selecciona un gimnasio primero</p>';
        return;
    }

    const gimnasio = gimnasios.find(g => g.id === idGimnasioSeleccionado);
    gimnasio.rooms.forEach(sala => {
        const estaSeleccionado = idSalaSeleccionada === sala.id;
        const el = document.createElement('div');
        el.className = `p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${estaSeleccionado ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-white shadow-lg shadow-orange-500/30' : 'border-gray-200 hover:border-orange-300 hover:shadow-md'}`;
        el.innerHTML = `
            <div class="flex items-center gap-4 mb-4">
                 <div class="p-3 rounded-xl ${estaSeleccionado ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-md shadow-orange-500/30' : 'bg-gray-100'}">
                    <i data-lucide="dumbbell" class="w-6 h-6 ${estaSeleccionado ? 'text-white' : 'text-gray-600'}"></i>
                </div>
                <div class="flex-1">
                    <h3 class="text-xl mb-1 font-medium">${sala.name}</h3>
                    <div class="flex items-center gap-1 text-sm text-gray-600">
                         <i data-lucide="users" class="w-4 h-4"></i> <span>Hasta ${sala.capacity}</span>
                    </div>
                </div>
            </div>
            <div class="pt-4 border-t border-gray-200 flex justify-between">
                <span class="text-sm text-gray-600">Precio/hora</span>
                <span class="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">€${sala.price}</span>
            </div>
        `;
        el.onclick = () => {
            idSalaSeleccionada = sala.id;
            renderizarSalas();
            actualizarResumen();
        };
        lista.appendChild(el);
    });
    inicializarIconos();
}

function renderizarHorarios() {
    const lista = document.getElementById('timeList');
    if (!lista) return;
    lista.innerHTML = '';

    const horarios = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

    horarios.forEach(t => {
        const isSelected = tiempoSeleccionado === t;
        const btn = document.createElement('button');
        btn.className = `h-14 flex flex-col items-center justify-center transition-all duration-300 rounded-lg border border-gray-200 ${isSelected ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md' : 'hover:border-orange-300 hover:bg-orange-50'}`;
        btn.innerHTML = `<span class="text-sm font-medium">${t}</span>`;
        btn.onclick = () => {
            tiempoSeleccionado = t;
            renderizarHorarios();
            actualizarResumen();
        };
        lista.appendChild(btn);
    });
}

function actualizarResumen() {
    const elNombreGimnasio = document.getElementById('summaryGymName');
    const elNombreSala = document.getElementById('summaryRoomName');
    const elTiempo = document.getElementById('summaryTime');
    const elPrecio = document.getElementById('summaryPrice');
    const btn = document.getElementById('confirmBookingBtn');

    if (elNombreGimnasio) elNombreGimnasio.innerText = idGimnasioSeleccionado ? gimnasios.find(g => g.id === idGimnasioSeleccionado).name : 'Selecciona un gimnasio';

    let precio = 0;
    if (idGimnasioSeleccionado && idSalaSeleccionada) {
        const sala = gimnasios.find(g => g.id === idGimnasioSeleccionado).rooms.find(r => r.id === idSalaSeleccionada);
        if (sala) {
            if (elNombreSala) elNombreSala.innerText = sala.name;
            precio = sala.price;
        }
    } else {
        if (elNombreSala) elNombreSala.innerText = '-';
    }

    if (elTiempo) elTiempo.innerText = tiempoSeleccionado || '-';
    if (elPrecio) elPrecio.innerText = '€' + precio;

    if (idGimnasioSeleccionado && idSalaSeleccionada && tiempoSeleccionado && btn) {
        btn.disabled = false;
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else if (btn) {
        btn.disabled = true;
        btn.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

function configurarOyentesReserva() {
    const btn = document.getElementById('confirmBookingBtn');
    if (btn) {
        btn.onclick = () => {
            const toast = document.getElementById('bookingToast');
            if (toast) {
                toast.classList.remove('translate-y-20', 'opacity-0');
                setTimeout(() => {
                    toast.classList.add('translate-y-20', 'opacity-0');
                    tiempoSeleccionado = null;
                    idSalaSeleccionada = null;
                    renderizarSalas();
                    renderizarHorarios();
                    actualizarResumen();
                }, 3000);
            }
        }
    }
}
