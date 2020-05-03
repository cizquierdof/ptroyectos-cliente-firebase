import React from 'react'
import Header from '../components/Header'
import ClientForm from '../components/ClientForm';

const ClientCreate = (props) => {

    const id=props.match.params.id;
    return (
        <div className="project-create">
            <Header>
                <i aria-hidden="true" className="plus icon"></i>
                {id ? 'Editar Cliente' : 'Crear Cliente'}
            </Header>
            <ClientForm id={id} />
        </div>
    )
}

export default ClientCreate
