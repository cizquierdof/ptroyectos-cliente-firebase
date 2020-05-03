import React from 'react'
import { Link } from 'react-router-dom'
import db from '../config/firebase'

const ClientsTable = (props) => {


    const onBorrarClicked = id => {
        //console.log("elemento a borrar", id)
        // Axios.delete(`${config.BASE_API_URL}/clients/${id}/`).then(
        //     res => {
        //         console.log(res);
        //         props.deleteElement(id);
        //     }
        // ).catch(console.log)
        db.collection('clients').doc(id).delete().then(
            res => {
                //console.log(res);
                props.deleteElement(id);
            }
        )
    }

    return (
        <div>
            <div>
                <table className="ui striped table unstackable">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.items.map(
                                e => <tr key={`project${e.id}`}>
                                    <td>{e.name}</td>
                                    <td>{e.address}</td>
                                    <td>{e.mail}</td>
                                    <td>
                                        <div className='ui buttons'>
                                            <Link className='ui basic button green' to={`/clients/${e.id}/view`}>
                                                Ver
                                            </Link>
                                            <Link className='ui basic button blue' to={`/clients/${e.id}/edit`}>
                                                Editar
                                            </Link>
                                            <a className='ui basic button red' href="/clients" onClick={() => onBorrarClicked(e.id)} >
                                                Borrar
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ClientsTable
