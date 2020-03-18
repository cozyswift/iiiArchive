import gql from 'graphql-tag';
import imgArr from './imgArr.fragment';
 
export default gql`
fragment Material on Material{
    id
    title
    picture{
        ...ImgArr
    }
}
${imgArr}

`;