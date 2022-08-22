import React, { useState, useEffect } from 'react'
import './index.css'

const App = () => {

  const [activities, setActivities] = useState([])
  const [name, setName] = useState('')
  const [time, setTime] = useState('')

  const addActivity = async (event) => {
    event.preventDefault();
    
    const newActivity = {name, time}
    
   const response = await fetch('/api/activity', {
    method: 'POST',
    body: JSON.stringify(newActivity),
    headers: {
      'Content-Type': 'application/json'
    }
   })

   const json = await response.json();

   setActivities(json)
    
    event.target.activity.value = "";
    event.target.time.value = ""; 
    window.location.reload(); 
    };

    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch('/api/activities')
        const data = await result.json();
        console.log(activities)
        setActivities(data)
      };
      fetchData();
    }, [])
    

  return (
    <div className="app">
      <header className="app-header">
        <h1>Productivity Tracker</h1>
        <form onSubmit={addActivity}>
          <div>
            <label htmlFor='activity'>Activity:</label>
            <input 
             type="text"
             id="activity"
             name="activity"
             autoComplete='off'
             value={name}
             onChange = {(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='time'>Time taken:</label>
            <input 
              type='text'
              id='time'
              name='time'
              autoComplete='off'
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <button type="submit" onSubmit={addActivity}>Add</button>
        </form>
      </header>
      <main className="app-main">
        <h2>Today</h2>
        {activities && activities.length > 0 ? (
          <ol>
            {activities.map(activity => (
              <li key={activity._id} >
                {activity.name} - {activity.time}
              </li>
            ))}
          </ol>
        ) : (
          <p>No activities</p>
        )}
      </main>
    </div>
  )
}

export default App