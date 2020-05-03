import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Axios from 'axios';
import config from '../config/config';

export class ClientForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            mail: '',
            redirect: false
        }
    }

    componentDidMount() {

        const id = this.props.id;
        //si existe 'id' queremos editar el cliente y hay que traerse los datos,
        //si id es null no traigo nada 
        if (id) {
            Axios.get(`${config.BASE_API_URL}/clients/${id}/`)
                .then(
                    res => {
                        this.setState({
                            name: res.data.name,
                            address: res.data.address,
                            mail: res.data.mail
                        })
                    }
                )
                .catch(console.log);
        }
    }

    onMailChange = e => {
        this.setState(
            {
                mail: e.target.value
            }
        )
    }

    onAddressChange = e => {
        this.setState(
            {
                address: e.target.value
            }
        )
    }

    onNameChange = e => {
        this.setState(
            {
                name: e.target.value
            }
        )
    }

    onSubmitClick = e => {
        e.preventDefault();
        const client = {
            name: this.state.name,
            address: this.state.address,
            mail: this.state.mail
        }
        if (this.props.id) {
            Axios.put(`${config.BASE_API_URL}/clients/${this.props.id}`, client)
                .then(
                    res => this.setState({
                        redirect: true
                    })

                ).catch(console.log)

        } else {
            Axios.post(`${config.BASE_API_URL}/clients`, client)
                .then(
                    res => this.setState({
                        redirect: true
                    })
                ).catch(console.log)
        }
        console.log(client)
    }

    render() {

        return (
            <div className='client-form'>
                client form
                {this.state.redirect && <Redirect to="/clients" />}
                <form className="ui form" >
                    <div className="field">
                        <label>Cliente</label>
                        <input type="text" name="name"
                            onChange={this.onNameChange}
                            value={this.state.name}
                            placeholder="nombre del cliente" />
                    </div>
                    <div className="field">
                        <label>Dirección</label>
                        <input type="text" name="address"
                            value={this.state.address}
                            onChange={this.onAddressChange}
                            placeholder="dirección" />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" name="mail"
                            value={this.state.mail}
                            onChange={this.onMailChange}
                            placeholder="correo" />
                    </div>
                    <Link to="/clients/" className="ui red button">
                        <i className="icon close"></i>
                        Cancelar
                    </Link>
                    <button className="ui primary button"
                        onClick={this.onSubmitClick}
                        type="submit">
                        Enviar
                    </button>
                </form>
            </div>
        )
    }
}

export default ClientForm
