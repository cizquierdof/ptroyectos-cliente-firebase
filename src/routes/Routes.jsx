import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ProjectList from '../pages/ProjectList'
import ProjectCreate from '../pages/ProjectCreate'
import ProjectView from '../pages/ProjectView'
import ClientList from '../pages/ClientList'
import Navbar from '../components/Navbar';
import ClientCreate from '../pages/ClientCreate'
import ClientView from '../pages/ClientView'
import Splash from '../pages/splash'


const Routes = () => {
    return (
        
        <Router>
            <Navbar/>
            <div className="ui container">
                <Route exact path="/" component={Splash} />
                <Route exact path="/projects" component={ProjectList} />
                <Route path="/projects/new" component={ProjectCreate} />
                <Route path="/projects/:id/view" component={ProjectView} />
                <Route path='/projects/:id/edit' component={ProjectCreate}/>
                <Route exact path='/clients' component={ClientList}/>
                <Route path="/clients/new" component={ClientCreate} />
                <Route path="/clients/:id/view" component={ClientView} />
                <Route path='/clients/:id/edit' component={ClientCreate}/>

            </div>
      </Router>
    )
}

export default Routes
