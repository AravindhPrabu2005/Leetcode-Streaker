import React from 'react'
function StreakCard({ title, count }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <p className="text-4xl font-bold text-purple-600">{count}</p>
        </div>
    )
}
export default StreakCard
