const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/streak/:username', async (req, res) => {
    const { username } = req.params
    const query = `
    query userCalendar($username: String!) {
        matchedUser(username: $username) {
            userCalendar {
                submissionCalendar
            }
        }
    }
    `
    const variables = { username }
    try {
        const response = await axios.post('https://leetcode.com/graphql/', {
            query,
            variables
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const calendar = JSON.parse(response.data.data.matchedUser.userCalendar.submissionCalendar)

        const dates = Object.keys(calendar).map(timestamp => {
            const date = new Date(parseInt(timestamp) * 1000)
            return date.toISOString().split('T')[0]
        }).sort()

        const dateSet = new Set(dates)

        let maxStreak = 0
        let currentStreak = 0
        let tempStreak = 0

        const today = new Date()
        let day = new Date(today)

        while (true) {
            const dateStr = day.toISOString().split('T')[0]
            if (dateSet.has(dateStr)) {
                tempStreak++
            } else {
                break
            }
            day.setDate(day.getDate() - 1)
        }
        currentStreak = tempStreak

        tempStreak = 0
        const sortedDates = [...dateSet].sort()

        for (let i = 0; i < sortedDates.length; i++) {
            tempStreak = 1
            let j = i
            while (j + 1 < sortedDates.length) {
                const currDate = new Date(sortedDates[j])
                const nextDate = new Date(sortedDates[j + 1])
                const diff = (nextDate - currDate) / (1000 * 60 * 60 * 24)
                if (diff === 1) {
                    tempStreak++
                    j++
                } else {
                    break
                }
            }
            if (tempStreak > maxStreak) {
                maxStreak = tempStreak
            }
        }

        res.json({ currentStreak, maxStreak })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error })
    }
})

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})
