import './ModalErrorLogin.css';

function ModalError({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="modal-error-backdrop">
      <div className="modal-error">
        <h2>Error</h2>
        <p className="modal-error-message">{message}</p> 
        <button className="btn" onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default ModalError;