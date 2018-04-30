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
          <h1 className="App-title">Gold's Gym Customer Database</h1>
        </header>
            <BrowserRouter>
                <div>
                    <Link to="/">Homepage</Link>{' '}
                    <Link to="/customers">Customers</Link>{' '}
                    <Link to="/trainings">Trainings</Link>{' '}
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
