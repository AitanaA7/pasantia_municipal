const DatosChofer = ({ register, errors }) => {
  return (
    <div>
      <label>Datos chofer</label>
      <div>
        <input type="text" {...register("choferNombre")} placeholder="Nombre del chofer" />
        <p>{errors.choferNombre?.message}</p>
      </div>
      <div>
        <input type="text" {...register("DNIchofer")} placeholder="DNI chofer" />
        <p>{errors.DNIchofer?.message}</p>
      </div>
      <div>
        <input type="text" {...register("patenteCamion")} placeholder="Patente del camión" />
        <p>{errors.patenteCamion?.message}</p>
      </div>
    </div>
  );
};

export default DatosChofer;
