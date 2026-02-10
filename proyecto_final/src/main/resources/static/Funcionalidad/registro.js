document.addEventListener('DOMContentLoaded', () => {
    const btnInicioSesion = document.getElementById('RegistroBtn');
    if (btnInicioSesion) {
        btnInicioSesion.addEventListener('click', async (e) => {
            e.preventDefault();
            const correo = document.getElementById('email').value;
            const contrasena = document.getElementById('password').value;

            try {
                const respuesta = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: correo, password: contrasena })
                });

                if (respuesta.ok) {
                    const usuarioBD = await respuesta.json();

                    const usuario = {
                        nombre: usuarioBD.nombre,
                        nombreUsuario: usuarioBD.username,
                        email: usuarioBD.email,
                        telefono: usuarioBD.telefono || '',
                        ubicacion: usuarioBD.ubicacion || '',
                        bio: usuarioBD.bio || '',
                        avatar: usuarioBD.avatarUrl || '../Imagenes/Foto_Perfil.jpg'
                    };

                    localStorage.setItem('gymCoreUser', JSON.stringify(usuario));
                    window.location.href = 'Estructura/Home.html';
                } else {
                    alert('Credenciales incorrectas. Verifica tu correo y contraseña.');
                }
            } catch (error) {
                console.error('Error de login:', error);
                alert('Error al conectar con el servidor.');
            }
        });
    }
});
