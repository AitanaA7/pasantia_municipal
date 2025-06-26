const DeliveryDate = ({ register, errors }) => {
  return (
    <div>
      <label>Fecha de entrega</label>
      <div>
        <div>
          <input type="date" {...register("fechaDesde")} placeholder="Desde" />
          <p>{errors.fechaDesde?.message}</p>
        </div>
        <div>
          <input type="date" {...register("fechaHasta")} placeholder="Hasta" />
          <p>{errors.fechaHasta?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDate;
