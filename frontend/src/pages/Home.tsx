import Header from '../components/header/Header';
import NavBar from '../components/navbar/Navbar';
import apiHandler from '../services/api';
import { useEffect, useState } from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';
import Activites from '../components/activites/Activites';
import Group from '../components/group/Group';
import Profile from '../components/profile/Profile';

function Home() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [activities, setActivities] = useState(null);
    const [recommendations, setRecommendation] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [activityRecord, setActivityRecord] = useState(null);
    const [profileTab, setProfileTab] = useState(false)

    async function loadData() {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
            return;
        }
        let response = await apiHandler(new FormData(), 'user?targetId=' + userId, 'get');
        if (response && response.success === true) setUserData(response.data);

        response = await apiHandler(new FormData(), 'activity', 'get');
        if (response && response.success === true) setActivities(response.data);

        response = await apiHandler(new FormData(), 'recommendation?userId=' + userId, 'get');
        if (response && response.success === true) setRecommendation(response.data);

        response = await apiHandler(new FormData(), 'fitness_record?userId=' + userId, 'get');
        if (response && response.success === true) setActivityRecord(response.data);
    }

    const onTabChange = (num: number) => {
        setActiveTab(num);
    };

    const updateActivitesRecord = () => {
        loadData();
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        loadData();
    }, [profileTab]);

    return (
        <>

            {profileTab && (

                <Profile setProfileTab={setProfileTab} userData={userData}/>
            )}


            <div className='px-9 h-screen overflow-hidden'>
            {userData && (
                <Header userData={userData} setProfileTab={setProfileTab} />
            )}
            <div className='flex h-6/7 pt-1 justify-between'>
                
                <NavBar onTabChange={onTabChange} activeTab={activeTab} />
                
                {activeTab === 0 && (
                    <Dashboard recommendations={recommendations} activityRecord={activityRecord} onTabChange={onTabChange} />
                )}
                {activeTab === 1 && (
                    <Activites activities={activities} activityRecord={activityRecord} updateActivitesRecord={updateActivitesRecord} />
                )}
                {activeTab === 2 && (
                    <Group updateActivitesRecord={updateActivitesRecord} />
                )}
                {(activeTab === 3) && <h1>404 not found</h1>}
            </div>
            </div>
        
        </>

        
    );
}

export default Home;
