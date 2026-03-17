let publicacionesIniciales = [];

const contenidosAleatorios = [
    { text: '¡Nuevo PR! 180kg en sentadilla 💪 El trabajo duro siempre da resultados. #GymCore #Powerlifting', img: 'https://images.unsplash.com/photo-1756115484694-009466dbaa67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB3b3Jrb3V0JTIwZml0bmVzc3xlbnwxfHx8fDE3NjIxNjgwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { text: 'Rutina de hoy: Full Body 🔥\n- Peso muerto: 4x8\n- Press banca: 4x10', img: null },
    { text: 'Terminando una brutal sesión de cardio. ¡Endorfinas a tope! 🏃‍♂️💨', img: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=1080' },
    { text: 'Día de descanso activo, un poco de yoga para estirar y recuperar músculos 🧘‍♀️✨', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1080' },
    { text: 'Mancuernas nuevas probadas ✅. El gimnasio de zona centro es mi favorito de lejos.', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1080' }
];

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('feedContainer')) {
        cargarUsuariosYFeed();
        configurarOyentesSocial();
    }
});

async function cargarUsuariosYFeed() {
    try {
        const respuesta = await fetch('/api/users');
        if (respuesta.ok) {
            const usuariosBD = await respuesta.json();
            const usuariosConFotos = usuariosBD.filter(u => u.username !== 'admin' && !u.username.includes('test')); // Filtramos cuentas de sistema/test

            publicacionesIniciales = usuariosConFotos.slice(0, 5).map((u, index) => {
                const contenido = contenidosAleatorios[index % contenidosAleatorios.length];
                const apellidos = u.apellidos ? ' ' + u.apellidos : '';
                return {
                    id: index + 1,
                    usuario: {
                        nombre: u.nombre + apellidos,
                        nombreUsuario: '@' + (u.username || u.nombre.toLowerCase()),
                        avatar: (u.avatarUrl && u.avatarUrl !== '../Imagenes/Foto_Perfil.jpg') ? u.avatarUrl : 'https://randomuser.me/api/portraits/lego/1.jpg',
                        verificado: u.esAdmin || index % 3 === 0
                    },
                    contenido: contenido.text,
                    imagen: contenido.img,
                    meGusta: Math.floor(Math.random() * 2000) + 150,
                    comentarios: Math.floor(Math.random() * 400) + 20,
                    compartidos: Math.floor(Math.random() * 100) + 5,
                    tiempo: 'Hace ' + (index + 1) + ' horas',
                    meGustaPorMi: false
                };
            });
            renderizarFeed();
        } else {
            renderizarFeedFallback();
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        renderizarFeedFallback();
    }
}

function renderizarFeedFallback() {
    publicacionesIniciales = [
        {
            id: 1,
            usuario: { nombre: 'Sistema', nombreUsuario: '@gymcore', avatar: '/Imagenes/Foto_Perfil.jpg', verificado: true },
            contenido: 'Bienvenidos a la comunidad GymCore. Aquí podrás compartir tus logros con los demás usuarios.',
            meGusta: 100, comentarios: 0, compartidos: 0, tiempo: 'Recientemente', meGustaPorMi: false
        }
    ];
    renderizarFeed();
}

function renderizarFeed() {
    const contenedor = document.getElementById('feedContainer');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    publicacionesIniciales.forEach(p => adjuntarPublicacion(p, contenedor));
}

function adjuntarPublicacion(pub, contenedor, prepender = false) {
    const el = document.createElement('div');
    el.className = "rounded-xl border bg-card text-card-foreground shadow overflow-hidden border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 fade-in";
    el.innerHTML = `
        <div class="p-6 pb-4">
            <div class="flex items-start gap-4">
                <div class="relative">
                     <div class="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 overflow-hidden ring-2 ring-orange-100">
                        <img src="${pub.usuario.avatar}" class="w-full h-full object-cover">
                     </div>
                      ${pub.usuario.verificado ? `<div class="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white"><span class="text-white text-xs">✓</span></div>` : ''}
                </div>
                <div class="flex-1">
                    <div class="flex items-center gap-2"><span class="text-lg font-medium">${pub.usuario.nombre}</span></div>
                    <div class="flex items-center gap-2 text-sm text-gray-500"><span>${pub.usuario.nombreUsuario}</span><span>•</span><span>${pub.tiempo}</span></div>
                </div>
            </div>
        </div>
        <div class="px-6 pb-4">
            <p class="whitespace-pre-line text-lg leading-relaxed">${pub.contenido}</p>
        </div>
        ${pub.imagen ? `<div class="bg-gray-100 relative overflow-hidden group"><img src="${pub.imagen}" class="w-full h-[500px] object-cover"></div>` : ''}
        <div class="p-6 pt-4">
             <div class="flex items-center justify-between mb-4 text-sm text-gray-600">
                <div class="flex items-center gap-2"><span id="likes-${pub.id}">${pub.meGusta} Me gusta</span></div>
                <div class="flex gap-4"><span class="cursor-pointer hover:underline" onclick="toggleComentarios(${pub.id})"><span id="comm-count-${pub.id}">${pub.comentarios || 0}</span> comentarios</span><span>${pub.compartidos || 0} compartidos</span></div>
            </div>
             <div class="flex items-center gap-2 pt-4 border-t border-gray-100">
                <button onclick="alternarMeGusta(${pub.id})" id="btn-like-${pub.id}" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 flex-1 transition-all hover:bg-orange-50 hover:text-orange-600 ${pub.meGustaPorMi ? 'text-orange-600' : 'text-gray-500'}">
                    <i data-lucide="heart" class="w-5 h-5 mr-2 ${pub.meGustaPorMi ? 'fill-orange-600' : ''}"></i> Me gusta
                </button>
                <button onclick="toggleComentarios(${pub.id})" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 flex-1 hover:bg-orange-50 hover:text-orange-600"><i data-lucide="message-circle" class="w-5 h-5 mr-2"></i> Comentar</button>
            </div>
            
            <!-- Sección de Comentarios -->
            <div id="seccion-comentarios-${pub.id}" class="hidden mt-4 pt-4 border-t border-gray-50 fade-in">
                <div id="lista-comentarios-${pub.id}" class="space-y-4 mb-4">
                    <!-- Los comentarios se cargarán aquí -->
                </div>
                <div class="flex gap-3">
                    <div class="w-8 h-8 rounded-full bg-orange-100 overflow-hidden shrink-0">
                        <img src="/Imagenes/Foto_Perfil.jpg" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1 relative">
                        <input type="text" 
                               id="input-comentario-${pub.id}" 
                               placeholder="Escribe un comentario..." 
                               class="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all"
                               onkeypress="if(event.key === 'Enter') agregarComentario(${pub.id})">
                        <button onclick="agregarComentario(${pub.id})" class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors">
                            <i data-lucide="send" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    if (prepender) contenedor.prepend(el);
    else contenedor.appendChild(el);
    if (typeof lucide !== 'undefined') lucide.createIcons();
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
                    nombreUsuario: u.username ? '@' + u.username : '@usuario',
                    avatar: u.avatarUrl || '/Imagenes/Foto_Perfil.jpg',
                    verificado: false
                };
            }

            const nuevaPub = {
                id: Date.now(),
                usuario: datosUsuario,
                contenido: contenido,
                meGusta: 0,
                comentarios: 0,
                compartidos: 0,
                tiempo: 'Ahora mismo',
                meGustaPorMi: false
            };

            adjuntarPublicacion(nuevaPub, document.getElementById('feedContainer'), true);
            entrada.value = '';
        }
    }
}

function alternarMeGusta(id) {
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

function toggleComentarios(id) {
    const seccion = document.getElementById(`seccion-comentarios-${id}`);
    if (seccion) {
        seccion.classList.toggle('hidden');
        if (!seccion.classList.contains('hidden')) {
            document.getElementById(`input-comentario-${id}`).focus();
        }
    }
}

function agregarComentario(id) {
    const input = document.getElementById(`input-comentario-${id}`);
    const lista = document.getElementById(`lista-comentarios-${id}`);
    const countSpan = document.getElementById(`comm-count-${id}`);

    if (!input || !lista || !input.value.trim()) return;

    const texto = input.value.trim();
    const usuarioGuardado = localStorage.getItem('gymCoreUser');
    let datosUsuario = {
        nombre: 'Tú',
        nombreUsuario: '@miusuario',
        avatar: '/Imagenes/Foto_Perfil.jpg'
    };

    if (usuarioGuardado) {
        const u = JSON.parse(usuarioGuardado);
        datosUsuario = {
            nombre: u.nombre || 'Usuario',
            nombreUsuario: u.username ? '@' + u.username : '@usuario',
            avatar: u.avatarUrl || '/Imagenes/Foto_Perfil.jpg'
        };
    }

    const nuevoComentario = document.createElement('div');
    nuevoComentario.className = "flex gap-3 fade-in";
    nuevoComentario.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-orange-100 overflow-hidden shrink-0">
            <img src="${datosUsuario.avatar}" class="w-full h-full object-cover">
        </div>
        <div class="flex-1 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-100">
            <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-bold text-gray-900">${datosUsuario.nombre}</span>
                <span class="text-[10px] text-gray-500">Ahora mismo</span>
            </div>
            <p class="text-sm text-gray-700">${texto}</p>
        </div>
    `;

    lista.appendChild(nuevoComentario);
    input.value = '';

    // Actualizar contador
    if (countSpan) {
        let actual = parseInt(countSpan.innerText);
        countSpan.innerText = actual + 1;
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
}
