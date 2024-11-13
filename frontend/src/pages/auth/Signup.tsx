import { Link, useNavigate } from 'react-router-dom'
import Fitness from '../../assets/images/gym.jpg'
import { useState } from 'react'
import apiHandler from '../../services/api'

function Signup() {

    const navigate = useNavigate()

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [errors, setErrors] : any = useState({})

    const validateForm = () => {
        let formErrors:any = {}
        if (!fullName.trim()) formErrors.fullName = 'Full Name is required'
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) formErrors.email = 'Invalid email format'
        if (password.length < 6) formErrors.password = 'Password must be at least 6 characters'
        if (!dob) formErrors.dob = 'Date of Birth is required'
        if (!gender) formErrors.gender = 'Gender is required'
        if (weight <= 0) formErrors.weight = 'Weight must be a positive number'
        if (height <= 0) formErrors.height = 'Height must be a positive number'
        
        setErrors(formErrors)
        return Object.keys(formErrors).length === 0
    }

    const handleSignup = async () => {
        if (!validateForm()) return

        const formData = new FormData()
        formData.append("full_name", fullName)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("date_of_birth", dob)
        formData.append("gender", gender)
        formData.append("weight", weight.toString())
        formData.append("height", height.toString())

        const response = await apiHandler(formData, 'user', 'post')
        if (response && response.success === true) navigate('/login')
    }

    const inputButtonStyle = " w-4/6 bg-container border-b-2 border-dimtext py-2 focus:outline-none placeholder:text-dimtext mt-5 "
  
    return (
        <>
            <div className= " w-full h-screen flex items-center justify-center text-text py-10 overflow-hidden  ">

                <div className= " animate-slideInTop bg-container w-6/12 h-full rounded-2xl flex items-center justify-center overflow-hidden ">
                    <div className=" bg-dark w-3/6 h-full relative opacity-80 "><img src={Fitness} alt="Fitness" className=" w-full h-full object-cover " /></div>
                    <div className="flex flex-col w-3/6 justify-center items-center">
                        <h1 className='text-header'>Signup</h1>
                        <input onChange={(e) => setFullName(e.target.value)} className={inputButtonStyle + " mt-8 "} type="text" placeholder="Full Name" required/>
                        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

                        <input onChange={(e) => setEmail(e.target.value)} className={inputButtonStyle} type="email" placeholder="Email" required/>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                        <input onChange={(e) => setPassword(e.target.value)} className={inputButtonStyle} type="password" placeholder="Password" required/>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                        <input onChange={(e) => setDob(e.target.value)} className={inputButtonStyle + " text-dimtext "} type="date" placeholder="Date of Birth" required/>
                        {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}

                        <div className='w-4/6 flex items-center mt-8 gap-6 text-dimtext'>
                            <div className="flex gap-2 items-center">
                                <p>Male:</p>
                                <input onChange={(e) => setGender(e.target.value)} type="radio" name="gender" value="Male" className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"/>
                            </div>
                            <div className="flex gap-2 items-center">
                                <p>Female:</p>
                                <input onChange={(e) => setGender(e.target.value)} type="radio" name="gender" value="Female" className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"/>
                            </div>
                        </div>
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

                        <div className='w-4/6 flex items-center mt-8 justify-between'>
                            <div className="flex">
                                <p className='text-dimtext mr-3'>Weight:</p>
                                <input onChange={(e) => setWeight(parseFloat(e.target.value))} className="w-full focus:outline-none bg-container border-2 rounded-lg pl-3 border-dimtext placeholder:text-dimtext" type="number" placeholder=""/>
                            </div>
                            <div className="ml-4 flex">
                                <p className='text-dimtext mr-3'>Height:</p>
                                <input onChange={(e) => setHeight(parseFloat(e.target.value))} className="w-full focus:outline-none bg-container border-2 rounded-lg pl-3 border-dimtext placeholder:text-dimtext" type="number" placeholder=""/>
                            </div>
                        </div>
                        {errors.weight && <p className="text-red-500 text-sm positio">{errors.weight}</p>}
                        {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}

                        <div onClick={handleSignup} className="w-4/6 py-2 flex justify-center rounded-full bg-highlight text-dark mt-14 cursor-pointer">Signup</div>
                        <p className='my-4 text-dimtext'>Or</p>
                        <div className="w-4/6 py-2 flex justify-center rounded-full bg-container border-2 border-highlight text-highlight cursor-pointer">
                            <Link to="/login">Login</Link>
                        </div>
                    </div>
                    
                </div>

            </div>
        </>
    )
  }
  
  export default Signup