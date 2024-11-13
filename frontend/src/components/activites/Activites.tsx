import Fitness from '../../assets/images/login.jpg'
import apiHandler from '../../services/api'
import { useState, useEffect } from 'react'

function Activites({activities, activityRecord, updateActivitesRecord}: any) {

    const [addActivityTab, setAddActivityTab] = useState(false)
    const [inputActivityId, setInputActivityId] = useState("")
    const [inputDuration, setInputDuration] = useState("")
    const [dateOfActivity, setDateOfActivity] = useState("")
    

    const inputButtonStyle = " w-4/6 bg-container border-b-2 border-dimtext py-2 focus:outline-none placeholder:text-dimtext mt-5 "

    const onAddAcitivtyBtnClick = () => {
        setAddActivityTab(true)
    }
    const onCloseAddAcitivtyBtnClick = () => {
        setAddActivityTab(false)
    }

    const handleActivityAdd = async () => {

        const userId = localStorage.getItem('userId')


        const formdata = new FormData()
        formdata.append('activity_id', inputActivityId)
        formdata.append('user_id', userId? userId : '')
        formdata.append('activity_date', dateOfActivity)
        formdata.append('duration_min', inputDuration)
        
        const response = await apiHandler(formdata, 'fitness_record', 'post')
        if (response && response.success === true) {
            setAddActivityTab(false)
            updateActivitesRecord()
        }
    }

    useEffect(() => {
    }, [])

    return (    
    <>

    {
    addActivityTab?
        <div onClick={onCloseAddAcitivtyBtnClick} className=" fixed inset-0 w-full h-screen bg-dark bg-opacity-95 flex items-center justify-center text-text z-10">
            <div onClick={(e) => e.stopPropagation()} className= " animate-slideInTop bg-container w-6/12 h-3/6 rounded-2xl flex items-center justify-center overflow-hidden ">
                <div className=" bg-highlight w-3/6 h-full "><img src={Fitness} alt="Fitness" className=" w-full h-full object-cover " /></div>
                <div className=" flex flex-col w-3/6 justify-center items-center  ">
                    <h1 className=' text-header ' >Acitivty</h1>
                    <input onChange={(e) => setDateOfActivity(e.target.value)} className={inputButtonStyle + " text-dimtext "} type="date" placeholder="Date of Birth"/>
                    <select className={inputButtonStyle} onChange={(e) => setInputActivityId(e.target.value)} defaultValue="">
                        <option value="" disabled>Select Activity</option>
                        {activities.map((activity: any) => (
                            <option key={activity.id} value={activity.id}>
                                {activity.activity_name}
                            </option>
                        ))}
                    </select>
                    <input type="number" className={inputButtonStyle} onChange={(e) => setInputDuration(e.target.value)} placeholder="Duration in minutes"/>
                    <div onClick={handleActivityAdd} className=" w-4/6 py-2 flex justify-center rounded-full bg-highlight text-dark mt-14 cursor-pointer ">Add</div>
                </div>
                
            </div>
        </div>
    : ""
    }


    <div className=" bg-background w-10/12 flex pb-10 gap-8 justify-between flex-col ">

        <h1 className=" text-title font-bold ">Activitiy Records</h1>
        <p className=" text-normal text-dimtext w-4/12 border-b-2 border-dimtext border-opacity-30 pb-2 ">THIS YEAR</p>

        <div className=' animate-slideInTop flex flex-col h-4/5 gap-10 '>
            <div className=" flex flex-col gap-6 h-full w-4/6 overflow-y-auto scrollbar-thumb-container scrollbar-track-transparent scrollbar-thin">

                {activityRecord && (

                    <div className=" w-11/12 h-40 bg-highlight rounded-2xl p-6 flex cursor-pointer items-center justify-between ">
                        <p className=" text-subtitle font-bold text-dark text-center border-r-2 border-dark border-opacity-50 w-1/5 h-5/6 items-center flex p-10 ">
                            {new Date(activityRecord[0].activity_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}<br />
                            {new Date(activityRecord[0].activity_date).getFullYear()}
                        </p>
                        <div className=" text-subtitle text-dark text-center w-2/5 border-r-2 border-dark border-opacity-50 ">
                            <p>Calories Burnt</p>
                            <p className="text-title font-bold">{Math.floor(activityRecord[0].calories_burnt)}</p>
                        </div>
                        <div className=" w-2/5 flex flex-col justify-center items-center ">
                            <p className=" text-subtitle text-dark ">{activityRecord[0].duration_min} min</p>
                            <p className=" text-header font-bold text-dark ">{activityRecord[0].activity.activity_name}</p>
                            
                        </div>    
                    </div>
                )}

                {activityRecord && activityRecord.slice(1).map((record: any) => {
                    return (
                        <div key={record.id} className="w-11/12 h-40 bg-container text-text rounded-2xl p-6 flex cursor-pointer items-center justify-between">
                            <p className="text-subtitle font-bold text-center border-r-2 border-dimtext border-opacity-50 w-1/5 h-5/6 items-center flex  p-10 ">
                                {new Date(record.activity_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}<br />
                                {new Date(record.activity_date).getFullYear()}
                            </p>
                            <div className="text-subtitle text-center w-2/5 border-r-2 border-dimtext border-opacity-50">
                                <p>Calories Burnt</p>
                                <p className="text-title font-bold">{Math.floor(record.calories_burnt)}</p>
                            </div>
                            <div className="w-2/5 flex flex-col justify-center items-center">
                                <p className="text-subtitle">{record.duration_min} min</p>
                                <p className="text-header font-bold">{record.activity.activity_name}</p>
                            </div>
                        </div>
                    );
                })}



                
                


            </div>

            <div onClick={onAddAcitivtyBtnClick} className=" bg-highlight cursor-pointer text-dark rounded-full flex justify-center items-center p-3 w-96 ">Add new activity</div>
        </div>

        
    </div>
    
    </>
    )
}

export default Activites