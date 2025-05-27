document.getElementById('loginForm').addEventListener('submit', async(event) =>{
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

        const data = await response.json();

        if (!response.ok) {
            throw new Error('Login failed');
        } 

        console.log('Login successful:', data);

    }

    catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please check your credentials and try again.');
    }

});