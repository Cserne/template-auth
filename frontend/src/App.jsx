import './App.css'
import React from 'react';
// import NumberPresenter from './components/NumberPresenter';
// import NumberModifier from './components/NumberModifier';
// import { useCounter } from './components/CounterProvider';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Callback from './pages/Callback';
import Protected from './components/Protected';
import Register from './pages/Register';

const App = () => {
    // const {value, increment, decrement} = useCounter();

  return (
    <div className='App'>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/profile' element={(
            <Protected key={'1'}>
              <Profile/>
            </Protected>
          )}/>
          <Route path='/callback' element={<Callback/>}/>
          <Route path='/register' element={(
            <Protected key={'2'}>
              <Register/>
            </Protected>
          )}/>
        </Routes>
        {/* <p>Change the value</p>
        <button onClick={increment}>+</button>
        <p>value: {value}</p>
        <button onClick={decrement}>-</button>

        <NumberPresenter />
        <NumberModifier /> */}
    </div>
  )
}

export default App