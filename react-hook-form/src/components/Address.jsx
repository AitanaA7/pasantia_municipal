import { useState, useEffect } from 'react';

const Address = ({ register, errors }) => {
  const [calles, setCalles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalles = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://testiis01.campana.gov.ar/Municipalidad.Campana.Api/api/commons/calles');
        if (!response.ok) {
          throw new Error('Error al cargar las calles');
        }
        const data = await response.json();
        setCalles(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching calles:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCalles();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-200 p-6">
      <label className="block text-lg font-semibold text-purple-800 mb-2">
        Calle*
      </label>
      <p className="text-sm text-gray-600 mb-4 bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400">
        <strong>Nota:</strong> Si no posee altura especifique sus entrecalles
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-1">
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            Calle
          </label> */}
          {loading ? (
            <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500">
              Cargando calles...
            </div>
          ) : error ? (
            <input 
              type="text" 
              {...register("calle")} 
              placeholder="Calle (Error al cargar lista)" 
              required
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-400 transition duration-200"
            />
          ) : (
            <div className="relative">
              <select 
                {...register("calle")} 
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-400 transition duration-200 appearance-none cursor-pointer text-gray-700 placeholder-gray-400 pr-10"
                defaultValue=""
                required
              >
                <option value="">Calle</option>
                {calles.map((calle, index) => (
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
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <span className="mr-1"></span>
              {errors.calle.message}
            </p>
          )}
        </div>

        <div className="md:col-span-1">
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            Altura Calle
          </label> */}
          <input 
            type="text" 
            {...register("altura")} 
            placeholder="Altura calle. Ej: 1234" 
            required
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-400 transition duration-200 text-gray-700 placeholder-gray-400"
          />
          {errors.altura && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <span className="mr-1"></span>
              {errors.altura.message}
            </p>
          )}
        </div>

        <div className="md:col-span-1">
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            Entre calle 1
          </label> */}
          {loading ? (
            <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500">
              Cargando calles...
            </div>
          ) : error ? (
            <input 
              type="text" 
              {...register("entreCalle1")} 
              placeholder="Entre calle 1 (Error al cargar lista)" 
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-400 transition duration-200"
            />
          ) : (
            <div className="relative">
              <select 
                {...register("entreCalle1")} 
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-400 transition duration-200 appearance-none cursor-pointer text-gray-700 placeholder-gray-400 pr-10"
                defaultValue=""
              >
                <option value="">Entre calle 1</option>
                {calles.map((calle, index) => (
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
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <span className="mr-1"></span>
              {errors.entreCalle1.message}
            </p>
          )}
        </div>

        <div className="md:col-span-1">
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            Entre calle 2
          </label> */}
          {loading ? (
            <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500">
              Cargando calles...
            </div>
          ) : error ? (
            <input 
              type="text" 
              {...register("entreCalle2")} 
              placeholder="Entre calle 2 (Error al cargar lista)" 
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-400 transition duration-200"
            />
          ) : (
            <div className="relative">
              <select 
                {...register("entreCalle2")} 
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-400 transition duration-200 appearance-none cursor-pointer text-gray-700 placeholder-gray-400 pr-10"
                defaultValue=""
              >
                <option value="">Entre calle 2</option>
                {calles.map((calle, index) => (
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
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <span className="mr-1"></span>
              {errors.entreCalle2.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            Lotes Country/ETC
          </label> */}
          <input 
            type="text" 
            {...register("lotes")} 
            placeholder="Lotes Country/ETC" 
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-400 transition duration-200 text-gray-700 placeholder-gray-400"
          />
          {errors.lotes && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
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
