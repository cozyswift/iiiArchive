import gql from 'graphql-tag';
export default gql`
  fragment Archivist on Archivist {
    id
    name
    archivistId
    eMail
    picture
  }
`;