import React from 'react'

const ProjectCard = props => {

    console.log("project card", props)
    return (
        <div className="ui card">
            <div className="content">
                <a className="header" href="./#">{props.item.code}</a>
                <div className="meta">
                    <span className="date">{props.item.client}</span>
                </div>
                <div className="description">
                    {props.item.description}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
