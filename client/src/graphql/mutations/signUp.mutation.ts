import gql from "graphql-tag";
export default gql`
  mutation signUp(
    $archivistID: String!,
    $archivistPW: String!,
    $eMail: String!,
    $name: String!,
    $passwordConfirm: String!,
  ) {
    signUp(
      archivistID: $archivistID
      archivistPW: $archivistPW
      eMail: $eMail
      name: $name
      passwordConfirm: $passwordConfirm
    ) {
      id
    }
  }
`;