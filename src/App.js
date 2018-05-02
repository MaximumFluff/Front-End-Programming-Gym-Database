import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Customers from './components/Customers';
import Trainings from './components/Trainings';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="display-1">Gold's Gym Customer Database</h1>
        </header>
        <BrowserRouter>
          <div>
            <div style={{ fontSize: 30 }}>
              <Link to="/" style={{ marginRight: 30 }} className="badge badge-secondary">Homepage</Link>{' '}
              <Link to="/customers" style={{ marginRight: 30 }} className="badge badge-secondary">Customers</Link>{' '}
              <Link to="/trainings" style={{ marginRight: 30 }} className="badge badge-secondary">Trainings</Link>{' '}
            </div>
            <Switch>
              <Route exact path="/" render={() => <h2>Welcome to our internal customer database! Please don't give this information out freely</h2>} />
              <Route path="/customers" component={Customers} />
              <Route path="/trainings" component={Trainings} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
