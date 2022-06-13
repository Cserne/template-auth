import './App.css'
import React from 'react';
import NumberPresenter from './components/NumberPresenter';
import NumberModifier from './components/NumberModifier';
import { useCounter } from './components/CounterProvider';

const App = () => {
    const {value, increment, decrement} = useCounter();

  return (
        <div className='App'>
            <p>Change the value</p>
            <button onClick={increment}>+</button>
            <p>value: {value}</p>
            <button onClick={decrement}>-</button>

            <NumberPresenter />
            <NumberModifier />
        </div>
  )
}

export default App