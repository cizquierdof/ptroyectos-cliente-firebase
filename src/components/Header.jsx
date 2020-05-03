import React from 'react'
import '../css/Header.css'

const Header = props => {
    return (
        <h1 className="ui header">
            {props.children}
        </h1>
    )
}

export default Header
