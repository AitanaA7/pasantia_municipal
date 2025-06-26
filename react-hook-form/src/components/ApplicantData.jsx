const ApplicantData = ({ register, errors }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-200 p-6">
      <label className="block text-lg font-semibold text-purple-800 mb-4">
        Datos solicitante
      </label>
      
      <div>
        {/* <label className="block text-sm font-medium text-gray-700 mb-2">
          Nombre del solicitante
        </label> */}
        <input 
          type="text" 
          {...register("solicitanteNombre")} 
          placeholder="Nombre del solicitante" 
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-400 transition duration-200"
        />
        {errors.solicitanteNombre && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <span className="mr-1"></span>
            {errors.solicitanteNombre.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ApplicantData;
