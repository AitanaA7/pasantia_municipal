import 'boxicons/css/boxicons.min.css';

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300">
        <div className="bg-gradient-to-r from-purple-600 to-violet-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <i className='bx bx-user-check text-white text-2xl'></i>
            </div>
          </div>
          <h2 className="text-xl font-bold text-center">Solicitud enviada</h2>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 text-center mb-6">
            Su registro de volquete ha sido enviado correctamente.
          </p>
          
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="btn"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
