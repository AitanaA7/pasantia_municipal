import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import credentialsSchema from "../../schemas/credentialsSchema";
import { useState } from "react";
import SuccessModal from "./SuccessLoginModal";
import ErrorLoginModal from "./ErrorLoginModal";
import 'boxicons/css/boxicons.min.css';


const CredentialsModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isValid } 
  } = useForm({
    resolver: yupResolver(credentialsSchema),
    mode: 'onChange',
    defaultValues: {
      usuario: '',
      contraseña: '',
      recordar: false
    }
  });

  const handleCredentialsSubmit = async (credentialsData) => {
    setIsLoading(true);
    setShowError(false);
    
    try {
      const response = await fetch('http://testiis01.campana.gov.ar/Municipalidad.Campana.Api/api/auth/munidigital/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: credentialsData.usuario,
          contraseña: credentialsData.contraseña
        })
      });

      if (response.ok) {
        await response.json();
        setShowSuccess(true);
        
        // Reseteo credenciales si no clickeó "recordar"
        if (!credentialsData.recordar) {
          reset();
        }
      } else {
        setShowError(true);
      }
    } catch {
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setShowError(false);
    setShowSuccess(false);
    onClose();
  };

  const handleRetryLogin = () => {
    setShowError(false);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal principal de credenciales */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300">
          <div className="bg-gradient-to-r from-purple-600 to-violet-700 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-center mb-2">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <i className='bx bx-user text-white text-2xl'></i>
              </div>
            </div>
            <h2 className="text-xl font-bold text-center">Ingrese sus credenciales</h2>
            <p className="text-sm text-center mt-2 opacity-90">
              Las credenciales son únicas por cada empresa de volquetes registrada.
            </p>
          </div>
          
          <div className="p-6">
            {/* Formulario de login */}
            <form onSubmit={handleSubmit(handleCredentialsSubmit)} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  disabled={isLoading}
                  {...register('usuario')}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                    errors.usuario 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-purple-500'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                {errors.usuario && (
                  <p className="text-red-500 text-sm mt-1">{errors.usuario.message}</p>
                )}
              </div>
              
              <div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  disabled={isLoading}
                  {...register('contraseña')}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                    errors.contraseña 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-purple-500'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                {errors.contraseña && (
                  <p className="text-red-500 text-sm mt-1">{errors.contraseña.message}</p>
                )}
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="recordar"
                  disabled={isLoading}
                  {...register('recordar')}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="recordar" className="ml-2 text-sm text-gray-700">
                  Recordar credenciales
                </label>
              </div>
              
              <div className="flex justify-between gap-3 mt-6">
                <button
                  type="submit"
                  disabled={!isValid || isLoading}
                  className={`px-6 py-2 bg-purple-600 text-white rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    isValid && !isLoading
                      ? 'hover:bg-purple-700' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {isLoading && <i className='bx bx-loader-alt animate-spin'></i>}
                  {isLoading ? 'Verificando...' : 'Enviar'}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cerrar modal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de éxito */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
      />

      {/* Modal de error */}
      <ErrorLoginModal
        isOpen={showError}
        onRetry={handleRetryLogin}
        onClose={handleClose}
      />
    </>
  );
};

export default CredentialsModal;
