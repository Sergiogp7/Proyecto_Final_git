document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');

            if (!emailInput || !passwordInput) return;

            const credentials = {
                email: emailInput.value,
                password: passwordInput.value
            };

            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.disabled = true;
            submitBtn.innerText = 'Cargando...';

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials)
                });

                if (response.ok) {
                    const user = await response.json();
                    localStorage.setItem('gymCoreUser', JSON.stringify(user));
                    window.location.href = '/Estructura/Home.html';
                } else {
                    const errorText = document.getElementById('errorText');
                    if (errorText) {
                        errorText.innerText = 'Credenciales incorrectas. Pruebe otra vez.';
                        errorText.classList.remove('hidden');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                const errorText = document.getElementById('errorText');
                if (errorText) {
                    errorText.innerText = 'Error de conexión con el servidor.';
                    errorText.classList.remove('hidden');
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
            }
        });
    }
});
