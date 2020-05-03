import React from 'react'
import ProjectForm from '../components/ProjectForm'
import Header from '../components/Header'

const ProjectCreate =(props)=> {


     /*************
     * match es uno de los objetos que devuelven en las props los elementos de 
     * react-router-dom, entre ellos match.params es un objeto clave:valor que procede 
     * de la ruta enviada en nuestro caso es id:'idproyecto' con lo que tenemos 
     * identificado el proyecto que queremos tratar.
     */

    //console.log(props.match.params.id);
    const id = props.match.params.id;

    return (
        <div className="project-create">
            <Header>
                <i aria-hidden="true" className="plus icon"></i>
                {id ? 'Editar Proyecto' : 'Crear Proyecto'}
            </Header>
            <ProjectForm id={id} />
        </div>
    )

    }


export default ProjectCreate
