import { useState } from 'react';
import LoginForm from '../LoginForm'
import RegisterForm from '../RegisterForm';
import ExtRegisterForm from '../ExtRegisterForm';
import SuccessLogin from '../SuccessLogin';
import 'boxicons/css/boxicons.min.css';
import './App.css'

function App() {
  const [showLogin, setShowLogin] = useState(true)
  const [showExtRegister, setShowExtRegister] = useState(false);
  const [user, setUser] = useState(null);

  const handleRegisterComplete = () => {
    setShowExtRegister(true)
  }

  const handleLogin = (data) => {
    setUser(data.usuario)
  }

  const handleLogout = () => {
    setUser(null);
    setShowLogin(true);
    setShowExtRegister(false);
  }

  if (user) {
    return <SuccessLogin user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="container">
      {!showExtRegister && (
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
          {showLogin ? (
            <>
              <span className='panel-header'>
                <h1>Hello, Welcome!</h1>
                <p>Don't have an account?</p>
              </span>
              <button className="btn" onClick={() => setShowLogin(false)}>Register</button>
            </>
          ) : (
            <>
              <span className='panel-header'>
                <h1>Welcome Back!</h1>
                <p>Already have an account?</p>
              </span>
              <button className="btn" onClick={() => setShowLogin(true)}>Login</button>
            </>
          )}
        </div>
      )}
      {showLogin ? (
        <LoginForm onLogin={handleLogin} />
      ) : showExtRegister ? (
        <ExtRegisterForm />
      ) : (
        <RegisterForm onRegisterComplete={handleRegisterComplete} />
      )}    
    </div>  
  )
}

export default App
