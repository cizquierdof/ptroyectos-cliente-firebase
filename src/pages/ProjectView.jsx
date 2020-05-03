import React, { Component } from 'react'
import ProjectCard from '../components/ProjectCard'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import db from '../config/firebase'

export class ProjectView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: {}
        }
    }


    componentDidMount() {
        console.log(this.props.match)
        db.collection('projects').doc(this.props.match.params.id).get()
            .then(
                res=> this.setState({
                    project:res.data()
                })
            )
    }

    render() {
        return (
            <div className="project-view">
                <Header>
                    <i aria-hidden="true" className="list icon"></i>
                    Proyecto
                </Header>
                <ProjectCard item={this.state.project}></ProjectCard>
                <Link to="/projects" className="ui button">Volver</Link>

            </div>
        )
    }
}

export default ProjectView
