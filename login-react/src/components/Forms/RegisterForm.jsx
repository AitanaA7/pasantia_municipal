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
            <h1 className='text-4xl text-center font-bold text-blue-900 mb-4'>Register</h1>
            <div className='input-field'>
                <input 
                    name='email'
                    type="email" 
                    placeholder='Email' 
                    autoComplete="email"
                    required
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <i className='bx bxs-envelope icon'></i>
            </div>
            {emailError && (
                <p className="mt-1 mb-1 text-sm text-red-600 text-center">{emailError}</p>
            )}
              <div className='input-field'>
                <input 
                    type="password" 
                    placeholder='Choose your password' 
                    required
                    pattern="^(?=.*\d).{5,}$"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <i class='bx bxs-lock-open icon'></i>
            </div>
            {passwordError && (
                <p className="mt-1 mb-1 text-sm text-red-600 text-center">{passwordError}</p>
            )}
            <div className='input-field'>
                <input
                    type="password"
                    placeholder='Confirm your password'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                />
                <i className='bx bxs-lock icon'></i>
            </div>
            {confirmPasswordError && (
                <p className="mt-1 mb-1 text-sm text-red-600 text-center">{confirmPasswordError}</p>
            )}
            <button type="submit" className='button-primary'>
                {loading ? 'Registering...' : 'Register'}
            </button>
            <p className='text-center font-thin'>or register with social platforms</p>
            <div className='flex justify-center mt-4'>
                <a href="#" className="social-icons"><i className='bx bxl-google'></i></a>
                <a href="#" className="social-icons"><i className='bx bxl-facebook'></i></a>
                <a href="#" className="social-icons"><i className='bx bxl-github'></i></a>
                <a href="#" className="social-icons"><i className='bx bxl-linkedin'></i></a>
            </div>
        </form>
    )
}
export default RegisterForm