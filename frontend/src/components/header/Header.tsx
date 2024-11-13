import { GoSearch } from "react-icons/go"
import { GoBell } from "react-icons/go"
import { GoMail } from "react-icons/go"
import Profile from "../../assets/images/chico.jpg"

function Header({userData, setProfileTab}: any) {

    return (    
    <>
    
    <div className=" flex w-full justify-between h-1/7 items-center text-text ">

        <div className=" flex w-8/12 items-center ">
            <h1 className=" w-64 text-header font-bold text-highlight hover:cursor-pointer flex items-center justify-center rounded-lg gap-6 cursor-pointer ">
                FIT TRACKER
            </h1>

            <div className=" flex items-center bg-container w-5/12 py-3 px-6 rounded-full ml-28 hover:cursor-text ">
            <div className=" "><GoSearch size="28" color="#777777"/></div>
                <p className=" text-normal text-dimtext ml-4 ">Search</p>
            </div>
        </div>


        <div className=" flex items-center w-4/12 justify-end ">
            <div className=" ml-2 hover:cursor-pointer "><GoBell size="28"/></div>
            <div className=" ml-10 hover:cursor-pointer "><GoMail size="28"/></div>
            <p onClick={() => {setProfileTab(true)}} className=" ml-14 text-normal hover:cursor-pointer ">{userData.full_name}</p>
            <div onClick={() => {setProfileTab(true)}}  className=" ml-6 rounded-full w-12 h-12 bg-highlight hover:cursor-pointer ">
                <img src={Profile} alt="profile" className=" rounded-full object-cover " />
            </div>
        </div>

    </div>
    
    </>
    )
}

export default Header