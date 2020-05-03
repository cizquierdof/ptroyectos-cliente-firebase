# Aplicación React con backend Firebase

La misma aplicación proyectos cliente, pero ahora utilizando firebase

## Se necesitan

- cuenta de Firebase
- react-router-dom: npm i -s react-router-dom
- API de firebase: npm i -s firebase

## 1. Crear un proyecto Firebase

- Ir a la consola de firebase y añadir un proyecto, en este caso le llamaré proyectos-cliente. No activo Google analitics para este proyecto.
- Añadir una aplicación, en este caso va a ser una aplicación web:
  - Le damos un apodo, mi-proyectos-cliente, por ejemplo. en este paso podemos configurar también el hosting en Firebase. Esto lo haré más tarde en una segunda parte del proyecto.
  - Nos da las key de la aplicación que debemos insertar en un fichero de configuración, se puede poner en el que ya teniamos, pero en este caso hago uno nuevo en la carpeta de configuraciones y  lo llamaré firebase.js. El contenido será algo así:

```javascript
import firebase from 'firebase'
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: '### FIREBASE API KEY ###',
    authDomain: '### FIREBASE AUTH DOMAIN ###',
    projectId: '### CLOUD FIRESTORE PROJECT ID ###'
  });
  
  const db = firebase.firestore();

  export default db;
```

- Una vez creado el proyecto y la aplicación vamos al panel de control a **Database**. Seleccionamos Firestore.

  - Pinchamos en crear base de datos. Se nos pregunta si la queremos en modo producción o en modo de prueba, esto es para establecer los permisos de lectura y escritura. Para nuestro propósito escogemos modo de prueba lo que deja la base de datos abierta, de momento no importa.
  - En el siguiente paso nos pide la ubicación, escogeremos europe-west.

## 2. Utilizar Firestore

A partir de aquí ya no utilizaremos axios para acceder a los datos sino que usaremos firestore, tenemos que cambiar todos los axios por firestore.

### 1. añadir un registro

Siqueremos añadir un registro de proyecto, en ProjectForm.js, hariamos la siguiente sustitución:

```javascript
...>
import db from '../config/firebase'

export class ProjectForm extends Component {
......>

onSubmitClick = e=>{..............>

.....>
        } else {
            // Axios.post(`${config.BASE_API_URL}/projects`, project)
            //     .then(
            //         res => this.setState({
            //             redirect: true
            //         })
            //     ).catch(console.log)
            db.collection('projects').add(project)
              .then(
                res => this.setState({
                        redirect: true
                    })
            ).catch(console.log)
            ........>
```

Primero importamos la base de datos desde nuestro firebase.js. Después en el método onSubmitClick, sustituimos el código que creaba un registro nuevo con axios por le línea qu lo hace con firebase.

Esta simple línea hace lo siguiente recupera una colección de la base de datos, en este caso *projects*. si la colección no existe, la creará. Después le envia los datos del proyecto con .add(projec), recordemos que *project* contenía los datos del proyecto.

add(project), devuelve una promesa, así que podemos seguir haciendo lo que haciamos con axios que es redirigir. Incluso podemos hacer catch y devolver posibles errores

### 2. Editar un registro

Seguimos en **ProjectForm.js**. Recordamos que cuando queremos editar un proyecto, recibiamos por *props* la *id* del proyecto a editar. Así, lo primero que debemos hacer es traernos los datos del proyecto a editar. En componentDidMount haremos lo siguiente:

```javascript
    componentDidMount() {
        console.log('proyectCreate match', this.props.id);

        const id = this.props.id;
        // if (id) {
        //     Axios.get(`${config.BASE_API_URL}/projects/${id}/`)
        //         .then(
        //             res => {
        //                 this.setState({
        //                     code: res.data.code,
        //                     description: res.data.description,
        //                     client: res.data.client
        //                 })
        //             }
        //         )
        //         .catch(console.log);
        // }
        db.collection('projects').doc(id).get().then(
            res=>{
                //la respuesta de firebase nos devuelve un elemento booleano 'exist'
                //y una función con los datos 'data() así que podemos asignar esta función
                // a una constante que es la que uasremos para rellenar el proyecto
                if (res.exists) {
                    const data=res.data();
                    this.setState({
                        code:data.code,
                        description:data.description,
                        client:data.client
                    })
                }
            }
        )
    }
```

A continuación ya podemos actualizar el proyecto con datos modificados. Recordamos que eso lo haciamos en *onSubmitClick* que cambiaremos de la siguiente forma

```javascript
    onSubmitClick = e => {
        e.preventDefault();
        const project = {
            code: this.state.code,
            description: this.state.description,
            client: this.state.client
        }
        if (this.props.id) {
            // Axios.put(`${config.BASE_API_URL}/projects/${this.props.id}`, project)
            //     .then(
            //         res => this.setState({
            //             redirect: true
            //         })
            //     ).catch(console.log)
            db.collection('projects').doc(this.props.id).set(project)
                .then(
                    res => this.setState({
                        redirect: true
                    })
                ).catch(console.log)
```

Es decir en vez de mandar un *add(proeject)* a la *collection*, enviamos un *set(project)* con los datos a un proyecto en particular que ya existía.

A parttir de este momento en este componente ya no utilizamos axios para nada por lo que se puede eliminar del import, y también el antiguo config.js.

### 3. Otras modificaciones de código

Lo siguiente a modificar es ProjectList.js que es quien se tre la lista de proyectos de la base de datos:

Esto lo hace en el método useEffect. Por supuesto al igual que antes hay que importar la base de datos desde el archivo de configuración firebase.js.

```javascript
    useEffect(
        () => {
            //con lo siguiente nos traemos todos los docs de la collection projects
            db.collection('projects').get().then(
                res=>{

                    const elementos=res.docs.map(
                        item=>{
                            const data=item.data();
                            return {
                                id: item.id,
                                code: data.code,
                                client:data.client,
                                description:data.description
                            }
                        }
                    )
                    setProjects(elementos);
                }
            )
            // axios.get(`${config.BASE_API_URL}/projects`).then(
            //     res => setProjects(res.data)
            // ).catch(
            //     console.log
            // )
```

lo siguiente a modificar es projectView.js al que modificamos para que nos traiga los datos de un proyecto específico

```javascript
    componentDidMount() {
        //console.log(this.props.match)
        db.collection('projects').doc(this.props.match.params.id).get()
            .then(
                res=> this.setState(res.data())
            )
        // axios.get(`${config.BASE_API_URL}/projects/${this.props.match.params.id}/`)
        //     .then(res =>
        //         this.setState({
        //             project: res.data
        //         })
        //     )
    }
```
