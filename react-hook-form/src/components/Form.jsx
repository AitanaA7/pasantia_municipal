import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import schema from "../schemas/formSchema";
import DeliveryDate from "./inputFields/DeliveryDate";
import Address from "./inputFields/Address";
import Location from "./Location";
import DriverData from "./inputFields/DriverData";
import Logistics from "./inputFields/Logistics";
import ApplicantData from "./inputFields/ApplicantData";
import CredentialsModal from "./modals/CredentialsModal";
import SuccessModal from "./modals/SuccessLoginModal";
import { defaultFormValues, getResetValues } from "../constants/formConstants";

const Form = () => {
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [loggedUser, setLoggedUser] = useState('');

  const { register, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: defaultFormValues
  });

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
    
    // Guardar el usuario logueado
    setLoggedUser(credentialsData.usuario);
    
    // Cierro modal de credenciales y muestro modal de éxito
    setShowCredentialsModal(false);
    setShowSuccessModal(true);
  };

  const closeCredentialsModal = () => {
    setShowCredentialsModal(false);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    // Reseteo formulario cuando se cierra el modal de éxito con fechas por defecto
    reset(getResetValues());
    // También limpio los datos guardados
    setFormData(null);
    setLoggedUser('');
    // Triggeo el reset del componente Location
    setResetTrigger(prev => prev + 1);
    // Desplazo la página al inicio
    window.scrollTo(0, 0);
  };

return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
          <div className="space-y-6">
              <DeliveryDate register={register} errors={errors} watch={watch} />
              <Address register={register} errors={errors} />
              <Location resetTrigger={resetTrigger} />
              <DriverData register={register} errors={errors} />
              <Logistics register={register} errors={errors} />
              <ApplicantData register={register} errors={errors} />
          </div>
          
          <div className="flex justify-center pt-6 border-t border-purple-200">
              <button 
                  type="submit"
                  className={`btn transition-opacity duration-200 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!isValid}
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
        userName={loggedUser}
      />
    </>
);
};

export default Form;