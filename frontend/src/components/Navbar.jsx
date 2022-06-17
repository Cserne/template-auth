import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../providers/auth';

export const Navbar = () => {
  const navigate = useNavigate();
  const {auth, logout, token} = useAuth();

  const nav = (path) => {
    console.log('reroutering'); // bármilyen route előtti logika betehető ide
    navigate(path);
  }

  return (
    <nav className='navbar' style={{backgroundColor:'gray', display:'flex', justifyContent:'space-between'}}>
      <div className='left'>
        <button onClick={() => nav('/')}>Home</button>
        <button onClick={() => nav('/about')}>About</button>
        {/* <button onClick={() => navigate('/profile')}>Profile</button> */}
        <Link to='/profile'>Profile</Link>
      </div>
      <div className='right'>
        { !token ? <button onClick={auth}>Login</button> : <button onClick={logout}>Logout</button>}
      </div>
    </nav>
  )
}

export default Navbar;
