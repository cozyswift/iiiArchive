import gql from "graphql-tag";
import * as fragments from "../fragment";

export default gql`
query Me{
    me{
        ...Archivist
    }
}
${fragments.archivist}
`;

