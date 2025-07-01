import * as yup from "yup";

const credentialsSchema = yup.object({
    usuario: yup.string()
        .required("El usuario es requerido")
        .min(3, "El usuario debe tener al menos 3 caracteres")
        .max(20, "El usuario no puede exceder los 20 caracteres")
        .matches(/^[a-zA-Z0-9_.-]+$/, "El usuario solo puede contener letras, números, guiones, puntos y guiones bajos"),
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