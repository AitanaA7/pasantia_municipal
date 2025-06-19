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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-sky-50 via-sky-100 to-sky-200 px-2">
      {!showExtRegister && (
        <div className='flex flex-col items-center justify-center mb-8 w-full max-w-md md:max-w-lg'>
          {showLogin ? (
            <>
              <span className='panel-header'>
                <h1 className='text-4xl font-bold text-blue-900 mb-2'>Hello, Welcome!</h1>
                <p className="text-center font-medium">Don't have an account?</p>
              </span>
              <button className="button-primary"
                 onClick={() => setShowLogin(false)}>Register</button>
            </>
          ) : (
            <>
              <span className='panel-header'>
                <h1 className='text-4xl font-bold text-blue-900 mb-2'>Welcome Back!</h1>
                <p className="text-center font-medium">Already have an account?</p>
              </span>
              <button className="button-primary"
              onClick={() => setShowLogin(true)}>Login</button>
            </>
          )}
        </div>
      )}
      <div className="w-full max-w-md md:max-w-lg bg-white/80 rounded-2xl shadow-lg p-6 md:p-10">
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
    </div>  
  )
}

export default App
