import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Calender from './components/Calender';
import Customers from './components/Customers';
import Trainings from './components/Trainings';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="display-1">Gold's Gym Database</h1>
        </header>
        <BrowserRouter>
          <div>
            <div style={{ fontSize: 30 }}>
              <Link to="/" style={{ marginRight: 30 }} className="badge badge-secondary">Homepage</Link>{' '}
              <Link to="/customers" style={{ marginRight: 30 }} className="badge badge-secondary">Customers</Link>{' '}
              <Link to="/trainings" style={{ marginRight: 30 }} className="badge badge-secondary">Trainings</Link>{' '}
              <Link to="/calender" style={{ marginRight: 30 }} className="badge badge-secondary">Calender</Link>{' '}
            </div>
            <Switch>
              <Route exact path="/" render={() =><div> <h2>Welcome to our internal customer database!</h2><br/><p>At Gold's gym were are dedicated to getting people in a stupid short amount of time! <br/> Please dont share this internal data freely, doing so will make you liable to be subjected to legal action</p><img src={require('./barbell.png')} alt="Barbell logo" height={400} width={400} style={{paddingTop: 34}}/></div>} />
              <Route path="/customers" component={Customers} />
              <Route path="/trainings" component={Trainings} />
              <Route path="/calender" component={Calender} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
