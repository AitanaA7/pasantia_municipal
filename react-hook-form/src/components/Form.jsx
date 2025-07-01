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
import CredentialsModal from "./CredentialsModal";
import SuccessModal from "./SuccessModal";

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
  
  const { register, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
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

  const onCredentialsSubmit = (credentialsData) => {
    console.log("Credenciales enviadas:", credentialsData);
    console.log("Datos del formulario:", formData);
    
    // Cierro modal de credenciales y muestro modal de éxito
    setShowCredentialsModal(false);
    setShowSuccessModal(true);
    
    // Reseteo formulario principal
    reset();
  };

  const closeCredentialsModal = () => {
    setShowCredentialsModal(false);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
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

      <CredentialsModal 
        isOpen={showCredentialsModal}
        onSubmit={onCredentialsSubmit}
        onClose={closeCredentialsModal}
      />

      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={closeSuccessModal}
      />
    </>
);
};

export default Form;