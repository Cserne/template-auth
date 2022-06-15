import React from 'react'
import NumberPresenter from './NumberPresenter';
import { useCounter } from '../providers/counter';

const NumberModifier = () => {
    const { increment, decrement } = useCounter();
  return (
    <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <NumberPresenter />
    </div>
  )
}

export default NumberModifier