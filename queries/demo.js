import gql from "graphql-tag";

const GET_ALL_DEMO = gql`
  query Artists {
    artistCollection(order: lastName_ASC, limit: 400) {
      items {
        name
        slug
      }
    }
  }
`;

export default GET_ALL_DEMO;
