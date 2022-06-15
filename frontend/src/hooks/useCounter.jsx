import { useState, useEffect } from 'react';

export const useCounter = (componentName) => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        localStorage.setItem("counter" + componentName, counter)
    }, [counter])
    
    useEffect(() => {
        const localCounter = parseInt(localStorage.getItem("counter" + componentName));
        setCounter(localCounter || 0);
    }, [])

    const increment = () => {
      setCounter(counter + 1);
    };
    
    const decrement = () => {
      setCounter(counter - 1);
    }; 

    return {counter, increment, decrement}
}