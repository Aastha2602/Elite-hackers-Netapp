import './App.css';
import {BrowserRouter as Router , Routes, Route } from "react-router-dom"
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
// import Dashboard from './components/Dashboard/Dashboard';

import DashboardHome from './New/pages/home/DashboardHome.jsx';
import UserList from './New/pages/userList/UserList';
import NewUser from './New/pages/newUser/NewUser';
import User from './New/pages/user/User';
import ProductList from './New/pages/productList/ProductList';
import Product from './New/pages/product/Product';
import NewProduct from './New/pages/newProduct/NewProduct';
import JobLists from './components/JobContent/JobLists';
import JobDetails from './components/JobContent/JobDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/login/new" element={<Register />} />
          <Route path="/dashboard" element={<DashboardHome />}/>
          <Route path="/dashboard/users" element={<UserList />}/>
          <Route path="/dashboard/user/:userId" element={<User />}/>
          <Route path="/dashboard/newUser" element={<NewUser />}/>
          <Route path="/dashboard/products" element={<ProductList />}/>
          <Route path="/dashboard/product/:productId" element={<Product />}/>
          <Route path="/dashboard/newproduct" element={<NewProduct />}/>
          <Route path="/jobs" element={<JobLists />}/>
          <Route path="/jobs/:position" element={<JobDetails />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;