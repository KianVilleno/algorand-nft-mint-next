import gql from "graphql-tag";

const GET_ALL_DEMO = gql`
  query {
    assetCollection(limit: 100) {
      items {
        title
        url
        width
        height
      }
    }
  }
`;

export default GET_ALL_DEMO;
