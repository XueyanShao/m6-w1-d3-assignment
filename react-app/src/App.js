import React, { Component } from 'react';
import Home from './Home';
import { Link,BrowserRouter as Router, Route, Switch } from "react-router-dom";
import InventoryList from './InventoryList';
import InventoryEdit from './InventoryEdit';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home} />
          <Route path='/inventories' exact={true} component={InventoryList} />
          <Route path='/inventories/:id' component={InventoryEdit} />
        </Switch>
      </Router>
    )
  }
}

export default App;
