import Chart from "./Chart";

function Dashboard({recommendations, activityRecord, onTabChange}: any) {

    console.log(recommendations)

    const recContainer = {
        topDiv: " w-60 h-44 bg-container rounded-2xl p-6 flex flex-col gap-1 cursor-pointer ",
        activeTopDiv: " w-60 h-44 bg-highlight rounded-2xl p-6 flex flex-col gap-1 cursor-pointer ",
        smallP: " text-normal ",
        activeSmallP: " text-normal text-dark ",
        bigP: " text-header font-bold ",
        activeBigP: " text-header font-bold text-dark ",
    }

    return (    
    <>
    
    <div className=' w-10/12 flex justify-between pb-10 gap-8 '>

        <div className=" flex flex-col gap-8 w-9/12 h-full ">

            <div className=" flex flex-col gap-6 h-2/6 w-full ">
                <h1 className=" text-title text-text font-bold ">Daily Exercise</h1>
                <div className=" flex gap-6 w-full">
                    {recommendations && (
                        <div className={recContainer.activeTopDiv}>
                            <p className={recContainer.activeSmallP}>30 min</p>
                            <p className={recContainer.activeBigP}>{recommendations[0].activity_name}</p>
                        </div>
                    )}
                    

                    {recommendations && recommendations.slice(1,4).map((activity: any) => (
                        <div key={activity.id} className={recContainer.topDiv}>
                            <p className={recContainer.smallP}>30 min</p>
                            <p className={recContainer.bigP}>{activity.activity_name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className=" flex flex-col gap-6 h-4/6 w-full  ">
                <h1 className=" text-title text-text font-bold ">Calories Burnt This Week</h1>
                <div className=" h-full ">
                    { activityRecord && (<Chart activityRecord={activityRecord}/>) }
                </div>
                
            </div>

        </div>

        <div className=" animate-slideInLeft bg-container h-full w-3/12 rounded-2xl p-10 text-white flex flex-col justify-between gap-8 ">
            <h1 className=" text-header font-bold ">Recent Activity</h1>

            {activityRecord && (

                <div className="flex flex-col gap-6 h-full overflow-y-auto">
                    {activityRecord.slice(0, 4).map((record: any) => {
                        return (
                            <div key={record.id} className="w-full h-24 p-6 bg-container border-2 border-white border-opacity-10 text-text rounded-2xl gap-2 flex cursor-pointer items-center justify-between">

                                <div className="w-3/6 flex flex-col justify-center items-center border-r-2 border-dimtext border-opacity-50">
                                    <p className="text-text text-center">{record.duration_min} min</p>
                                    <p className="text-text font-bold text-center">{record.activity.activity_name}</p>
                                </div>

                                <div className="text-text text-center w-3/6">
                                <p className="text-text font-bold">{Math.floor(record.calories_burnt)} Cal<br/>Burnt</p>
                                </div>
                                
                            </div>
                        );
                    })}
                </div>

            )}

            
            

            <div onClick={() => {onTabChange(1)}} className=" bg-highlight cursor-pointer text-dark rounded-full flex justify-center items-center p-3 ">View Full Report</div>
        </div>
    </div>
    
    </>
    )
}

export default Dashboard