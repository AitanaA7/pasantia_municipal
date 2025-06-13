import { useState } from 'react'
import './Forms.css'

function RegisterForm({ onRegisterComplete }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [confirmPassword, setConfirmPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [loading, setLoading] = useState(false)

    const validate = () => {
        let valid = true
        setEmailError('')
        setPasswordError('')
        setConfirmPasswordError('')

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email) {
            setEmailError('Email is required.')
            valid = false
        } else if (!emailRegex.test(email)) {
            setEmailError('Invalid email format.')
            valid = false
        }

        if (!password) {
            setPasswordError('Password is required.')
            valid = false
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long.')
            valid = false
        }

        if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match.')
            valid = false
        }

        return valid
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return

        setLoading(true)

        // if (onRegisterComplete) onRegisterComplete();

        try {
            // API call
            if (onRegisterComplete) onRegisterComplete({ email, password })
        } finally {
            setLoading(false)
        }
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
                {emailError && <div className="field-error">{emailError}</div>}

            </div>
            <div className='input-box'>
                <input 
                    type="password" 
                    placeholder='Choose your password' 
                    required
                    pattern="^(?=.*\d).{5,}$"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <i class='bx bxs-lock-open'></i>
                {passwordError && <div className="field-error">{passwordError}</div>}
            </div>
            <div className='input-box'>
                <input
                    type="password"
                    placeholder='Confirm your password'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                />
                <i className='bx bxs-lock'></i>
                {confirmPasswordError && <div className="field-error">{confirmPasswordError}</div>}
            </div>
            <button type="submit" className='btn'>
                {loading ? 'Registering...' : 'Register'}
            </button>
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