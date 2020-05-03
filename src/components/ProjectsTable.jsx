import React from 'react'
import { Link } from 'react-router-dom'
import db from '../config/firebase'

const ProjectsTable = (props) => {

    const onBorrarClicked = id => {
        db.collection('projects').doc(id).delete().then(
            res => {
                console.log(res);
                props.deleteElement(id);
            }
        ).catch(console.log)
        // console.log("elemento a borrar", id)
        // axios.delete(`${config.BASE_API_URL}/projects/${id}/`).then(
        //     res => {
        //         console.log(res);
        //         props.deleteElement(id);
        //     }
        // ).catch(console.log)
    }

    return (
        <div>
            <div>
                <table className="ui striped table unstackable">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Código de proyecto</th>
                            <th>Descripción</th>
                            <th>Cliente</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.items.map(
                                e => <tr key={`project${e.id}`}>
                                    <td>{e.id}</td>
                                    <td>{e.code}</td>
                                    <td>{e.description}</td>
                                    <td>{e.client}</td>
                                    <td>
                                        <Link className='ui basic button green' to={`/projects/${e.id}/view`}>
                                            Ver
                                        </Link>
                                        <Link className='ui basic button blue' to={`/projects/${e.id}/edit`}>
                                            Editar
                                        </Link>
                                        <a className='ui basic button red' href="/#" onClick={() => onBorrarClicked(e.id)} >
                                            Borrar
                                        </a>
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

export default ProjectsTable

