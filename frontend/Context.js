import { react, createContext, useState } from 'react';

const AppContext = createContext();
const AppProvider = ({ children }) => {
    const [exercisesCompleted, setExercisesCompleted] = useState([]);
    const [workout, setWorkout] = useState(0);
    const [calories, setCalories] = useState(0);
    const [minutes, setMinutes] = useState(0);

    const value = {
        exercisesCompleted,
        setExercisesCompleted,
        workout,
        setWorkout,
       calories,
        setCalories,
        minutes,
        setMinutes,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
} 

export { AppContext, AppProvider };