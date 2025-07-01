import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import 'boxicons/css/boxicons.min.css';

const credentialsSchema = yup.object({
    usuario: yup.string()
        .required("El usuario es requerido")
        .min(3, "El usuario debe tener al menos 3 caracteres")
        .max(20, "El usuario no puede exceder los 20 caracteres")
        .matches(/^[a-zA-Z0-9_.-]+$/, "El usuario solo puede contener letras, números, guiones, puntos y guiones bajos"),
    contraseña: yup.string()
        .required("La contraseña es requerida")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(50, "La contraseña no puede exceder los 50 caracteres")
        .matches(/(?=.*[a-z])/, "La contraseña debe contener al menos una letra minúscula")
        .matches(/(?=.*[A-Z])/, "La contraseña debe contener al menos una letra mayúscula")
        .matches(/(?=.*\d)/, "La contraseña debe contener al menos un número"),
    recordar: yup.boolean()
});

const CredentialsModal = ({ isOpen, onSubmit, onClose }) => {
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

  const handleCredentialsSubmit = (credentialsData) => {
    onSubmit(credentialsData);
    
    // Reseteo credenciales si no clickeó "recordar"
    if (!credentialsData.recordar) {
      reset();
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300">
        <div className="bg-gradient-to-r from-purple-600 to-violet-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <i className='bx bx-user text-white text-2xl'></i>
            </div>
          </div>
          <h2 className="text-xl font-bold text-center">Ingrese sus credenciales</h2>
          <p className="text-sm text-center mt-2 text-purple-100">
            Las credenciales son únicas por cada empresa de volquetes registrada
          </p>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit(handleCredentialsSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Usuario"
                {...register('usuario')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                  errors.usuario 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-purple-500'
                }`}
              />
              {errors.usuario && (
                <p className="text-red-500 text-sm mt-1">{errors.usuario.message}</p>
              )}
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Contraseña"
                {...register('contraseña')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                  errors.contraseña 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-purple-500'
                }`}
              />
              {errors.contraseña && (
                <p className="text-red-500 text-sm mt-1">{errors.contraseña.message}</p>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="recordar"
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
                disabled={!isValid}
                className={`px-6 py-2 bg-purple-600 text-white rounded-lg transition-all duration-200 ${
                  isValid 
                    ? 'hover:bg-purple-700' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                Enviar
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cerrar modal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CredentialsModal;
