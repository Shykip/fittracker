import Fitness from '../../assets/images/login.jpg'
import apiHandler from '../../services/api'
import deleteIconBlack from '../../assets/images/delete-black.png'
import deleteIconWhite from '../../assets/images/delete-white.png'
import { useState, useEffect } from 'react'

function Group({activities, activityRecord, updateActivitesRecord}: any) {

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

    const handleRecordDelete = async (id: string) => {
        const formdata = new FormData()
        const response = await apiHandler(formdata, 'fitness_record?targetId='+id, 'delete')
        if (response && response.success === true) {
            setAddActivityTab(false)
            updateActivitesRecord()
        }
    }

    useEffect(() => {
    }, [])

    return (    
    <>


    <div className=" bg-background w-10/12 flex pb-10 gap-8 flex-col ">

        <h1 className=" text-title font-bold ">Group</h1>
        <p className=" text-normal text-dimtext w-4/12 border-b-2 border-dimtext border-opacity-30 pb-2 ">YOUR GROUP</p>


        
    </div>
    
    </>
    )
}

export default Group