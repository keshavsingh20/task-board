import React from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear();
        navigate('/register')
    }

    return (
        <div>
            {
                auth ?
                    <ul className='nav-ul nav-right'>
                        <li style={{ float:'left',fontSize: 30, fontWeight: 700, marginTop: -8, }}><Link to={'/'} style={{color:'black'}}>TaskBar</Link></li>
                        <li style={{color: 'black', float:'left', fontSize: 16, font:'bold'}}>Welcome, {JSON.parse(auth).username}</li>
                        <li><Link onClick={logout} to="/login">Logout</Link></li>
                    </ul>
                    :
                    <ul className='nav-ul nav-right'>
                        <li style={{ float:'left',fontSize: 30, fontWeight: 700, marginTop: -8, }}><Link to={'/'} style={{color:'black'}}>TaskBar</Link></li>
                        <li><Link to="/register">SignUp</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
            }

        </div >
    )
}


export default Navbar;