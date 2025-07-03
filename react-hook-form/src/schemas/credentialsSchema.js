import * as yup from "yup";

const credentialsSchema = yup.object({
    usuario: yup.string()
        .required("El email es requerido")
        .email("Debe ser un email válido")
        .max(100, "El email no puede exceder los 100 caracteres"),
    contraseña: yup.string()
        .required("La contraseña es requerida")
        .min(1, "La contraseña es requerida")
        .max(50, "La contraseña no puede exceder los 50 caracteres"),
    recordar: yup.boolean()
});

export default credentialsSchema;