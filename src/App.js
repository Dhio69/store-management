import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Product from './component/product/Product'
import AddProduct from './component/product/AddProduct'
import EditProduct from './component/product/EditProduct'
import Employee from './component/employee/Employee'
import AddEmployee from './component/employee/AddEmployee'
import EditEmployee from './component/employee/EditEmployee'
import ProductType from './component/product/Type'
import Navbar from './component/header/Navbar'

import Login from './component/user/Login'

function App() {

  const loggedIn = localStorage.getItem('loggedIn');

  return (
      <Router>
          
          <Route  exact path="/login" component={Login} />
          {!loggedIn ? null :  <Navbar />}
          {!loggedIn ? <Redirect to="/login" /> :  
            <Switch>
                <Route  exact path="/" component={Product} />
                <Route  exact path="/add/product" component={AddProduct} />
                <Route  exact path="/edit/product/:id" component={EditProduct} />
                <Route  exact path="/employee" component={Employee} />
                <Route  exact path="/add/employee" component={AddEmployee} />
                <Route  exact path="/edit/employee/:id" component={EditEmployee} />
                <Route  exact path="/product/type" component={ProductType} />
          </Switch>
           }
         
      </Router>
  );
}

export default App;
