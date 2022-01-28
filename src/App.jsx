
import './App.css';

import {Switch, Route} from 'react-router-dom';

//Pages
import HomePage from './Pages/HomePage/HomePage';
// import SubCategoriesPage from './Pages/SubCategoriesPage/SubCategoriesPage';
import SubCategories from './Components/SubCategories/SubCategories';
// import ProductsPage from './Pages/ProductsPage/ProductsPage';
import Products from './Components/Products/Products';
import Navbar from './Components/Navbar/Navbar';


function App() {
  return (
    <>
      <Navbar/>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/:id" component={SubCategories} exact />
        <Route path=":id/:subId" component={Products} exact />
      </Switch>
    </>
  );
}

export default App;
