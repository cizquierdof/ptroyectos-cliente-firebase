import React from 'react'
import config from '../config/config'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <Link to='/' className='brand'>
                {config.BRAND}
            </Link>
            <div className='ui two item menu'>
                <Link to='/projects'  className='ui basic purple button'>Proyectos</Link>
                <Link to='/clients' className='ui basic green button'>Clientes</Link>
            </div>
        </div>
    )
}
export default Navbar
