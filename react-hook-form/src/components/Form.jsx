import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
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
        .min(yup.ref('fechaDesde'), "La fecha hasta debe ser posterior a la fecha desde"),
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
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', // La validación se ejecuta en cada cambio
  });

  console.log("Errores actuales del formulario:", errors);

  const onSubmit = (data) => {
    console.log("Formulario enviado:", data);

    // Muestro modal de éxito
    setShowModal(true);
    
    reset();
  };

  const onError = (errors) => {
    console.log("Errores del formulario:", errors);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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

      {/* Modal de éxito */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300">
            <div className="bg-gradient-to-r from-purple-600 to-violet-700 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-center mb-2">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
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
                  onClick={closeModal}
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