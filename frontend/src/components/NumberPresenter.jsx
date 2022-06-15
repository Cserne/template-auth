import React from 'react';
import { useCounter } from '../providers/counter';


const NumberPresenter = () => {
    const {value} = useCounter();

  return (
    <>
        <div>Value from parameter (numberpresenter): {value}</div>
    </>
  )
}

export default NumberPresenter