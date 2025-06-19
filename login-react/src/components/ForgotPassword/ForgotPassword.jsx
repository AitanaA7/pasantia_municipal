import React, { useState, useEffect } from 'react';
import './ForgotPassword.css'; 

function ForgotPassword({ open, onClose }) {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('form'); // 'form' o 'done'
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    if (open) {
      setEmail('');
      setStep('form');
      setInputError(false);
    }
  }, [open]);

  if (!open) return null;

  const handleSend = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setInputError(true);
      return;
    }
    setInputError(false);

    // send reset request to API
    // await fetch('/api/reset-password', { method: 'POST', body: JSON.stringify({ email }) });

    setStep('done');
  };

  const popupStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    padding: '24px 32px',
    borderRadius: '10px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    zIndex: 10000,
    textAlign: 'center',
    minWidth: 320,
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.15)',
      zIndex: 9999,
    }}>
      <div style={popupStyle}>
        {step === 'form' ? (
          <>
            <h2 className="text-2xl text-blue-900 text-center mb-5 font-semibold" style={{ marginBottom: 18 }}>Reset Password</h2>
            <p className="text-base text-gray-800 text-center mb-7" style={{ marginBottom: 16 }}>Enter your email to reset your password:</p>
            <input
            className={`px-2 py-1 w-[90%] mb-2 rounded border outline-none bg-white text-black ${
          inputError ? 'border-red-500' : 'border-gray-300'
        }`}
              type="email"
              placeholder="Email"
              autoComplete='email'
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
            />
            {inputError && (
              <div className="text-red-600 text-sm mb-2">
                Please enter a valid email address.
              </div>
            )}
            <div>
              <button
                onClick={handleSend}
                className="bg-blue-900 text-white rounded-lg px-5 py-2 mr-2 hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Send
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 rounded-lg px-5 py-2 hover:bg-gray-400 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl text-blue-900 text-center mb-5 font-semibold" style={{ marginBottom: 16 }}>Password Reset</h2>
            <p className="text-base text-gray-800 text-center mb-7" style={{ marginBottom: 24 }}>
              If the email exists, you will receive instructions to reset your password.
            </p>
            <button
              onClick={onClose}
              className="bg-blue-900 text-white rounded-lg px-5 py-2 mr-2 hover:bg-blue-700 transition-colors cursor-pointer"
            >
              OK
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;