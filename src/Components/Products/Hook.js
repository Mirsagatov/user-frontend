import {gql, useQuery} from '@apollo/client'

const PRODUCTS = gql`
query  products($subcategoryID: ID!) {
    products(subcategoryID: $subcategoryID) {
      id
      name
      image
      price
    }
  }
`;


export const useProducts = (subcategoryID) => {
    const { loading, data }= useQuery(PRODUCTS, {
      variables: {subcategoryID},
    });

    return {loading, data}
  };