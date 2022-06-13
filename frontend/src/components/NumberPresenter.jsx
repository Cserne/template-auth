import React from 'react';
import { useCounter } from './CounterProvider';


const NumberPresenter = () => {
    const {value} = useCounter();

  return (
    <>
        <div>Value from parameter (numberpresenter): {value}</div>
    </>
  )
}

export default NumberPresenter