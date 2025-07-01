import 'boxicons/css/boxicons.min.css';

const ErrorLoginModal = ({ isOpen, onRetry, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <i className='bx bx-x text-white text-2xl'></i>
            </div>
          </div>
          <h2 className="text-xl font-bold text-center">Error de Autenticación</h2>
          <p className="text-sm text-center mt-2 opacity-90">
            Usuario o contraseña incorrectos
          </p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <i className='bx bx-error-circle text-red-500 text-3xl mb-2'></i>
              <p className="text-red-800 font-medium">Credenciales incorrectas</p>
              <p className="text-red-600 text-sm mt-1">Por favor, verifique su usuario y contraseña</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onRetry}
                className="flex-1 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Intentar de nuevo
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorLoginModal;
