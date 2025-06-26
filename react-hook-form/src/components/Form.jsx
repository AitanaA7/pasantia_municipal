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
    fechaDesde: yup.date().required("Fecha desde es requerida"),
    fechaHasta: yup.date().required("Fecha hasta es requerida").min(
        yup.ref('fechaDesde'),
        "La fecha hasta debe ser posterior a la fecha desde"
    ),
    calle: yup.string().required("Calle es requerida"),
    altura: yup.string().required("Altura es requerida"),
    entreCalle1: yup.string()
        .notOneOf([yup.ref('calle')], 'Entre calle 1 no puede ser igual a la calle principal'),
    entreCalle2: yup.string()
        .notOneOf([yup.ref('calle'), yup.ref('entreCalle1')], 'Entre calle 2 no puede repetirse con otras calles'),
    lotes: yup.string(),
    choferNombre: yup.string().required("Nombre del chofer es requerido"),
    DNIchofer: yup.string().required("DNI del chofer es requerido"),
    patenteCamion: yup.string().required("Patente del camión es requerida"),
    tipoVolquete: yup.string().required("Tipo de volquete es requerido"),
    volqueteNumero: yup.string().required("Volquete N° es requerido"),
    destinoFinal: yup.string().required("Destino final del material es requerido"),
    solicitanteNombre: yup.string()
});

const Form = () => {
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);

    // Muestro modal de éxito
    setShowModal(true);
    
    reset();
  };

  const closeModal = () => {
    setShowModal(false);
  };

return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                  className="bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
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
                  className="bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
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