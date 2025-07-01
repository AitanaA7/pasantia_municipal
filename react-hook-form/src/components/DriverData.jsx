const DriverData = ({ register, errors }) => {
  return (
    <div className="div">
      <label className="label">
        Datos chofer*
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <input 
            type="text" 
            {...register("choferNombre")} 
            placeholder="Nombre del chofer" 
            required
            className="input"
          />
          {errors.choferNombre && (
            <p className="error-message">
              <span className="mr-1"></span>
              {errors.choferNombre.message}
            </p>
          )}
        </div>

        <div>
          <input 
            type="number" 
            {...register("DNIchofer")} 
            placeholder="DNI del chofer. Ej: 12345678" 
            required
            className="input"
          />
          {errors.DNIchofer && (
            <p className="error-message">
              <span className="mr-1"></span>
              {errors.DNIchofer.message}
            </p>
          )}
        </div>

        <div>
          <input 
            type="text" 
            {...register("patenteCamion", {
              onChange: (e) => {
                e.target.value = e.target.value.toUpperCase();
              }
            })} 
            placeholder="Patente del camión. Ej: AB123CD o ABC123" 
            required
            className="input"
          />
          {errors.patenteCamion && (
            <p className="error-message">
              <span className="mr-1"></span>
              {errors.patenteCamion.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverData;
