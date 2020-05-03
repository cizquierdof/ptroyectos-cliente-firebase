import React from 'react'

const ClientCard = (props) => {
    return (
        <div className="ui card">
            <div className="content">
                <a className="header" href="./#">{props.item.name}</a>
                <div className="meta">
                    <span className="date">{props.item.mail}</span>
                </div>
                <div className="adresss">
                    {props.item.address}
                </div>
            </div>
        </div>
    )
}

export default ClientCard
