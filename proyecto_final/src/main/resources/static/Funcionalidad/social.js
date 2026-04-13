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
    const usuarioLocalStorage = localStorage.getItem('gymCoreUser');
    const u = usuarioLocalStorage ? JSON.parse(usuarioLocalStorage) : {};
    const url = u.username ? `/api/social/feed?username=${u.username}` : '/api/social/feed';

    try {
        const respuesta = await fetch(url);
        if (respuesta.ok) {
            publicacionesIniciales = await respuesta.json();
            renderizarFeed();
        } else {
            renderizarFeedFallback();
        }
    } catch (error) {
        console.error('Error fetching feed:', error);
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
    
    // Si no hay publicaciones todavía, mostramos skeletons
    if (publicacionesIniciales.length === 0) {
        mostrarSkeletons(contenedor);
        return;
    }

    contenedor.innerHTML = '';
    publicacionesIniciales.forEach((p, index) => {
        setTimeout(() => {
            adjuntarPublicacion(p, contenedor);
        }, index * 100); // Aparecen en cascada
    });
}

function mostrarSkeletons(contenedor) {
    contenedor.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const sk = document.createElement('div');
        sk.className = "rounded-xl border border-gray-100 bg-white p-6 space-y-4 mb-6";
        sk.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full skeleton"></div>
                <div class="space-y-2 flex-1">
                    <div class="h-4 w-1/4 skeleton rounded"></div>
                    <div class="h-3 w-1/6 skeleton rounded"></div>
                </div>
            </div>
            <div class="space-y-2">
                <div class="h-4 w-full skeleton rounded"></div>
                <div class="h-4 w-5/6 skeleton rounded"></div>
            </div>
            <div class="h-64 w-full skeleton rounded-xl"></div>
        `;
        contenedor.appendChild(sk);
    }
}

function adjuntarPublicacion(pub, contenedor, prepender = false) {
    const usuarioLocalStorage = localStorage.getItem('gymCoreUser');
    const u = usuarioLocalStorage ? JSON.parse(usuarioLocalStorage) : {};
    
    const esPropietarioPost = u.username && pub.usuario.nombreUsuario === `@${u.username}`;
    
    const el = document.createElement('div');
    el.id = `post-card-${pub.id}`;
    el.className = "rounded-2xl border bg-white shadow-sm hover:shadow-xl transition-all duration-500 fade-in-scale glass-card mb-6 overflow-hidden border-gray-100";
    el.innerHTML = `
        <div class="p-6 pb-4">
            <div class="flex items-start justify-between">
                <div class="flex items-start gap-4">
                    <div class="relative">
                         <div class="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 overflow-hidden ring-2 ring-orange-100/50">
                            <img src="${pub.usuario.avatar || '/Imagenes/Foto_Perfil.jpg'}" class="w-full h-full object-cover">
                         </div>
                          ${pub.usuario.verificado ? `<div class="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white verified-glow"><span class="text-white text-[10px]">✓</span></div>` : ''}
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center gap-2 pt-0.5">
                            <span class="font-bold text-gray-900">${pub.usuario.nombre}</span>
                            ${pub.usuario.verificado ? '<span class="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-tighter">Pro</span>' : ''}
                        </div>
                        <div class="flex items-center gap-2 text-xs text-gray-400"><span>${pub.usuario.nombreUsuario}</span><span>•</span><span>${pub.tiempo}</span></div>
                    </div>
                </div>
                ${esPropietarioPost ? `
                <div class="flex gap-1">
                    <button onclick="prepararEdicionPost(${pub.id})" class="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all" title="Editar">
                        <i data-lucide="edit-2" class="w-4 h-4"></i>
                    </button>
                    <button onclick="eliminarPost(${pub.id})" class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Eliminar">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
                ` : ''}
            </div>
        </div>
        <div class="px-6 pb-4" id="post-content-container-${pub.id}">
            <p class="whitespace-pre-line text-lg text-gray-800 leading-relaxed" id="post-text-${pub.id}">${pub.contenido}</p>
        </div>
        <div id="post-image-container-${pub.id}">
            ${pub.imagen ? `<div class="bg-gray-100 relative overflow-hidden group"><img src="${pub.imagen}" class="w-full h-[500px] object-cover"></div>` : ''}
        </div>
        <div class="p-6 pt-4">
             <div class="flex items-center justify-between mb-4 text-sm text-gray-600">
                <div class="flex items-center gap-2"><span id="likes-${pub.id}">${pub.meGusta} Me gusta</span></div>
                <div class="flex gap-4"><span class="cursor-pointer hover:underline" onclick="toggleComentarios(${pub.id})"><span id="comm-count-${pub.id}">${pub.comentarios || 0}</span> comentarios</span><span>${pub.compartidos || 0} compartidos</span></div>
            </div>
             <div class="flex items-center gap-2 pt-4 border-t border-gray-100">
                <button onclick="alternarMeGusta(${pub.id})" id="btn-like-${pub.id}" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 flex-1 transition-all hover:bg-orange-50 hover:text-orange-600 ${pub.meGustaPorMi ? 'text-orange-600' : 'text-gray-500'}">
                    <i data-lucide="heart" class="w-5 h-5 mr-2 ${pub.meGustaPorMi ? 'text-orange-600' : ''}" style="${pub.meGustaPorMi ? 'fill: currentColor;' : 'fill: none;'}"></i> Me gusta
                </button>
                <button onclick="toggleComentarios(${pub.id})" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 flex-1 hover:bg-orange-50 hover:text-orange-600"><i data-lucide="message-circle" class="w-5 h-5 mr-2"></i> Comentar</button>
            </div>
            
            <div id="seccion-comentarios-${pub.id}" class="hidden mt-4 pt-4 border-t border-gray-50 fade-in">
                <div id="lista-comentarios-${pub.id}" class="space-y-4 mb-4">
                    ${(pub.detalleComentarios || []).map(comm => {
                        const esPropietarioComm = u.username && comm.username === u.username;
                        return `
                        <div class="flex gap-3 group/comm" id="comment-${comm.id}">
                            <div class="w-8 h-8 rounded-full bg-orange-100 overflow-hidden shrink-0">
                                <img src="${comm.avatar || '/Imagenes/Foto_Perfil.jpg'}" class="w-full h-full object-cover">
                            </div>
                            <div class="flex-1 bg-gray-50 rounded-2xl px-4 py-2 relative">
                                <div class="flex items-center justify-between mb-1">
                                    <span class="text-xs font-bold text-gray-900">${comm.nombre}</span>
                                    <div class="flex items-center gap-2">
                                        <span class="text-[10px] text-gray-400">Hace poco</span>
                                        ${esPropietarioComm ? `
                                        <div class="opacity-0 group-hover/comm:opacity-100 transition-opacity flex gap-1">
                                            <button onclick="eliminarComentario(${comm.id}, ${pub.id})" class="text-gray-400 hover:text-red-500"><i data-lucide="trash-2" class="w-3 h-3"></i></button>
                                        </div>
                                        ` : ''}
                                    </div>
                                </div>
                                <p class="text-sm text-gray-700 leading-tight">${comm.contenido}</p>
                            </div>
                        </div>
                    `}).join('')}
                </div>
                <div class="flex gap-3">
                    <div class="w-8 h-8 rounded-full bg-orange-100 overflow-hidden shrink-0">
                        <img src="${u.avatarUrl || '/Imagenes/Foto_Perfil.jpg'}" class="w-full h-full object-cover">
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

function togglePhotoInput() {
    const container = document.getElementById('photoInputContainer');
    if (container) {
        container.classList.toggle('hidden');
        if (!container.classList.contains('hidden')) {
            document.getElementById('imageUrlInput').focus();
        }
    }
}

function configurarOyentesSocial() {
    const boton = document.getElementById('publishBtn');
    const entrada = document.getElementById('postInput');
    const imagenEntrada = document.getElementById('imageUrlInput');

    if (boton && entrada) {
        boton.onclick = async () => {
            const contenido = entrada.value;
            const imagenUrl = imagenEntrada ? imagenEntrada.value : null;
            
            if (!contenido.trim() && !imagenUrl) return;

            const usuarioGuardado = localStorage.getItem('gymCoreUser');
            if (!usuarioGuardado) { 
                alert('Inicia sesión para publicar');
                return;
            }
            
            const u = JSON.parse(usuarioGuardado);

            try {
                const response = await fetch('/api/social/publicar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: u.username,
                        contenido: contenido,
                        imagenUrl: imagenUrl || null
                    })
                });

                if (response.ok) {
                    entrada.value = '';
                    if (imagenEntrada) imagenEntrada.value = '';
                    if (document.getElementById('photoInputContainer')) {
                        document.getElementById('photoInputContainer').classList.add('hidden');
                    }
                    cargarUsuariosYFeed();
                    mostrarNotificacion('Publicación creada correctamente', 'success');
                }
            } catch (error) {
                console.error('Error publicando:', error);
                mostrarNotificacion('Error al publicar', 'error');
            }
        }
    }
}

async function alternarMeGusta(id) {
    const usuarioGuardado = localStorage.getItem('gymCoreUser');
    if (!usuarioGuardado) {
        mostrarNotificacion('Inicia sesión para dar me gusta', 'info');
        return;
    }
    const u = JSON.parse(usuarioGuardado);

    const boton = document.getElementById(`btn-like-${id}`);
    const corazon = boton.querySelector('i');
    
    // Animación de pulso
    corazon.classList.add('scale-125');
    setTimeout(() => corazon.classList.remove('scale-125'), 200);

    try {
        const response = await fetch(`/api/social/like/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: u.username })
        });

        if (response.ok) {
            const nuevaCuenta = await response.json();
            const etiqueta = document.getElementById(`likes-${id}`);
            if (boton && etiqueta) {
                const yaTeníaLike = boton.classList.contains('text-orange-600');
                
                if (yaTeníaLike) {
                    boton.classList.remove('text-orange-600');
                    boton.classList.add('text-gray-500');
                    if (corazon) {
                        corazon.classList.remove('fill-orange-600', 'text-orange-600');
                        corazon.style.fill = 'none';
                    }
                } else {
                    boton.classList.add('text-orange-600');
                    boton.classList.remove('text-gray-500');
                    if (corazon) {
                        corazon.classList.add('text-orange-600');
                        corazon.style.fill = 'currentColor'; // Esto rellena el icono con el color del texto (naranja)
                    }
                }
                etiqueta.innerText = `${nuevaCuenta} Me gusta`;
            }
        }
    } catch (error) {
        console.error('Error toggling like:', error);
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

async function agregarComentario(id) {
    const input = document.getElementById(`input-comentario-${id}`);
    const usuarioGuardado = localStorage.getItem('gymCoreUser');
    
    if (!input || !input.value.trim() || !usuarioGuardado) return;

    const u = JSON.parse(usuarioGuardado);
    const contenido = input.value.trim();

    try {
        const response = await fetch(`/api/social/comentar/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: u.username,
                contenido: contenido
            })
        });

        if (response.ok) {
            const nuevoComentario = await response.json();
            input.value = '';
            
            // Añadir el comentario a la lista visualmente
            const lista = document.getElementById(`lista-comentarios-${id}`);
            if (lista) {
                const commEl = document.createElement('div');
                commEl.className = "flex gap-3 fade-in";
                commEl.innerHTML = `
                    <div class="w-8 h-8 rounded-full bg-orange-100 overflow-hidden shrink-0">
                        <img src="${u.avatarUrl || '/Imagenes/Foto_Perfil.jpg'}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1 bg-gray-50 rounded-2xl px-4 py-2">
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-xs font-bold text-gray-900">${u.nombre}</span>
                            <span class="text-[10px] text-gray-400">Hace un momento</span>
                        </div>
                        <p class="text-sm text-gray-700 leading-tight">${nuevoComentario.contenido}</p>
                    </div>
                `;
                lista.appendChild(commEl);
                lista.scrollTop = lista.scrollHeight;
            }

            // Incrementar el contador
            const contador = document.getElementById(`comm-count-${id}`);
            if (contador) {
                const valorActual = parseInt(contador.innerText) || 0;
                contador.innerText = valorActual + 1;
            }
            
            mostrarNotificacion('Comentario publicado', 'success');
        }
    } catch (error) {
        console.error('Error comentando:', error);
    }
}

async function eliminarPost(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta publicación?')) return;
    
    const u = JSON.parse(localStorage.getItem('gymCoreUser') || '{}');
    try {
        const response = await fetch(`/api/social/publicacion/${id}?username=${u.username}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const el = document.getElementById(`post-card-${id}`);
            if (el) {
                el.classList.add('scale-95', 'opacity-0');
                setTimeout(() => el.remove(), 300);
            }
            mostrarNotificacion('Publicación eliminada', 'info');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

function prepararEdicionPost(id) {
    const contenedor = document.getElementById(`post-content-container-${id}`);
    const textoOriginal = document.getElementById(`post-text-${id}`).innerText;
    
    // Cambiamos el contenido por un textarea
    contenedor.innerHTML = `
        <textarea id="edit-post-textarea-${id}" class="w-full bg-gray-50 border border-orange-200 rounded-xl p-3 text-gray-800 focus:ring-2 focus:ring-orange-500 outline-none transition-all">${textoOriginal}</textarea>
        <div class="flex gap-2 mt-2">
            <button onclick="guardarEdicionPost(${id})" class="text-xs bg-orange-500 text-white px-3 py-1.5 rounded-md hover:bg-orange-600 transition-colors">Guardar</button>
            <button onclick="cancelarEdicionPost(${id}, '${textoOriginal.replace(/'/g, "\\'")}')" class="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors">Cancelar</button>
        </div>
    `;
}

async function guardarEdicionPost(id) {
    const nuevoTexto = document.getElementById(`edit-post-textarea-${id}`).value;
    const u = JSON.parse(localStorage.getItem('gymCoreUser') || '{}');

    try {
        const response = await fetch(`/api/social/publicacion/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: u.username,
                contenido: nuevoTexto
            })
        });

        if (response.ok) {
            cancelarEdicionPost(id, nuevoTexto);
            mostrarNotificacion('Publicación actualizada', 'success');
        }
    } catch (error) {
        console.error('Error editing post:', error);
    }
}

function cancelarEdicionPost(id, texto) {
    const contenedor = document.getElementById(`post-content-container-${id}`);
    contenedor.innerHTML = `<p class="whitespace-pre-line text-lg text-gray-800 leading-relaxed" id="post-text-${id}">${texto}</p>`;
}

async function eliminarComentario(commId, postId) {
    if (!confirm('¿Eliminar comentario?')) return;
    
    const u = JSON.parse(localStorage.getItem('gymCoreUser') || '{}');
    try {
        const response = await fetch(`/api/social/comentario/${commId}?username=${u.username}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const el = document.getElementById(`comment-${commId}`);
            if (el) {
                el.classList.add('opacity-0', 'translate-x-4');
                setTimeout(() => el.remove(), 300);
            }
            
            // Decrementar contador
            const contador = document.getElementById(`comm-count-${postId}`);
            if (contador) {
                const valorActual = parseInt(contador.innerText) || 0;
                contador.innerText = Math.max(0, valorActual - 1);
            }
            mostrarNotificacion('Comentario eliminado', 'info');
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
}
