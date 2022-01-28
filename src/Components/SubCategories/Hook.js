import {gql, useQuery} from '@apollo/client'

const SUBCATEGORIES = gql`
query subcategories($categoryID: ID!) {
  subcategories(categoryID: $categoryID) {
    id
    image
    name
  }
}
`;


export const useSubcategories = (categoryID) => {
    const { loading, data }= useQuery(SUBCATEGORIES, {
      variables: {categoryID},
    });

    return {loading, data}
  };

// const SUBCATEGORIES = gql`
// query allsubcategories($categoryID: ID!) {
//   allsubcategories(categoryID: $categoryID) {
//     id
//     name
//   }
// }

// `;


// export const useSubcategories = (categoryID) => {
//     const { loading, error, data }= useQuery(SUBCATEGORIES, {
//       variables: {categoryID},
//     });

//     return {loading, error, data}
//   };

