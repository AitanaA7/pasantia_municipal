import { useState } from 'react'

function RegisterForm({ onRegisterComplete }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onRegisterComplete) onRegisterComplete();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className='input-box'>
                <input 
                    name='email'
                    type="email" 
                    placeholder='Email' 
                    autoComplete="email"
                    required
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <i className='bx bxs-envelope'></i>
            </div>
            <div className='input-box'>
                <input 
                    type="password" 
                    placeholder='Choose your password' 
                    required
                    pattern="^(?=.*\d).{5,}$"
                    title="La contraseña debe tener al menos 5 caracteres y al menos 1 número."
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <i className='bx bxs-lock'></i>
            </div>
            <button type="submit" className='btn'>Register</button>
            <p>or register with social platforms</p>
            <div className='social-icons'>
                <a href="#" className="icon"><i className='bx bxl-google'></i></a>
                <a href="#" className="icon"><i className='bx bxl-facebook'></i></a>
                <a href="#" className="icon"><i className='bx bxl-github'></i></a>
                <a href="#" className="icon"><i className='bx bxl-linkedin'></i></a>
            </div>
        </form>
    )
}
export default RegisterForm