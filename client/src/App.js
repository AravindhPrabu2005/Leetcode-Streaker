import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
    const [streak, setStreak] = useState(null)
    const [maxStreak, setMaxStreak] = useState(null)

    const fetchStreak = async () => {
        const res = await axios.get(`http://localhost:5000/api/streak/aravindhprabu2005`)
        setStreak(res.data.currentStreak)
        setMaxStreak(res.data.maxStreak)
    }

    useEffect(() => {
        fetchStreak()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-4">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">Hi Aravindh! 🚀</h1>
            <div className="bg-white p-8 rounded-2xl shadow-lg space-y-4">
                {streak !== null && maxStreak !== null ? (
                    <>
                        <div className="text-2xl font-semibold text-gray-700">
                            Current Streak: <span className="text-green-600">{streak} days</span>
                        </div>
                        <div className="text-2xl font-semibold text-gray-700">
                            Max Streak: <span className="text-purple-600">{maxStreak} days</span>
                        </div>
                    </>
                ) : (
                    <div className="text-gray-500">Loading your streak data...</div>
                )}
            </div>
        </div>
    )
}

export default App
