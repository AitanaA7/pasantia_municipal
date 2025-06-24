import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FechaEntrega from "./FechaEntrega";
import Direccion from "./Direccion";
import Localizacion from "./Localizacion";
import DatosChofer from "./DatosChofer";
import Logistica from "./Logistica";
import DatosSolicitante from "./DatosSolicitante";

const schema = yup.object({
    fechaDesde: yup.date().required("Fecha desde es requerida"),
    fechaHasta: yup.date().required("Fecha hasta es requerida").min(
        yup.ref('fechaDesde'),
        "La fecha hasta debe ser posterior a la fecha desde"
    ),
    calle: yup.string().required("Calle es requerida"),
    altura: yup.string().required("Altura es requerida"),
    entreCalle1: yup.string().required("Entre calle 1 es requerido"),
    entreCalle2: yup.string().required("Entre calle 2 es requerido"),
    lotes: yup.string().required("Lotes es requerido"),
    choferNombre: yup.string().required("Nombre del chofer es requerido"),
    DNIchofer: yup.string().required("DNI del chofer es requerido"),
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
        <FechaEntrega register={register} errors={errors} />
        <Direccion register={register} errors={errors} />
        <Localizacion />
        <DatosChofer register={register} errors={errors} />
        <Logistica register={register} errors={errors} />
        <DatosSolicitante register={register} errors={errors} />
        <button type="submit">Cargar credenciales</button>
    </form>
);
};

export default Form;