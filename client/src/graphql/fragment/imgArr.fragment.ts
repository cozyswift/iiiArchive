import gql from "graphql-tag";

export default gql`
  fragment ImgArr on ImageArr {
    id
    fileName
    examUrl
  }
`;
