const DeliveryDate = ({ register, errors, watch }) => {
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const fechaHasta = watch ? watch("fechaHasta") : null;
  const isHastaEmpty = !fechaHasta || fechaHasta === "";

  return (
    <div className="div">
      <label className="label">
        Fecha de entrega*
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Desde
          </label>
          <input 
            type="date" 
            {...register("fechaDesde")} 
            defaultValue={getTomorrowDate()}
            required
            className="input"
          />
          {errors.fechaDesde && (
            <p className="error-message">
              <span className="mr-1"></span>
              {errors.fechaDesde.message}
            </p>
          )}
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 transition duration-200 ${
            isHastaEmpty ? 'text-red-600' : 'text-gray-700'
          }`}>
            Hasta
          </label>
          <input 
            type="date" 
            {...register("fechaHasta")} 
            required
            className={`w-full px-4 py-3 bg-white rounded-lg focus:ring-2 transition duration-200 text-gray-700 placeholder-gray-400 ${
              isHastaEmpty 
                ? 'border-2 border-red-500 focus:ring-red-500 focus:border-red-500 hover:border-red-600' 
                : 'border border-gray-300 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-400'
            }`}
          />
          {errors.fechaHasta && (
            <p className="error-message">
              <span className="mr-1"></span>
              {errors.fechaHasta.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryDate;
