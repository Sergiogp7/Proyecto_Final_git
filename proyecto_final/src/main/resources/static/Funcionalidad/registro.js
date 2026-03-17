document.addEventListener('DOMContentLoaded', () => {
    const btnRegistro = document.getElementById('RegistroBtn');
    if (btnRegistro) {
        btnRegistro.addEventListener('click', async (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const apellidos = document.getElementById('apellidos').value;
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!nombre || !apellidos || !username || !email || !password) {
                alert('Por favor completa todos los campos');
                return;
            }

            try {
                const respuesta = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nombre: nombre,
                        apellidos: apellidos,
                        username: username,
                        email: email,
                        contrasena: password
                    })
                });

                if (respuesta.ok) {
                    const usuarioBD = await respuesta.json();

                    localStorage.setItem('gymCoreUser', JSON.stringify(usuarioBD));
                    window.location.href = '/Estructura/Home.html';
                } else {
                    const textoError = await respuesta.text();
                    alert('Error en el registro: ' + (textoError || 'Datos inválidos o usuario ya existente.'));
                }
            } catch (error) {
                console.error('Error de registro:', error);
                alert('Error al conectar con el servidor.');
            }
        });
    }
});
