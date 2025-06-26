const DriverData = ({ register, errors }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-200 p-6">
      <label className="block text-lg font-semibold text-purple-800 mb-4">
        Datos chofer*
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del chofer
          </label> */}
          <input 
            type="text" 
            {...register("choferNombre")} 
            placeholder="Nombre del chofer" 
            required
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-400 transition duration-200"
          />
          {errors.choferNombre && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <span className="mr-1"></span>
              {errors.choferNombre.message}
            </p>
          )}
        </div>

        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            DNI chofer
          </label> */}
          <input 
            type="text" 
            {...register("DNIchofer")} 
            placeholder="DNI del chofer. Ej: 12345678" 
            required
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-400 transition duration-200"
          />
          {errors.DNIchofer && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <span className="mr-1"></span>
              {errors.DNIchofer.message}
            </p>
          )}
        </div>

        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            Patente del camión
          </label> */}
          <input 
            type="text" 
            {...register("patenteCamion")} 
            placeholder="Patente del camión. Ej: ABC123" 
            required
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-400 transition duration-200"
          />
          {errors.patenteCamion && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
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
