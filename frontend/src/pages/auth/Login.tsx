import { Link, useNavigate } from 'react-router-dom'
import Fitness from '../../assets/images/gym.jpg'
import { useState } from 'react'
import apiHandler from '../../services/api'

function Login() {
    
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {

        const formdata = new FormData()
        formdata.append('email', email)
        formdata.append('password', password)
        
        const response = await apiHandler(formdata, 'login', 'post')
        if (response && response.success === true) {
            localStorage.setItem('userId', response.data.userId)
            navigate('/home')
        }
    }

    const inputButtonStyle = " w-4/6 bg-container border-b-2 border-dimtext py-2 focus:outline-none placeholder:text-dimtext mt-5 "
  
    return (
        <>
            <div className= " w-full h-screen flex items-center justify-center text-text overflow-hidden ">
                <div className= " animate-slideInTop bg-container w-6/12 h-3/6 rounded-2xl flex items-center justify-center overflow-hidden ">
                    <div className=" bg-highlight w-3/6 h-full opacity-80  "><img src={Fitness} alt="Fitness" className=" w-full h-full object-cover " /></div>
                    <div className=" flex flex-col w-3/6 justify-center items-center  ">
                        <h1 className=' text-header ' >Login</h1>
                        <input onChange={(e) => setEmail(e.target.value)} className={inputButtonStyle + " mt-8 "} type="email" placeholder="Email" required/>
                        <input onChange={(e) => setPassword(e.target.value)} className={inputButtonStyle} type="password" placeholder="Password" required/>
                        <p className= " hover:text-link cursor-pointer text-dimtext mt-8 underline w-4/6 ">
                            <Link to="/signup">Don't have an account?</Link>
                        </p>
                        <div onClick={handleLogin} className=" w-4/6 py-2 flex justify-center rounded-full bg-highlight text-dark mt-14 cursor-pointer ">Login</div>
                    </div>
                    
                </div>
            </div>
        </>
    )
  }
  
  export default Login