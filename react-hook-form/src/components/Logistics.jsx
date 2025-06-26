const Logistics = ({ register, errors }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-200 p-6">
      <label className="block text-lg font-semibold text-purple-800 mb-4">
        Logística*
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de volquete
          </label> */}
          <div className="relative">
            <select 
              {...register("tipoVolquete")} 
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-400 transition duration-200 appearance-none cursor-pointer text-gray-700 placeholder-gray-400 pr-10"
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
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <span className="mr-1"></span>
              {errors.tipoVolquete.message}
            </p>
          )}
        </div>

        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            Volquete N°
          </label> */}
          <input 
            type="text" 
            {...register("volqueteNumero")} 
            placeholder="Volquete N°" 
            required
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-400 transition duration-200"
          />
          {errors.volqueteNumero && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <span className="mr-1"></span>
              {errors.volqueteNumero.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            Destino final del material
          </label> */}
          <input 
            type="text" 
            {...register("destinoFinal")} 
            placeholder="Destino final del material" 
            required
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-400 transition duration-200"
          />
          {errors.destinoFinal && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
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
