// src/CalorieComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CalorieComponent() {
    const [Calories, setCalories] = useState([]);
    const [description, setDescription] = useState('');
    const [totalCalories, setTotalCalories] = useState('');
    const [count, setCount] = useState('');

    useEffect(() => {
        fetchCalorieData();
        fetchTotalCalories();
    }, []);
    const fetchTotalCalories = async () => {
        try {
            const response = await axios.get('http://13.233.58.169:8090/Calories/total');
            setTotalCalories(response.data);
        } catch (error) {
            console.error('Error fetching Total Calories', error);
        }
    };
    const fetchCalorieData = async () => {
        try {
            const response = await axios.get('http://13.233.58.169:8090/Calories');
            setCalories(response.data);
        } catch (error) {
            console.error('Error fetching Calorie Data', error);
        }
    };

    const addCalorieData = async () => {
        try {
            const response = await axios.post('http://13.233.58.169:8090/Calories', {
                description,
                count: parseFloat(count),
            });
            setCalories([...Calories, response.data]);
            setDescription('');
            setCount('');
            fetchTotalCalories();
        } catch (error) {
            console.error('Error adding Calorie Data', error);
        }
    };

    return (
        <div>
            <h1>Calorie Tracker</h1>
            <ul>
                {Calories.map(Calorie => (
                    <li key={Calorie.id}>
                        {Calorie.description}: {Calorie.count}
                    </li>
                ))}
            </ul>
            <h3>Total Calories Consumed</h3> <p>{totalCalories}</p>
            <h2>Add Calorie</h2>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <input
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                placeholder="Count"
            />
            <button onClick={addCalorieData}>Add</button>
        </div>
    );
}

export default CalorieComponent;
