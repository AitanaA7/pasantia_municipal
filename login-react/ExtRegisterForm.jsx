import { useState } from 'react';

function ExtRegisterForm() {
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

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  const handleGenderChange = e => {
    setForm(prev => ({ ...prev, gender: e.target.value }));
  }

  const handleSubmit = e => {
    e.preventDefault();
  }

    return (
        <form id="full-register-form" onSubmit={handleSubmit}> 
            <h1>Registration Form</h1>
            <div className='input-box'>
                <input 
                    type="text" 
                    name="firstName" 
                    placeholder='First Name' 
                    autoComplete='first-name'
                    required
                    value={form.firstName} 
                    onChange={handleChange} 
                />
                <i className='bx bxs-user'></i>
            </div>
            <div className='input-box'>
                <input 
                    type="text" 
                    name="lastName" 
                    placeholder='Last Name' 
                    autoComplete='last-name'
                    required
                    value={form.lastName} 
                    onChange={handleChange} 
                />
                <i className='bx bxs-user'></i>
            </div>
            <div className='input-box'>
                <input 
                    type="email" 
                    name="email" 
                    placeholder='Email: example@email.com' 
                    autoComplete="email"
                    required
                    value={form.email} 
                    onChange={handleChange} 
                />
                <i className='bx bxs-envelope'></i>
            </div>
            <label htmlFor="phone">Phone Number:</label>
            <div className='input-box'>
                <input 
                    type="tel" 
                    name="phone" 
                    placeholder="+54-3489-123456" 
                    autoComplete="tel"
                    required
                    value={form.phone} 
                    onChange={handleChange} 
                />
                <i className='bx bxs-phone'></i>
            </div>
            <div className='input-box'>
                <label htmlFor="dob">Date of Birth:</label>
                <input 
                    type="date" 
                    name="dob" 
                    required
                    value={form.dob} 
                    onChange={handleChange} 
                />
            </div>
            <div className="input-box radio-box">
                <h3>Gender:</h3>
                <div className="radio-group">
                    <label>
                        <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={form.gender === "male"}
                        onChange={handleGenderChange}
                        required
                        />
                        Male
                    </label>
                    <label>
                        <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={form.gender === "female"}
                        onChange={handleGenderChange}
                        required
                        />
                        Female
                    </label>
                    <label>
                        <input
                        type="radio"
                        name="gender"
                        value="not"
                        checked={form.gender === "not"}
                        onChange={handleGenderChange}
                        required
                        />
                        Prefer not to say
                    </label>
                </div>
            </div>
            <div className='input-box'>
                <input 
                    type="text" 
                    name="address" 
                    placeholder='Address' 
                    autoComplete='street-address'
                    required
                    value={form.address} 
                    onChange={handleChange} 
                />
                <i className='bx bxs-home'></i>
            </div>
            <div className='input-box'>
                <input 
                    type="text" 
                    name="country" 
                    placeholder='Country' 
                    autoComplete='country'
                    required
                    value={form.country} 
                    onChange={handleChange} 
                />
                <i className='bx bx-world'></i>
            </div>
            <div className='input-box'>
                <input 
                    type="text" 
                    name="zip" 
                    placeholder="Postal / Zip Code"
                    required
                    value={form.zip} 
                    onChange={handleChange} 
                />
                <i className='bx bxs-envelope'></i>
            </div>
            <button type="submit" className='btn'>Register now</button>
        </form>
    )
}

export default ExtRegisterForm