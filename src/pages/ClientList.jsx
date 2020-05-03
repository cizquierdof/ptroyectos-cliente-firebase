import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import ClientsTable from '../components/ClientsTable'
import db from '../config/firebase'

const ClientList = () => {

    const [clients, setClients] = useState([]);

    useEffect(
        () => {
            // Axios.get(`${config.BASE_API_URL}/clients`)
            //     .then(
            //         res => setClients(res.data)
            //     ).catch(console.log)

            //recuperamos la colección de documentos de cliente de la base de datos
            db.collection('clients').get().then(
                res=>{
                    //extraemos cada documento con un map
                    const docsCliente=res.docs.map(
                        //a diferencia de axios, cada elemento recuperado es más complejo, noo es un objeto
                        //simple, contiene muchos más datos, pero firestore proporciona como parte del documento
                        //un método data() que recupera la información
                        item=>{

                            const data=item.data();
                            return {
                                id:item.id, //el id de cliente no forma parte del data
                                            //sino del documento
                                name:data.name,
                                address:data.address,
                                mail:data.mail
                            }
                        }
                    )
                    setClients(docsCliente);
                }
            )
        }, []

    )

    const deleteElement = (id) => {
        //console.log("delete element ", id)
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
