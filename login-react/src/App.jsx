import { useState } from 'react';
import LoginForm from './components/Forms/LoginForm'
import RegisterForm from './components/Forms/RegisterForm';
import ExtRegisterForm from './components/ExtRegForm/ExtRegForm';
import SuccessLogin from './components/SucessLogin/SuccessLogin';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import 'boxicons/css/boxicons.min.css';
import './App.css'

function App() {
  const [showLogin, setShowLogin] = useState(true)
  const [showExtRegister, setShowExtRegister] = useState(false);
  const [user, setUser] = useState(null);
  const [showForgot, setShowForgot] = useState(false);

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
        <>
          <LoginForm 
            onLogin={handleLogin} 
            onForgotPassword={() => setShowForgot(true)}
          />
          <ForgotPassword open={showForgot} onClose={() => setShowForgot(false)} />
        </>
      ) : showExtRegister ? (
        <ExtRegisterForm onRegisterComplete={() => {
          setShowLogin(true)  // o setShowExtRegister(false) pero vuelve a RegisterForm, no a LoginForm
        }}/>
      ) : (
        <RegisterForm onRegisterComplete={handleRegisterComplete} />
      )}    
    </div>  
  )
}

export default App
