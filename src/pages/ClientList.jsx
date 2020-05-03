import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import ClientsTable from '../components/ClientsTable'
import Axios from 'axios'
import config from '../config/config'

const ClientList = () => {

    const [clients, setClients] = useState([]);

    useEffect(
        () => {
            Axios.get(`${config.BASE_API_URL}/clients`)
                .then(
                    res => setClients(res.data)
                ).catch(console.log)
        }, []

    )

    const deleteElement = (id) => {
        console.log("delete element ", id)
        const nuevosClientes = clients.filter(
            e => e.id !== id);
        setClients(nuevosClientes);
    }

    return (
        <div className="project-list">

            <Header>
                <i aria-hidden="true" className="list icon"></i>
                    Lista de Clientes ({clients.length} clientes)
                </Header>

            <Link to="/clients/new" className="ui basic button">
                <i className="icon plus"></i>
                        Nuevo Cliente
                </Link>
            <ClientsTable deleteElement={deleteElement} items={clients} />
        </div>
    )
}

export default ClientList
