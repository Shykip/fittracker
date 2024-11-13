import { GoBrowser } from "react-icons/go"
import { GoNote } from "react-icons/go"
import { GoPeople } from "react-icons/go"
import { GoQuestion } from "react-icons/go"
import { useNavigate } from "react-router-dom"

function NavBar({onTabChange, activeTab}: any) {

    const navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.clear()
        navigate('/login')
    }

    return (    
    <>

    
    <div className=" flex flex-col h-full justify-between text-normal pb-10 ">
        <div className=" flex flex-col gap-4 ">
            <h1 onClick={() => {onTabChange(0)}} className={`w-64 py-4 pl-6 flex items-center rounded-lg gap-6 cursor-pointer ${activeTab === 0 ? "bg-container" : ""}`}><GoBrowser size="28"/>Dashboard</h1>
            <h1 onClick={() => {onTabChange(1)}} className={`w-64 py-4 pl-6 flex items-center rounded-lg gap-6 cursor-pointer ${activeTab === 1 ? "bg-container" : ""}`}><GoNote size="28"/>Activites</h1>
            <h1 onClick={() => {onTabChange(2)}} className={`w-64 py-4 pl-6 flex items-center rounded-lg gap-6 cursor-pointer ${activeTab === 2 ? "bg-container" : ""}`}><GoPeople size="28"/>Groups</h1>
            <h1 onClick={() => {onTabChange(3)}} className={`w-64 py-4 pl-6 flex items-center rounded-lg gap-6 cursor-pointer ${activeTab === 3 ? "bg-container" : ""}`}><GoQuestion size="28"/>Help</h1>
        </div>
        
        <div className=" flex flex-col gap-6 ">
            <h1 className=" cursor-pointer w-64 pl-6 ">Settings</h1>
            <h1 onClick={handleLogout} className=" text-link cursor-pointer w-64 pl-6 ">Logout</h1>
        </div>
    </div>
    
    </>
    )
}

export default NavBar