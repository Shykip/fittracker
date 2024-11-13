
import { useState, useEffect } from 'react'
import apiHandler from '../../services/api'

function Profile({setProfileTab, userData}: any) {

    const [fullName, setFullName] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [errors, setErrors] : any = useState({})

    useEffect(() => {
        if (userData) {
            setFullName(userData.full_name || '');
            setDob(userData.date_of_birth || '');
            setGender(userData.gender || '');
            setWeight(userData.weight || 0);
            setHeight(userData.height || 0);
        }
    }, [userData]);

    const validateForm = () => {
        let formErrors:any = {}
        if (!fullName.trim()) formErrors.fullName = 'Full Name is required'
        if (!dob) formErrors.dob = 'Date of Birth is required'
        if (!gender) formErrors.gender = 'Gender is required'
        if (weight <= 0) formErrors.weight = 'Weight must be a positive number'
        if (height <= 0) formErrors.height = 'Height must be a positive number'
        
        setErrors(formErrors)
        return Object.keys(formErrors).length === 0
    }

    const handleEdit = async () => {
        if (!validateForm()) return

        const formData = new FormData()
        formData.append("full_name", fullName)
        formData.append("date_of_birth", dob)
        formData.append("gender", gender)
        formData.append("weight", weight.toString())
        formData.append("height", height.toString())

        const userId = localStorage.getItem('userId');

        const response = await apiHandler(formData, 'user?targetId=' + userId, 'put')
        if (response && response.success === true) setProfileTab(false)
    }

    const inputButtonStyle = " w-4/6 bg-container border-b-2 border-dimtext py-2 focus:outline-none placeholder:text-dimtext mt-5 "
  
    return (
        <>
            <div onClick={() => {setProfileTab(false)}} className= " w-full h-screen flex items-center justify-center text-text py-40 overflow-hidden fixed inset-0 z-10 bg-dark bg-opacity-95  ">

                


                    <div onClick={(e) => e.stopPropagation()} className= " animate-slideInTop bg-container w-4/12 h-full rounded-2xl flex items-center justify-center overflow-hidden ">
                        <div className="flex flex-col w-full justify-center items-center">
                            <h1 className='text-header'>Profile</h1>
                            <input onChange={(e) => setFullName(e.target.value)} className={inputButtonStyle + " mt-8 "} type="text" placeholder="Full Name" value={fullName} required/>
                            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

                            <input onChange={(e) => setDob(e.target.value)} className={inputButtonStyle + " text-dimtext "} type="date" placeholder="Date of Birth" value={dob} required/>
                            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}

                            <div className='w-4/6 flex items-center mt-8 gap-6 text-dimtext'>
                                <div className="flex gap-2 items-center">
                                    <p>Male:</p>
                                    <input onChange={(e) => setGender(e.target.value)} type="radio" name="gender" value="Male" checked={gender === "Male"} className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"/>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <p>Female:</p>
                                    <input onChange={(e) => setGender(e.target.value)} type="radio" name="gender" value="Female" checked={gender === "Female"} className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"/>
                                </div>
                            </div>
                            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

                            <div className='w-4/6 flex items-center mt-8 justify-between'>
                                <div className="flex">
                                    <p className='text-dimtext mr-3'>Weight:</p>
                                    <input onChange={(e) => setWeight(parseFloat(e.target.value))} className="w-full focus:outline-none bg-container border-2 rounded-lg pl-3 border-dimtext placeholder:text-dimtext" type="number" value={weight} placeholder=""/>
                                </div>
                                <div className="ml-4 flex">
                                    <p className='text-dimtext mr-3'>Height:</p>
                                    <input onChange={(e) => setHeight(parseFloat(e.target.value))} className="w-full focus:outline-none bg-container border-2 rounded-lg pl-3 border-dimtext placeholder:text-dimtext" type="number" value={height} placeholder=""/>
                                </div>
                            </div>
                            {errors.weight && <p className="text-red-500 text-sm positio">{errors.weight}</p>}
                            {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}

                            <div onClick={handleEdit} className="w-4/6 py-2 flex justify-center rounded-full bg-highlight text-dark mt-14 cursor-pointer">Save</div>
                        </div>

                    </div>
                    
                

                

            </div>
        </>
    )
  }
  
  export default Profile