import React, { Component } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import ClientCard from '../components/ClientCard'
import db from '../config/firebase'

export class ClientView extends Component {

    constructor(props){
        super(props);
        this.state={
            client:{}
        }
    }

    componentDidMount() {
        
        db.collection('clients').doc(this.props.match.params.id).get()
            .then(
                res=> this.setState({
                    client:res.data()
                })
            )
    }

    render() {
        return (
            <div>
            <Header>
            <i aria-hidden="true" className="list icon"></i>
            Cliente
        </Header>
        <ClientCard item={this.state.client}></ClientCard>
        <Link to="/clients" className="ui button">Volver</Link>
    </div>
        )
    }
}

export default ClientView
