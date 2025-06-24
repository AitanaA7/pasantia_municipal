const Logistica = ({ register, errors }) => {
  return (
    <div>
      <label>Logística</label>
      <div>
        <input type="text" {...register("tipoVolquete")} placeholder="Tipo de volquete" />
        <p>{errors.tipoVolquete?.message}</p>
      </div>
      <div>
        <input type="text" {...register("volqueteNumero")} placeholder="Volquete N°" />
        <p>{errors.volqueteNumero?.message}</p>
      </div>
      <div>
        <input type="text" {...register("destinoFinal")} placeholder="Destino final del material" />
        <p>{errors.destinoFinal?.message}</p>
      </div>
    </div>
  );
};

export default Logistica;
