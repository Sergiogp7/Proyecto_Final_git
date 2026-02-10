const publicacionesIniciales = [
    {
        id: 1,
        usuario: { nombre: 'Carlos Martínez', nombreUsuario: '@carlosfitness', avatar: 'https://images.unsplash.com/photo-1758599879795-536d5f203de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwaW5mbHVlbmNlciUyMGd5bXxlbnwxfHx8fDE3NjIxNjgwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080', verificado: true },
        contenido: '¡Nuevo PR! 180kg en sentadilla 💪 El trabajo duro siempre da resultados. #GymCore #Powerlifting',
        imagen: 'https://images.unsplash.com/photo-1756115484694-009466dbaa67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB3b3Jrb3V0JTIwZml0bmVzc3xlbnwxfHx8fDE3NjIxNjgwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        meGusta: 2453,
        comentarios: 187,
        compartidos: 45,
        tiempo: 'Hace 2 horas',
        meGustaPorMi: false
    },
    {
        id: 2,
        usuario: { nombre: 'María García', nombreUsuario: '@mariafitpro', avatar: 'https://images.unsplash.com/photo-1758599879795-536d5f203de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwaW5mbHVlbmNlciUyMGd5bXxlbnwxfHx8fDE3NjIxNjgwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080', verificado: true },
        contenido: 'Rutina de hoy: Full Body 🔥\n- Peso muerto: 4x8\n- Press banca: 4x10',
        meGusta: 1876,
        comentarios: 234,
        compartidos: 67,
        tiempo: 'Hace 5 horas',
        meGustaPorMi: false
    }
];

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('feedContainer')) {
        renderizarFeed();
        configurarOyentesSocial();
    }
});

function renderizarFeed() {
    const contenedor = document.getElementById('feedContainer');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    publicacionesIniciales.forEach(publicacion => adjuntarPublicacion(publicacion, contenedor));
}

function adjuntarPublicacion(publicacion, contenedor, prepender = false) {
    const el = document.createElement('div');
    el.className = "rounded-xl border bg-card text-card-foreground shadow overflow-hidden border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 fade-in";
    el.innerHTML = `
        <div class="p-6 pb-4">
            <div class="flex items-start gap-4">
                <div class="relative">
                     <div class="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 overflow-hidden ring-2 ring-orange-100">
                        <img src="${publicacion.usuario.avatar}" class="w-full h-full object-cover">
                     </div>
                      ${publicacion.usuario.verificado ? `<div class="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white"><span class="text-white text-xs">✓</span></div>` : ''}
                </div>
                <div class="flex-1">
                    <div class="flex items-center gap-2"><span class="text-lg font-medium">${publicacion.usuario.nombre}</span></div>
                    <div class="flex items-center gap-2 text-sm text-gray-500"><span>${publicacion.usuario.nombreUsuario}</span><span>•</span><span>${publicacion.tiempo}</span></div>
                </div>
            </div>
        </div>
        <div class="px-6 pb-4">
            <p class="whitespace-pre-line text-lg leading-relaxed">${publicacion.contenido}</p>
        </div>
        ${publicacion.imagen ? `<div class="bg-gray-100 relative overflow-hidden group"><img src="${publicacion.imagen}" class="w-full h-[500px] object-cover"></div>` : ''}
        <div class="p-6 pt-4">
             <div class="flex items-center justify-between mb-4 text-sm text-gray-600">
                <div class="flex items-center gap-2"><span id="likes-${publicacion.id}">${publicacion.meGusta} Me gusta</span></div>
                <div class="flex gap-4"><span>${publicacion.comentarios || 0} comentarios</span><span>${publicacion.compartidos || 0} compartidos</span></div>
            </div>
             <div class="flex items-center gap-2 pt-4 border-t border-gray-100">
                <button onclick="alternarMeGusta(${publicacion.id})" id="btn-like-${publicacion.id}" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 flex-1 transition-all hover:bg-orange-50 hover:text-orange-600 ${publicacion.meGustaPorMi ? 'text-orange-600' : 'text-gray-500'}">
                    <i data-lucide="heart" class="w-5 h-5 mr-2 ${publicacion.meGustaPorMi ? 'fill-orange-600' : ''}"></i> Me gusta
                </button>
                <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 flex-1 hover:bg-orange-50 hover:text-orange-600"><i data-lucide="message-circle" class="w-5 h-5 mr-2"></i> Comentar</button>
            </div>
        </div>
    `;

    if (prepender) contenedor.prepend(el);
    else contenedor.appendChild(el);
    inicializarIconos();
}

function configurarOyentesSocial() {
    const boton = document.getElementById('publishBtn');
    const entrada = document.getElementById('postInput');

    if (boton && entrada) {
        boton.onclick = () => {
            const contenido = entrada.value;
            if (!contenido.trim()) return;

            const usuarioGuardado = localStorage.getItem('gymCoreUser');
            let datosUsuario = { nombre: 'Tú', nombreUsuario: '@miusuario', avatar: '/Imagenes/Foto_Perfil.jpg', verificado: false };

            if (usuarioGuardado) {
                const u = JSON.parse(usuarioGuardado);
                datosUsuario = {
                    nombre: u.nombre || 'Usuario',
                    nombreUsuario: u.nombreUsuario ? (u.nombreUsuario.startsWith('@') ? u.nombreUsuario : '@' + u.nombreUsuario) : '@usuario',
                    avatar: u.avatar || '/Imagenes/Foto_Perfil.jpg',
                    verificado: false
                };
            }

            const nuevaPublicacion = {
                id: Date.now(),
                usuario: datosUsuario,
                contenido: contenido,
                meGusta: 0,
                comentarios: 0,
                compartidos: 0,
                tiempo: 'Ahora mismo',
                meGustaPorMi: false
            };

            adjuntarPublicacion(nuevaPublicacion, document.getElementById('feedContainer'), true);
            entrada.value = '';
        }
    }
}

function alternarMeGusta(id) {
    const publicacion = publicacionesIniciales.find(p => p.id === id) || { meGusta: 0, meGustaPorMi: false };

    const boton = document.getElementById(`btn-like-${id}`);
    const etiqueta = document.getElementById(`likes-${id}`);

    if (boton && etiqueta) {
        const corazon = boton.querySelector('i');
        const esMeGusta = boton.classList.contains('text-orange-600');

        let cuenta = parseInt(etiqueta.innerText.split(' ')[0]);

        if (esMeGusta) {
            boton.classList.remove('text-orange-600');
            boton.classList.add('text-gray-500');
            if (corazon) corazon.classList.remove('fill-orange-600');
            cuenta--;
        } else {
            boton.classList.add('text-orange-600');
            boton.classList.remove('text-gray-500');
            if (corazon) corazon.classList.add('fill-orange-600');
            cuenta++;
        }

        etiqueta.innerText = `${cuenta} Me gusta`;
    }
}
