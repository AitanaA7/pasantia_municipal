import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import schema from "../schemas/formSchema";
import DeliveryDate from "./DeliveryDate";
import Address from "./Address";
import Location from "./Location";
import DriverData from "./DriverData";
import Logistics from "./Logistics";
import ApplicantData from "./ApplicantData";
import CredentialsModal from "./CredentialsModal";
import SuccessModal from "./SuccessModal";

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