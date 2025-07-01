import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import 'boxicons/css/boxicons.min.css';
import DeliveryDate from "./DeliveryDate";
import Address from "./Address";
import Location from "./Location";
import DriverData from "./DriverData";
import Logistics from "./Logistics";
import ApplicantData from "./ApplicantData";

const schema = yup.object({
    fechaDesde: yup.date()
        .required("Fecha desde es requerida")
        .min(new Date(new Date().setHours(0,0,0,0)), "La fecha desde no puede ser anterior al día actual"),
    fechaHasta: yup.date()
        .required("Fecha hasta es requerida")
        .min(new Date(new Date().setHours(0,0,0,0)), "La fecha hasta no puede ser anterior al día actual")
        .min(yup.ref('fechaDesde'), "La fecha hasta debe ser posterior a la fecha desde")
        .test(
            'max-9-dias',
            'La fecha hasta no puede ser más de 9 días posterior a la fecha desde',
            function(value) {
                const { fechaDesde } = this.parent;
                if (!fechaDesde || !value) return true;
                
                const fechaDesdeDate = new Date(fechaDesde);
                const fechaHastaDate = new Date(value);
                const diferenciaDias = Math.ceil((fechaHastaDate - fechaDesdeDate) / (1000 * 60 * 60 * 24));
                
                return diferenciaDias <= 9;
            }
        ),
    calle: yup.string().required("Calle es requerida"),
    altura: yup.number()
        .typeError("Altura debe ser un número")
        .required("Altura es requerida")
        .min(0, "Altura debe ser un número positivo")
        .max(55555, "Altura no puede exceder los 5 dígitos"),
    entreCalle1: yup.string()
        .required("Entre calle 1 es requerido")
        .test(
          'distinto', 
          'Entre calle 1 no puede repetirse con otras calles', 
          function(value) {
            const { calle, entreCalle2 } = this.parent;
            return !value || (!calle || value !== calle) && (!entreCalle2 || value !== entreCalle2);
          }
        ),
    entreCalle2: yup.string()
        .required("Entre calle 2 es requerido")
        .test(
          'distinto',
          'Entre calle 2 no puede repetirse con otras calles',
          function(value) {
            const { calle, entreCalle1 } = this.parent;
            return !value || (!calle || value !== calle) && (!entreCalle1 || value !== entreCalle1);
          }
        ),
    lotes: yup.string(),
    choferNombre: yup.string().required("Nombre del chofer es requerido"),
    DNIchofer: yup.number()
        .typeError("DNI debe ser un número")
        .required("DNI del chofer es requerido")
        .min(0, "DNI debe ser un número positivo")
        .max(88888888, "DNI no puede exceder los 8 dígitos"),
    patenteCamion: yup.string()
        .required("Patente del camión es requerida")
        .test(
          'formato-patente',
          'Debe ingresar una patente válida (Ej: AB123CD o ABC123)',
          (value) => {
            const regex1 = /^[A-Z]{2}\d{3}[A-Z]{2}$/; // AB123CD
            const regex2 = /^[A-Z]{3}\d{3}$/; // ABC123
            return (regex1.test(value) || regex2.test(value));
          }
        ),

    tipoVolquete: yup.string().required("Tipo de volquete es requerido"),
    volqueteNumero: yup.number()
        .typeError("Volquete N° debe ser un número")
        .required("Volquete N° es requerido"),
    destinoFinal: yup.string().required("Destino final del material es requerido"),
    solicitanteNombre: yup.string()
});

const Form = () => {
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [credentials, setCredentials] = useState({
    usuario: '',
    contraseña: '',
    recordar: false
  });
  
  const { register, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', // La validación se ejecuta en cada cambio
  });

  console.log("Errores actuales del formulario:", errors);

  const onSubmit = (data) => {
    console.log("Formulario enviado:", data);
    
    // Guardo los datos del formulario y muestro modal de credenciales
    setFormData(data);
    setShowCredentialsModal(true);
  };

  const onError = (errors) => {
    console.log("Errores del formulario:", errors);
  };

  const handleCredentialsChange = (field, value) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCredentialsSubmit = () => {
    console.log("Credenciales enviadas:", credentials);
    console.log("Datos del formulario:", formData);
    
    // Cierro modal de credenciales y muestro modal de éxito
    setShowCredentialsModal(false);
    setShowSuccessModal(true);
    
    // Reseteo formulario
    reset();
    
    // Reseteo credenciales si no se marcó "recordar"
    if (!credentials.recordar) {
      setCredentials({
        usuario: '',
        contraseña: '',
        recordar: false
      });
    }
  };

  const closeCredentialsModal = () => {
    setShowCredentialsModal(false);
    setCredentials({
      usuario: '',
      contraseña: '',
      recordar: false
    });
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const isCredentialsValid = credentials.usuario.trim() !== '' && credentials.contraseña.trim() !== '';

return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
          <div className="space-y-6">
              <DeliveryDate register={register} errors={errors} watch={watch} />
              <Address register={register} errors={errors} />
              <Location />
              <DriverData register={register} errors={errors} />
              <Logistics register={register} errors={errors} />
              <ApplicantData register={register} errors={errors} />
          </div>
          
          <div className="flex justify-center pt-6 border-t border-purple-200">
              <button 
                  type="submit"
                  className={`btn transition-opacity duration-200 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!isValid}
                  onClick={() => console.log("Botón clickeado")}
              >
                  Cargar credenciales
              </button>
          </div>
      </form>

      {/* Modal de credenciales */}
      {showCredentialsModal && (
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
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Usuario"
                  value={credentials.usuario}
                  onChange={(e) => handleCredentialsChange('usuario', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={credentials.contraseña}
                  onChange={(e) => handleCredentialsChange('contraseña', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="recordar"
                    checked={credentials.recordar}
                    onChange={(e) => handleCredentialsChange('recordar', e.target.checked)}
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="recordar" className="ml-2 text-sm text-gray-700">
                    Recordar credenciales
                  </label>
                </div>
              </div>
              
              <div className="flex justify-between gap-3 mt-6">
                <button
                  onClick={handleCredentialsSubmit}
                  disabled={!isCredentialsValid}
                  className={`px-6 py-2 bg-purple-600 text-white rounded-lg transition-all duration-200 ${
                    isCredentialsValid 
                      ? 'hover:bg-purple-700' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  Enviar
                </button>
                <button
                  onClick={closeCredentialsModal}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cerrar modal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300">
            <div className="bg-gradient-to-r from-purple-600 to-violet-700 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-center mb-2">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <i className='bx bx-lock text-white text-2xl'></i>
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
                  onClick={closeSuccessModal}
                  className="btn"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
);
};

export default Form;