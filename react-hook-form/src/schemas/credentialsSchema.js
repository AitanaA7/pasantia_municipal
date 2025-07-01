import * as yup from "yup";

const credentialsSchema = yup.object({
    usuario: yup.string()
        .required("El email es requerido")
        .email("Debe ser un email válido")
        .max(100, "El email no puede exceder los 100 caracteres"),
    contraseña: yup.string()
        .required("La contraseña es requerida")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(50, "La contraseña no puede exceder los 50 caracteres")
        .matches(/(?=.*[a-z])/, "La contraseña debe contener al menos una letra minúscula")
        .matches(/(?=.*[A-Z])/, "La contraseña debe contener al menos una letra mayúscula")
        .matches(/(?=.*\d)/, "La contraseña debe contener al menos un número"),
    recordar: yup.boolean()
});

export default credentialsSchema;