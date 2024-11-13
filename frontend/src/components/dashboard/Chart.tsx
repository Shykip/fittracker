import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function Chart({activityRecord}: any) {

    function getLastSunday() {
        const today = new Date()
        const day = today.getDay()
        const lastSunday = new Date(today)
        lastSunday.setDate(today.getDate() - day)
        return lastSunday;
    }

    function getLastWeekDates() {
        const lastSunday = getLastSunday()
        return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(lastSunday)
        date.setDate(lastSunday.getDate() + i)
        return date.toISOString().split('T')[0]
        });
    }
    
    function getWeeklyCalories(data: any) {
        const lastWeekDates = getLastWeekDates();
        const lastWeekCalories = data.reduce((acc: any, record: any) => {
          const recordDate = record.activity_date
      
          if (lastWeekDates.includes(recordDate)) {
            acc[recordDate] = (acc[recordDate] || 0) + parseInt(record.calories_burnt, 10)
          }
          return acc
        }, {})

        return lastWeekDates.map(date => lastWeekCalories[date] || 0)
      }

    const lineChartData = {
        labels: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
        datasets: [
            {
                label: "Calorie Burnt",
                data: getWeeklyCalories(activityRecord),
                borderColor: "#F3FF47"
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false
    }

    return (
        <Line options={options} data={lineChartData} />
    )
}

export default Chart