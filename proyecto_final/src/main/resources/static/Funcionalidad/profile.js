// Funcionalidad/profile.js

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('profileForm')) {
        configurarOyentesPerfil();
    }
});

function configurarOyentesPerfil() {
    const btnEditar = document.getElementById('editToggleBtn');
    const btnCancelar = document.getElementById('cancelBtn');
    const accionesGuardar = document.getElementById('saveActions');
    const formulario = document.getElementById('profileForm');

    const usuarioGuardado = localStorage.getItem('gymCoreUser');
    if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        if (document.getElementById('inputName')) document.getElementById('inputName').value = usuario.nombre;
        if (document.getElementById('inputUsername')) document.getElementById('inputUsername').value = usuario.nombreUsuario;
        if (document.getElementById('inputEmail')) document.getElementById('inputEmail').value = usuario.email;
        if (document.getElementById('inputPhone')) document.getElementById('inputPhone').value = usuario.telefono;
        if (document.getElementById('inputLocation')) document.getElementById('inputLocation').value = usuario.ubicacion;
        if (document.getElementById('inputBio') && usuario.bio) document.getElementById('inputBio').value = usuario.bio;

        if (document.getElementById('sidebarName')) document.getElementById('sidebarName').innerText = usuario.nombre;
        if (document.getElementById('sidebarHandle')) document.getElementById('sidebarHandle').innerText = '@' + usuario.nombreUsuario;
        if (document.getElementById('profileAvatar')) document.getElementById('profileAvatar').src = usuario.avatar;
    }

    if (btnEditar && accionesGuardar && formulario) {
        const entradas = formulario.querySelectorAll('input, textarea');

        btnEditar.onclick = () => {
            entradas.forEach(entrada => {
                entrada.disabled = false;
                entrada.classList.remove('disabled:bg-gray-50');
            });
            document.getElementById('inputName').focus();

            btnEditar.classList.add('hidden');
            accionesGuardar.classList.remove('hidden');
        };

        btnCancelar.onclick = () => {
            entradas.forEach(entrada => {
                entrada.disabled = true;
                entrada.classList.add('disabled:bg-gray-50');
            });

            const usuarioActual = localStorage.getItem('gymCoreUser');
            if (usuarioActual) {
                const usuario = JSON.parse(usuarioActual);
                document.getElementById('inputName').value = usuario.nombre;
                document.getElementById('inputUsername').value = usuario.nombreUsuario;
                document.getElementById('inputEmail').value = usuario.email;
                document.getElementById('inputPhone').value = usuario.telefono;
                document.getElementById('inputLocation').value = usuario.ubicacion;
                if (usuario.bio) document.getElementById('inputBio').value = usuario.bio;
            }

            btnEditar.classList.remove('hidden');
            accionesGuardar.classList.add('hidden');
        };

        formulario.onsubmit = (e) => {
            e.preventDefault();

            const usuarioActualizado = {
                nombre: document.getElementById('inputName').value,
                nombreUsuario: document.getElementById('inputUsername').value,
                email: document.getElementById('inputEmail').value,
                telefono: document.getElementById('inputPhone').value,
                ubicacion: document.getElementById('inputLocation').value,
                bio: document.getElementById('inputBio').value,
                avatar: JSON.parse(localStorage.getItem('gymCoreUser')).avatar || '../Imagenes/Foto_Perfil.jpg'
            };

            localStorage.setItem('gymCoreUser', JSON.stringify(usuarioActualizado));

            const sbNombre = document.getElementById('sidebarName');
            const sbHandle = document.getElementById('sidebarHandle');
            if (sbNombre) sbNombre.innerText = usuarioActualizado.nombre;
            if (sbHandle) sbHandle.innerText = '@' + usuarioActualizado.nombreUsuario;

            entradas.forEach(entrada => {
                entrada.disabled = true;
                entrada.classList.add('disabled:bg-gray-50');
            });

            btnEditar.classList.remove('hidden');
            accionesGuardar.classList.add('hidden');

            const toast = document.getElementById('profileToast');
            if (toast) {
                toast.classList.remove('translate-y-20', 'opacity-0');
                setTimeout(() => {
                    toast.classList.add('translate-y-20', 'opacity-0');
                }, 3000);
            }
        };
    }
}
