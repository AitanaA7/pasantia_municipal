import { useStreets } from '../../hooks/useStreets';

const Address = ({ register, errors }) => {
  const { calles, isLoading: loading, error } = useStreets();

  return (
    <div className="div">
      <label className="label">
        Calle*
      </label>
      <p className="small">
        <strong>Nota:</strong> Si no posee altura especifique sus entrecalles
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-1">
          {loading ? (
            <div className="loading">
              Cargando calles...
            </div>
          ) : error ? (
            <input 
              type="text" 
              {...register("calle")} 
              placeholder="Calle (Error al cargar lista)" 
              required
              className="loading-error"
            />
          ) : (
            <div className="relative">
              <select 
                {...register("calle")} 
                className="select"
                defaultValue=""
                required
              >
                <option value="">Calle</option>
                {calles?.map((calle, index) => (
                  <option key={index} value={typeof calle === 'string' ? calle : calle.nombre || calle.descripcion}>
                    {typeof calle === 'string' ? calle : calle.nombre || calle.descripcion}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}
          {errors.calle && (
            <p className="error-message">
              <span className="mr-1"></span>
              {errors.calle.message}
            </p>
          )}
        </div>

        <div className="md:col-span-1">
          <input 
            type="number" 
            {...register("altura")} 
            placeholder="Altura calle. Ej: 1234" 
            required
            className="input"
          />
          {errors.altura && (
            <p className="error-message">
              <span className="mr-1"></span>
              {errors.altura.message}
            </p>
          )}
        </div>

        <div className="md:col-span-1">
          {loading ? (
            <div className="loading">
              Cargando calles...
            </div>
          ) : error ? (
            <input 
              type="text" 
              {...register("entreCalle1")} 
              placeholder="Entre calle 1 (Error al cargar lista)" 
              className="loading-error"
            />
          ) : (
            <div className="relative">
              <select 
                {...register("entreCalle1")} 
                className="select"
                defaultValue=""
              >
                <option value="">Entre calle 1</option>
                {calles?.map((calle, index) => (
                  <option key={index} value={typeof calle === 'string' ? calle : calle.nombre || calle.descripcion}>
                    {typeof calle === 'string' ? calle : calle.nombre || calle.descripcion}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}
          {errors.entreCalle1 && (
            <p className="error-message">
              <span className="mr-1"></span>
              {errors.entreCalle1.message}
            </p>
          )}
        </div>

        <div className="md:col-span-1">
          {loading ? (
            <div className="loading">
              Cargando calles...
            </div>
          ) : error ? (
            <input 
              type="text" 
              {...register("entreCalle2")} 
              placeholder="Entre calle 2 (Error al cargar lista)" 
              className="loading-error"
            />
          ) : (
            <div className="relative">
              <select 
                {...register("entreCalle2")} 
                className="select"
                defaultValue=""
              >
                <option value="">Entre calle 2</option>
                {calles?.map((calle, index) => (
                  <option key={index} value={typeof calle === 'string' ? calle : calle.nombre || calle.descripcion}>
                    {typeof calle === 'string' ? calle : calle.nombre || calle.descripcion}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}
          {errors.entreCalle2 && (
            <p className="error-message">
              <span className="mr-1"></span>
              {errors.entreCalle2.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <input 
            type="text" 
            {...register("lotes")} 
            placeholder="Lotes Country/ETC" 
            className="input"
          />
          {errors.lotes && (
            <p className="error-message">
              <span className="mr-1"></span>
              {errors.lotes.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Address;
