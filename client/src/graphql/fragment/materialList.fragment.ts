import gql from "graphql-tag";
import material from "./material.fragment";
import imgArr from "./imgArr.fragment";

export default gql`
  fragment MaterialList on Material {
    id
    title
    archivistId
    keyword
    picture {
      examUrl
    }
  }
`;
