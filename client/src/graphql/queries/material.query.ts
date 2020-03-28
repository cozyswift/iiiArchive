import gql from "graphql-tag";

export default gql`
  query getMaterial($materialId: ID!) {
    material(materialId: $materialId) {
      archivistId
      title
      description
      picture {
        examUrl
      }
    }
  }
`;