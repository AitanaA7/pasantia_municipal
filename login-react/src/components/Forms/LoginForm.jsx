import { useState, useEffect } from 'react'
import './Forms.css'
import ModalError from '../ModalErrorLogin/ModalErrorLogin'
import '../ModalErrorLogin/ModalErrorLogin.css'

function LoginForm({ onLogin, onForgotPassword }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

      const validate = () => {
        let valid = true;
        setEmailError('');
        setPasswordError('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('Email is required.');
            valid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError('The email format is not valid.');
            valid = false;
        }

        if (!password) {
            setPasswordError('Password is required.');
            valid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
            valid = false;
        }

        return valid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validate()) return;

        setLoading(true);

        try {
            const response = await fetch('http://testiis01.campana.gov.ar/Municipalidad.Campana.Api/api/auth/munidigital/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials and try again.');
            }

            const data = await response.json();

            if (data.token) {
                sessionStorage.setItem('authToken', data.token);
            }

            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            if (onLogin) onLogin(data);

        } catch (error) {
            setError(error.message);
            setPassword('');
            if (!rememberMe) setEmail('');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
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
                {emailError && <div className="field-error">{emailError}</div>}
            </div>
            <div className='input-box'>
                <input 
                    type="password" 
                    placeholder='Password' 
                    required
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <i className='bx bxs-lock'></i>
                {passwordError && <div className="field-error">{passwordError}</div>}

            </div>
            <div className='remember-me'>
                <input 
                    type="checkbox" 
                    id="rememberMe" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)} 
                />
                <label htmlFor="rememberMe">Remember me</label>
            </div>
            <div className='forgot-password'>
                <a
                  href="#"
                  className='link'
                  onClick={e => {
                    e.preventDefault();
                    if (onForgotPassword) onForgotPassword();
                  }}
                >
                  Forgot password?
                </a>
            </div>
            <button type="submit" className='btn' disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <div className="error-message">{error}</div>}
            <p>or login with social platforms</p>
            <div className='social-icons'>
                <a href="#" className="icon"><i className='bx bxl-google'></i></a>
                <a href="#" className="icon"><i className='bx bxl-facebook'></i></a>
                <a href="#" className="icon"><i className='bx bxl-github'></i></a>
                <a href="#" className="icon"><i className='bx bxl-linkedin'></i></a>
            </div>
        </form>
        <ModalError 
            message={error} 
            onClose={() => setError('')}
        />
        </>
    )
}

export default LoginForm