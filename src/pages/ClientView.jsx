import React, { Component } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import ClientCard from '../components/ClientCard'
import Axios from 'axios';
import config from '../config/config';

export class ClientView extends Component {

    constructor(props){
        super(props);
        this.state={
            client:{}
        }
    }

    componentDidMount() {
        //console.log(this.props.match)
        Axios.get(`${config.BASE_API_URL}/clients/${this.props.match.params.id}/`)
            .then(res =>
                this.setState({
                    client: res.data
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
