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
            <h2 className="password-reset-title" style={{ marginBottom: 18 }}>Reset Password</h2>
            <p className="password-reset-message" style={{ marginBottom: 16 }}>Enter your email to reset your password:</p>
            <input
            className='password-reset-input'
              type="email"
              placeholder="Email"
              autoComplete='email'
              value={email}
              required
              style={{
                border: `1px solid ${inputError ? '#ff0000' : '#ccc'}`
              }}
              onChange={e => setEmail(e.target.value)}
            />
            {inputError && (
              <div style={{ color: '#ff0000', fontSize: '13px', marginBottom: 8 }}>
                Please enter a valid email address.
              </div>
            )}
            <div>
              <button
                onClick={handleSend}
                style={{
                  background: '#004578',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 20px',
                  cursor: 'pointer',
                  marginRight: 8
                }}
              >
                Send
              </button>
              <button
                onClick={onClose}
                style={{
                  background: '#ccc',
                  color: '#333',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 20px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="password-reset-title" style={{ marginBottom: 16 }}>Password Reset</h2>
            <p className="password-reset-message" style={{ marginBottom: 24 }}>
              If the email exists, you will receive instructions to reset your password.
            </p>
            <button
              onClick={onClose}
              style={{
                background: '#004578',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '8px 20px',
                cursor: 'pointer'
              }}
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