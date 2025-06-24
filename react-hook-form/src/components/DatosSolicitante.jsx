const DatosSolicitante = ({ register, errors }) => {
  return (
    <div>
      <label>Datos solicitante</label>
      <div>
        <input type="text" {...register("solicitanteNombre")} placeholder="Nombre del solicitante" />
        <p>{errors.solicitanteNombre?.message}</p>
      </div>
    </div>
  );
};

export default DatosSolicitante;
