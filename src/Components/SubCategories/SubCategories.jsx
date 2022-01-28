import { NavLink, useParams } from "react-router-dom";
// import {gql, useQuery} from '@apollo/client'
// import Navbar from "../Navbar/Navbar";

import "./SubCategories.scss";
import { useSubcategories } from "./Hook";

export default function SubCategories() {
  const { id } = useParams();
  const { loading, data } = useSubcategories(id);
  console.log(data);

  if (loading) {
    return (
      
        <p>Loading ...</p>
      
    );
  } else {
    return (
        <ul className="subcategories-list">
          {data &&
            data.subcategories.map((row) => (
              <li key={row.id} className="subcategory-item">
                <NavLink to={`/products/${row.id}`} className="subcategory-item-link">
                  <img
                    src={row.image}
                    alt={row.image}
                    className="subcategory-logo"
                  />
                  <h1 className="subcategory-title">{row.name}</h1>
                </NavLink>
              </li>
            ))}
        </ul>
    );
  }
}

// export default function SubCategories() {
//     const {categoryID} = useParams()
//     const {loading, error, data}= useSubcategories(categoryID)
//     console.log({loading, error, data})

//     if (loading) {return <p>Loading ...</p>;}
//     if(error) {return <p>Error</p>;}
//     else {
//         return <ul className="subcategories-list">
//       {data && data.allsubcategories.map((row) => (
//           <li key={row.id} className="subcategory-item">
//               <NavLink to='/products/:subcategoryID' className="subcategory-item-link">
//                   <h1 className="subcategory-title">{row.name}</h1>
//               </NavLink>
//           </li>
//       ))}
//   </ul>;
//     }
// }

// const SUBCATEGORIES = gql`
// query allsubcategories($categoryID: ID!) {
//   allsubcategories(categoryID: $categoryID) {
//     id
//     name
//   }
// }

// `;

// export default function SubCategories() {

//     const {id} = useParams()

//     const { loading, error, data }= useQuery(SUBCATEGORIES, {
//         variables: {categoryID: id},
//       });

//     console.log({data})

//     if (loading) {return <p>Loading ...</p>;}
//     if(error) {return <p>Error</p>;}
//     else {
//         return <ul className="subcategories-list">
//       {data && data.allsubcategories.map((row) => (
//           <li key={row.id} className="subcategory-item">
//               <NavLink to='/products/:subcategoryID' className="subcategory-item-link">
//                   <h1 className="subcategory-title">{row.name}</h1>
//               </NavLink>
//           </li>
//       ))}
//   </ul>;
//     }
// }
