const Logistics = ({ register, errors }) => {
  return (
    <div className="div">
      <label className="label">
        Logística*
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="relative">
            <select 
              {...register("tipoVolquete")} 
              className="select"
              defaultValue=""
              required
            >
              <option value="">Tipo de volquete</option>
              <option value="Aridos">Áridos</option>
              <option value="Ramas">Ramas</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.tipoVolquete && (
            <p className="error-message">
              <span className="mr-1"></span>
              {errors.tipoVolquete.message}
            </p>
          )}
        </div>

        <div>
          <input 
            type="number" 
            {...register("volqueteNumero")} 
            placeholder="Volquete N°" 
            required
            className="input"
          />
          {errors.volqueteNumero && (
            <p className="error-message">
              <span className="mr-1"></span>
              {errors.volqueteNumero.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <input 
            type="text" 
            {...register("destinoFinal")} 
            placeholder="Destino final del material" 
            required
            className="input"
          />
          {errors.destinoFinal && (
            <p className="error-message">
              <span className="mr-1"></span>
              {errors.destinoFinal.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Logistics;
