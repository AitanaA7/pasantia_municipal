import { useState } from 'react';
import './ExtRegForm.css'

function ExtRegForm({ onRegisterComplete}) {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        address: "",
        country: "",
        zip: ""
    })

    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" })); 

    }

    const handleGenderChange = e => {
        setForm(prev => ({ ...prev, gender: e.target.value }));
        setErrors(prev => ({ ...prev, gender: "" }));
    }

    const validate = () => {
        const newErrors = {};
        if (!form.firstName.trim()) newErrors.firstName = "El nombre es obligatorio.";
        if (!form.lastName.trim()) newErrors.lastName = "El apellido es obligatorio.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email.trim()) newErrors.email = "El correo es obligatorio.";
        else if (!emailRegex.test(form.email)) newErrors.email = "El formato del correo no es válido.";

        const phoneRegex = /^\+?\d{1,4}[-\s]?\d{2,4}[-\s]?\d{4,}$/;
        if (!form.phone.trim()) newErrors.phone = "El teléfono es obligatorio.";
        else if (!phoneRegex.test(form.phone)) newErrors.phone = "El formato del teléfono no es válido.";

        if (!form.dob) newErrors.dob = "La fecha de nacimiento es obligatoria.";

        if (!form.gender) newErrors.gender = "El género es obligatorio.";

        if (!form.address.trim()) newErrors.address = "La dirección es obligatoria.";
        if (!form.country.trim()) newErrors.country = "El país es obligatorio.";
        if (!form.zip.trim()) newErrors.zip = "El código postal es obligatorio.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!validate()) return;
        if (onRegisterComplete) onRegisterComplete();
    }

    return (
            <form id="full-register-form" onSubmit={handleSubmit}> 
                <h1 className='text-4xl text-center font-bold text-blue-900 mb-4'>Registration Form</h1>
                <div className='input-field'>
                    <input 
                        type="text" 
                        name="firstName" 
                        placeholder='First Name' 
                        autoComplete='given-name'
                        required
                        value={form.firstName} 
                        onChange={handleChange} 
                    />
                    <i className='bx bxs-user icon'></i>
                    {/* {errors.firstName && <div className="field-error">{errors.firstName}</div>} */}
                </div>
                {errors.firstName && (
                <p className="mt-1 mb-1 text-sm text-red-600 text-center">{errors.firstName}</p>
                )}
                <div className='input-field'>
                    <input 
                        type="text" 
                        name="lastName" 
                        placeholder='Last Name' 
                        autoComplete='family-name'
                        required
                        value={form.lastName} 
                        onChange={handleChange} 
                    />
                    <i className='bx bxs-user icon'></i>
                    {/* {errors.lastName && <div className="field-error">{errors.lastName}</div>} */}
                </div>
                {errors.lastName && (
                <p className="mt-1 mb-1 text-sm text-red-600 text-center">{errors.lastName}</p>
                )}
                <div className='input-field'>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder='Email: example@email.com' 
                        autoComplete="email"
                        required
                        value={form.email} 
                        onChange={handleChange} 
                    />
                    <i className='bx bxs-envelope icon'></i>
                    {/* {errors.email && <div className="field-error">{errors.email}</div>} */}
                </div>
                {errors.email && (
                <p className="mt-1 mb-1 text-sm text-red-600 text-center">{errors.email}</p>
                )}
                <label htmlFor="phone" className='text-base font-semibold mb-2'>Phone Number:</label>
                <div className='input-field mt-1'>
                    <input 
                        type="tel" 
                        name="phone" 
                        placeholder="+54-3489-123456" 
                        autoComplete="tel"
                        required
                        value={form.phone} 
                        onChange={handleChange} 
                    />
                    <i className='bx bxs-phone icon'></i>
                    {/* {errors.phone && <div className="field-error">{errors.phone}</div>} */}
                </div>
                {errors.phone && (
                <p className="mt-1 mb-1 text-sm text-red-600 text-center">{errors.phone}</p>
                )}
                <label htmlFor="dob" className='text-base font-semibold mb-2'>Date of Birth:</label>
                <div className='input-field mt-1'>
                    <input 
                        type="date" 
                        name="dob" 
                        autoComplete='bday'
                        required
                        className="font-medium text-gray-600 rounded-md border-none focus:outline-none 
                        text-base flex items-center relative w-full border"
                        value={form.dob} 
                        onChange={handleChange} 
                    />
                    {/* {errors.dob && <div className="field-error">{errors.dob}</div>} */}
                </div>
                {errors.dob && (
                <p className="mt-1 mb-1 text-sm text-red-600 text-center">{errors.dob}</p>
                )}
                <div className="input-box radio-box mt-2 pl-0">
                    <h3 className="text-base font-semibold mb-1">Gender:</h3>
                    <div className="flex flex-col gap-1 ml-0">
                        <label className='flex items-center w-fit min-w-0 py-1.5 cursor-pointer rounded-md transition-colors text-[17px] font-normal gap-2 whitespace-nowrap hover:bg-blue-100'>
                            <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={form.gender === "male"}
                            onChange={handleGenderChange}
                            required
                            className="accent-blue-900 bg-white mr-1.5 cursor-pointer"
                            />
                            Male
                        </label>
                        <label className='flex items-center w-fit min-w-0 py-1.5 cursor-pointer rounded-md transition-colors text-[17px] font-normal gap-2 whitespace-nowrap hover:bg-blue-100'>
                            <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={form.gender === "female"}
                            onChange={handleGenderChange}
                            required
                            className="accent-blue-900 bg-white mr-1.5 cursor-pointer"
                            />
                            Female
                        </label>
                        <label className='flex items-center w-fit min-w-0 py-1.5 cursor-pointer rounded-md transition-colors text-[17px] font-normal gap-2 whitespace-nowrap hover:bg-blue-100'>
                            <input
                            type="radio"
                            name="gender"
                            value="not"
                            checked={form.gender === "not"}
                            onChange={handleGenderChange}
                            required
                            className="accent-blue-900 bg-white mr-1.5 cursor-pointer"
                            />
                            Prefer not to say
                        </label>
                    </div>
                    {/* {errors.gender && <div className="field-error">{errors.gender}</div>} */}
                </div>
                {errors.gender && (
                <p className="mt-1 mb-1 text-sm text-red-600 text-center">{errors.gender}</p>
                )}
                <div className='input-field mt-2'>
                    <input 
                        type="text" 
                        name="address" 
                        placeholder='Address' 
                        autoComplete='street-address'
                        required
                        value={form.address} 
                        onChange={handleChange} 
                    />
                    <i className='bx bxs-home icon'></i>
                    {/* {errors.address && <div className="field-error">{errors.address}</div>} */}
                </div>
                {errors.address && (
                <p className="mt-1 mb-1 text-sm text-red-600 text-center">{errors.address}</p>
                )}
                <div className='input-field'>
                    <input 
                        type="text" 
                        name="country" 
                        placeholder='Country' 
                        autoComplete='country-name'
                        required
                        value={form.country} 
                        onChange={handleChange} 
                    />
                    <i className='bx bx-world icon'></i>
                    {/* {errors.country && <div className="field-error">{errors.country}</div>} */}
                </div>
                {errors.country && (
                <p className="mt-1 mb-1 text-sm text-red-600 text-center">{errors.country}</p>
                )}
                <div className='input-field'>
                    <input 
                        type="text" 
                        name="zip" 
                        placeholder="Postal / Zip Code"
                        autoComplete='postal-code'
                        required
                        value={form.zip} 
                        onChange={handleChange} 
                    />
                    <i className='bx bxs-envelope icon'></i>
                    {/* {errors.zip && <div className="field-error">{errors.zip}</div>} */}
                </div>
                {errors.zip && (
                <p className="mt-1 mb-1 text-sm text-red-600 text-center">{errors.zip}</p>
                )}
                <button type="submit" className='button-primary'>Register now</button>
            </form>
            
    )
}

export default ExtRegForm;