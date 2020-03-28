import gql from 'graphql-tag';
import * as fragments from '../fragment';

export default gql`
subscription MaterialAdded {
    materialAdded{
        ...Material
    }
    ${fragments.material}
}
`;
