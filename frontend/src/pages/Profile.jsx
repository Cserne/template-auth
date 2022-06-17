import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useCounter } from '../hooks/useCounter';
import { useCounter as useGlobalCounter} from '../providers/counter';
import { useAuth } from '../providers/auth';

const Profile = () => {
  const {counter, increment, decrement} = useCounter("Profile");
  const {value, increment: goUp, decrement: goDown} = useGlobalCounter();
  const {token} = useAuth();
  // const navigate = useNavigate();
  // console.log(token);

  // useEffect(() => {
  //   if (!token) {
  //     navigate('/')
  //   }
  // }, [])
  

  return (
    <>
      <div>Profile</div>
      <p>{token ? 'Logged in' : 'Anonymus'}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <p>Value: {counter}</p>

      <button onClick={goUp}>+</button>
      <button onClick={goDown}>-</button>
      <p>Value: {value}</p>
    </>
  )
}

export default Profile