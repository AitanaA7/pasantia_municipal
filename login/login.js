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

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

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

        console.log('Login successful:', data);

        document.body.innerHTML = `
            <div class="welcome-box">
                <h1>Welcome, ${data.usuario.username} </h1>
                <p>Here are your details:</p>
                <p>- Email: ${data.usuario.email}</p> 
                <p>- Id: ${data.usuario.id}</p>
            </div>
        `;

    }

    catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please check your credentials and try again.');
    }

});