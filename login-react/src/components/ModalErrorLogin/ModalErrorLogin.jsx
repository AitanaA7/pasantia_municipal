import './ModalErrorLogin.css';

function ModalError({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed inset-0 bg-black/35 flex items-center justify-center">
      <div className="bg-white px-6 py-8 rounded-xl shadow-lg min-w-[280px] text-center">
        <h2 className='text-blue-900 mb-3 text-xl font-semibold'>Error</h2>
        <p className="text-gray-800 mb-4">{message}</p> 
        <button 
          className="bg-blue-900 text-white rounded-lg px-5 py-2 mr-2 hover:bg-blue-700 transition-colors cursor-pointer"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default ModalError;