import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Product from './component/product/Product'
import AddProduct from './component/product/AddProduct'
import EditProduct from './component/product/EditProduct'
import Employee from './component/employee/Employee'
import AddEmployee from './component/employee/AddEmployee'
import EditEmployee from './component/employee/EditEmployee'
import ProductType from './component/product/Type'
import Navbar from './component/header/Navbar'

function App() {
  return (
      <Router>
          <Navbar />
          <Switch>
                <Route  exact path="/" component={Product} />
                <Route  exact path="/add/product" component={AddProduct} />
                <Route  exact path="/edit/product/:id" component={EditProduct} />
                <Route  exact path="/employee" component={Employee} />
                <Route  exact path="/add/employee" component={AddEmployee} />
                <Route  exact path="/edit/employee/:id" component={EditEmployee} />
                <Route  exact path="/product/type" component={ProductType} />
          </Switch>
      </Router>
  );
}

export default App;
