import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
    altura: yup.string()
        .required("Altura es requerida")
        .matches(/^\d{1,5}$/, "La altura debe ser un número de máximo 5 dígitos"),
    entreCalle1: yup.string().required("Entre calle 1 es requerido"),
    entreCalle2: yup.string().required("Entre calle 2 es requerido"),
    lotes: yup.string().required("Lotes es requerido"),
    choferNombre: yup.string().required("Nombre del chofer es requerido"),
    DNIchofer: yup.string()
        .required("DNI del chofer es requerido")
        .matches(/^\d{1,8}$/, "El DNI debe ser un número de máximo 8 dígitos"),
    patenteCamion: yup.string().required("Patente del camión es requerida"),
    tipoVolquete: yup.string().required("Tipo de volquete es requerido"),
    volqueteNumero: yup.string().required("Volquete N° es requerido"),
    destinoFinal: yup.string().required("Destino final del material es requerido"),
    solicitanteNombre: yup.string().required("Nombre del solicitante es requerido")
});

const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <DeliveryDate register={register} errors={errors} />
        <Address register={register} errors={errors} />
        <Location />
        <DriverData register={register} errors={errors} />
        <Logistics register={register} errors={errors} />
        <ApplicantData register={register} errors={errors} />
        <button type="submit">Cargar credenciales</button>
    </form>
);
};

export default Form;