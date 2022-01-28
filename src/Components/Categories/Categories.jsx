import { Link } from "react-router-dom";
import React from "react";
import { gql, useLazyQuery } from "@apollo/client";

import "./Categories.scss";

const CATEGORIES = gql`
  query {
    categories {
      id
      name
      image
    }
  }
`;



export default function Categories() {
  const [allCategories, { called, loading, data }] = useLazyQuery(CATEGORIES);
  if (called && loading) return <p>Loading ...</p>;
  if (!called) {
    return <button className="btn" onClick={() => allCategories()}>Load Categories</button>;
  } else {
    return (
      <ul className="categories-list">
        {allCategories.length &&
          data.categories.map((row) => (
            <li className="category-item" key={row.id}>
              <Link to={`/${row.id}`} className='category-item-link' >
                <img className="category-logo" src={row.image} alt="row image" />
                <h1 className="category-title">{row.name}</h1>
              </Link>
            </li>
          ))}
      </ul>
    );
  }
}


// const CATEGORIES = gql`
// query {
//     allcategories {
//       id
//       name
//     }
//   }
//   `
// export default function Categories() {
//   const [allCategories, { called, loading, data }] = useLazyQuery(CATEGORIES);
//   if (called && loading) return <p>Loading ...</p>;
//   if (!called) {
//     return <button className="btn" onClick={() => allCategories()}>Load Categories</button>;
//   } else {
//     return (
//       <ul className="categories-list">
//         {allCategories.length &&
//           data.allcategories.map((row) => (
//             <li className="category-item" key={row.id}>
//               <Link to={`/res/${row.id}`} className='category-item-link' >
//                 <h1 className="category-title">{row.name}</h1>
//               </Link>
//             </li>
//           ))}
//       </ul>
//     );
//   }
// }