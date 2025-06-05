const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

document.getElementById('login-form').addEventListener('submit', async(event) =>{
    event.preventDefault(); 

    const email = document.getElementById('l-email').value;
    const password = document.getElementById('l-password').value;

    try {
        const response = await fetch('http://testiis01.campana.gov.ar/Municipalidad.Campana.Api/api/auth/munidigital/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Login failed.  Please check your credentials and try again.');
        } 

        const data = await response.json();

        // guardo token para futuras peticiones
        // si el token no es null, lo guardo en sessionStorage (no localStorage para mayor seguridad)
        if (data.token) {
            sessionStorage.setItem('authToken', data.token);
        }

        console.log('Login successful:', data);

        document.body.innerHTML = `
            <div class="welcome-box">
            <h1>Welcome, ${data.usuario.username} </h1>
            <p>Here are your details:</p>
            <p>- Email: ${data.usuario.email}</p> 
            <p>- Id: ${data.usuario.id}</p>
            <button id="logout-btn" style="margin-top:20px;background:#004578;color:#fff;border:none;border-radius:6px;padding:8px 20px;cursor:pointer;">
            <i class='bx bx-log-out' style="vertical-align:middle;margin-right:8px;"></i>
            Log out
            </button>
            </div>
        `;

        document.getElementById('logout-btn').addEventListener('click', () => {
            sessionStorage.removeItem('authToken');
            location.reload();
        });
       
    }

    catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please check your credentials and try again.');
        document.getElementById('l-password').value = '';
        if (!rememberMeCheckbox.checked) {
            emailInput.value = '';
        }
    }

});

const rememberMeCheckbox = document.getElementById('remember-me');
const emailInput = document.getElementById('l-email');

window.addEventListener('DOMContentLoaded', () => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMeCheckbox.checked = true;
    }
});

rememberMeCheckbox.addEventListener('change', () => {
    if (rememberMeCheckbox.checked) {
        localStorage.setItem('rememberedEmail', emailInput.value);
    } else {
        localStorage.removeItem('rememberedEmail');
    }
});

emailInput.addEventListener('input', () => {
    if (rememberMeCheckbox.checked) {
        localStorage.setItem('rememberedEmail', emailInput.value);
    }
});

const forgotPasswordLink = document.getElementById('forgot-password');
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (event) => {
        event.preventDefault();

        // popup forgot password
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.background = '#fff';
        popup.style.padding = '24px 32px';
        popup.style.borderRadius = '10px';
        popup.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
        popup.style.zIndex = 10000;
        popup.style.textAlign = 'center';

        popup.innerHTML = `
            <h2 style="margin-bottom:18px;">Reset Password</h2>
            <p style="margin-bottom:16px;">Enter your email to reset your password:</p>
            <input type="email" id="reset-email" placeholder="Email" style="padding:6px;width:90%;margin-bottom:16px;border-radius:4px;border:1px solid #ccc;" required />
            <div>
            <button id="reset-send-btn" style="background:#004578;color:#fff;border:none;border-radius:6px;padding:8px 20px;cursor:pointer;margin-right:8px;">Send</button>
            <button id="reset-cancel-btn" style="background:#ccc;color:#333;border:none;border-radius:6px;padding:8px 20px;cursor:pointer;">Cancel</button>
            </div>
        `;

        document.body.appendChild(popup);

        const sendBtn = popup.querySelector('#reset-send-btn');
        const cancelBtn = popup.querySelector('#reset-cancel-btn');
        const emailInput = popup.querySelector('#reset-email');

        sendBtn.addEventListener('click', async () => {
            const email = emailInput.value.trim();
            if (!email) {
                emailInput.style.borderColor = 'red';
                return;
            }
            emailInput.style.borderColor = '#ccc';

            // send reset request to API
            // await fetch('/api/reset-password', { method: 'POST', body: JSON.stringify({ email }) });

            popup.innerHTML = `
                <h2 style="margin-bottom:16px;">Password Reset</h2>
                <p style="margin-bottom:24px;">If the email exists, you will receive instructions to reset your password.</p>
                <button id="reset-ok-btn" style="background:#004578;color:#fff;border:none;border-radius:6px;padding:8px 20px;cursor:pointer;">OK</button>
            `;
            popup.querySelector('#reset-ok-btn').addEventListener('click', () => {
                document.body.removeChild(popup);
            });
        });

        cancelBtn.addEventListener('click', () => {
            document.body.removeChild(popup);
        });
    });
}

// Extended Registration Form

window.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const extendedRegisterDiv = document.getElementById('extended-register-form');
    if (registerForm && extendedRegisterDiv) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            extendedRegisterDiv.style.display = 'block';
            registerForm.style.display = 'none'; 
            container.classList.add('active');
            container.classList.add('extended-open');
        });
    }
});

const extendedRegisterForm = document.getElementById('extended-register-form');
if (extendedRegisterForm) {
    const registerNowBtn = document.getElementById('extended-register-btn');
    if (registerNowBtn) {
        registerNowBtn.addEventListener('click', (event) => {
            event.preventDefault();

            const inputs = extendedRegisterForm.querySelectorAll('input[required], select[required], textarea[required]');
            let allFilled = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    allFilled = false;
                    input.classList.add('input-error'); 
                } else {
                    input.classList.remove('input-error');
                }
            });

            if (!allFilled) {
                alert('Please fill in all required fields.');
                return;
            }

            const popup = document.createElement('div');
            popup.style.position = 'fixed';
            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';
            popup.style.background = '#fff';
            popup.style.padding = '24px 32px';
            popup.style.borderRadius = '10px';
            popup.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
            popup.style.zIndex = 10000;
            popup.style.textAlign = 'center';

            popup.innerHTML = `
                <h2 style="margin-bottom:10px;">Sucessful Registration!</h2>
                <button style="
                    margin-top:12px;
                    background:#004578;
                    color:#fff;
                    border:none;
                    border-radius:6px;
                    padding:8px 20px;
                    cursor:pointer;
                ">OK</button>
            `;

            document.body.appendChild(popup);

            popup.querySelector('button').addEventListener('click', () => {
                document.body.removeChild(popup);
                container.classList.remove('active', 'extended-open');
                document.getElementById('register-form').style.display = 'block';
                extendedRegisterForm.style.display = 'none';
            });
        });
    }
}
