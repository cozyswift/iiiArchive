import gql from "graphql-tag";
export default gql`
  query GetMaterialList {
    materialList {
      id
      title
      archivistId
      keyword
      picture {
        examUrl
      }
    }
  }

  `;
