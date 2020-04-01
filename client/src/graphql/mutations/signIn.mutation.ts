import gql from "graphql-tag";

export default gql`
  mutation signIn($archivistID: String!, $archivistPW: String!) {
    signIn(archivistID: $archivistID, archivistPW: $archivistPW) {
      id
    }
  }
`;
