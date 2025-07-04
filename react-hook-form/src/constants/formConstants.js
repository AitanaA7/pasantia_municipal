//  Form.jsx


// Función para obtener la fecha de mañana
export const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

// Valores por defecto del formulario
export const defaultFormValues = {
  fechaDesde: getTomorrowDate(),
  fechaHasta: '',
  calle: '',
  altura: '',
  entreCalle1: '',
  entreCalle2: '',
  lotes: '',
  choferNombre: '',
  DNIchofer: '',
  patenteCamion: '',
  tipoVolquete: '',
  volqueteNumero: '',
  destinoFinal: '',
  solicitanteNombre: ''
};

// Función para obtener valores de reset (con fecha actualizada)
export const getResetValues = () => ({
  ...defaultFormValues,
  fechaDesde: getTomorrowDate()
});



//  DeliveryDate.jsx


// Función para obtener la fecha de hoy 
export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Función para obtener la fecha máxima "hasta" (9 días después de fechaDesde)
export const getMaxDateHasta = (fechaDesde) => {
  if (!fechaDesde) return null;
  const maxDate = new Date(fechaDesde);
  maxDate.setDate(maxDate.getDate() + 9);
  return maxDate.toISOString().split('T')[0];
};



//  CredentialsModal.jsx


// Valores por defecto del formulario de credenciales
export const defaultCredentialsValues = {
  usuario: '',
  contraseña: '',
  recordar: false
};

// Claves de localStorage
export const storageKeys = {
  userCredentials: 'userCredentials'
};

// Textos del modal de credenciales
export const credentialsModalTexts = {
  title: 'Ingrese sus credenciales',
  subtitle: 'Las credenciales son únicas por cada empresa de volquetes registrada.',
  emailPlaceholder: 'Email',
  passwordPlaceholder: 'Contraseña',
  rememberLabel: 'Recordar credenciales',
  submitButton: 'Enviar',
  submitButtonLoading: 'Verificando...',
  closeButton: 'Cerrar modal'
};

// Función para crear userData para localStorage
export const createUserData = (credentialsData) => ({
  email: credentialsData.usuario,
  loginTime: new Date().toISOString(),
  rememberCredentials: credentialsData.recordar
});
