import { useParams } from "react-router-dom";
// import {gql, useQuery} from '@apollo/client'
// import Navbar from "../Navbar/Navbar";

import "./Products.scss";
import { useProducts } from "./Hook";

import { FaShoppingCart } from "react-icons/fa";

import {TiTick} from "react-icons/ti";

 function Products(props) {

    const{product, onAdd} = props
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
          {data &&
            data.products.map((row) => (
              <li key={row.id} className="product-item">
                  <img
                    src={row.image}
                    alt={row.image}
                    className="product-logo"
                  />
                  <h1 className="product-title">{row.name}</h1>
                  <h2 className="product-price">{row.price}</h2>
                  <button className="add-to-card" data-id={row.id} onClick={()=> onAdd(product)}>
                      <FaShoppingCart className="basket-logo" /> 
                      <h3 className="add-to-card-title">Add</h3>
                      <TiTick className="active" />
                  </button>
              </li>
            ))}
        </ul>
    );
  }
}

export default Products