import React, { Component } from 'react';
import 'bootswatch/dist/darkly/bootstrap.min.css'
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';

import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import {
    PeoplePage,
    PlanetsPage,
    StarshipPage,
    SecretPage,
    Login
} from "../pages/";
import { StarshipDetails } from "../sw-components"

export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

    onLogin =  () => {
        this.setState({
            isLoggedIn: true
        })
    };

  onServiceChange = () => {
    this.setState(({swapiService}) => {
        const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

        return {
            swapiService: new Service()
        }
    })
  };

  render() {

      const { isLoggedIn } = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
            <Router>
                <div className="stardb-app container">
                    <Header onServiceChange={this.onServiceChange} />

                    <RandomPlanet />
                    <Switch>
                        <Route path="/" render={() => <h2>Welcome to StarDB</h2>} exact/>
                        <Route path='/people/:id?' exact component={PeoplePage}/>
                        <Route path='/planet' exact component={PlanetsPage}/>
                        <Route path='/starship' exact component={StarshipPage}/>
                        <Route path='/starship/:id' render={({match}) => {
                            const { id } = match.params;
                            return <StarshipDetails itemId={id} />
                        }}/>
                        <Route path='/login' exact render={() => (<Login isLoggedIn={isLoggedIn} onLogin={this.onLogin}/>)}/>
                        <Route path='/secret' exact render={() => (<SecretPage isLoggedIn={isLoggedIn}/>)}/>

                        <Route render={() => (<h2>Page not found</h2>)}></Route>
                    </Switch>
                </div>
            </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
