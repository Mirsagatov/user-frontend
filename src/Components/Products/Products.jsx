import { NavLink, useParams } from "react-router-dom";
// import {gql, useQuery} from '@apollo/client'
// import Navbar from "../Navbar/Navbar";

import "./Products.scss";
import { useProducts } from "./Hook";

 function Products() {
  const { subId } = useParams();
  const { loading, data } = useProducts(subId);
  console.log({loading, data});

  if (loading) {
    return (
      
        <p>Loading ...</p>
      
    );
  } else {
    return (
        <ul className="products-list">
          {data.length>0 &&
            data.products.map((row) => (
              <li key={row.id} className="product-item">
                <NavLink to={`/`} className="product-item-link">
                  <img
                    src={row.image}
                    alt={row.image}
                    className="product-logo"
                  />
                  <h1 className="product-title">{row.name}</h1>
                  <h2 className="product-price">{row.price}</h2>
                </NavLink>
              </li>
            ))}
        </ul>
    );
  }
}

export default Products