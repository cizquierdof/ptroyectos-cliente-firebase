import React from 'react'
import '../css//Splash.css'
import config from '../config/config'

const splash = () => {
    return (
        <div className='splash'>
        <div className='red'>Great</div>
        <div className='white'>Solutions</div>
        <div className='about'>
            {config.BRAND}
        </div>
        </div>
    )
}

export default splash
