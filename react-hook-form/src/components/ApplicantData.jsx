const ApplicantData = ({ register, errors }) => {
  return (
    <div className="div">
      <label className="label">
        Datos solicitante
      </label>
      
      <div>
        <input 
          type="text" 
          {...register("solicitanteNombre")} 
          placeholder="Nombre del solicitante" 
          className="input"
        />
        {errors.solicitanteNombre && (
          <p className="error-message">
            <span className="mr-1"></span>
            {errors.solicitanteNombre.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ApplicantData;
