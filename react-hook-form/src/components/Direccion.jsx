const Direccion = ({ register, errors }) => {
  return (
    <div>
      <label>Calle</label>
      <small>Si no posee altura especifique sus entrecalles</small>
      <div>
        <div>
          <input type="text" {...register("calle")} placeholder="Calle" />
          <p>{errors.calle?.message}</p>
        </div>

        <div>
          <input type="text" {...register("altura")} placeholder="Altura" />
          <p>{errors.altura?.message}</p>
        </div>

        <div>
          <input type="text" {...register("entreCalle1")} placeholder="Entre calle 1" />
          <p>{errors.entreCalle1?.message}</p>
        </div>
        <div>
          <input type="text" {...register("entreCalle2")} placeholder="Entre calle 2" />
          <p>{errors.entreCalle2?.message}</p>
        </div>
        <div>
          <input type="text" {...register("lotes")} placeholder="Lotes" />
          <p>{errors.lotes?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Direccion;
