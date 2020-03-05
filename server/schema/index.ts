import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
// const typeDef = importSchema('schema/typeDefs.graphql');

const typeDefs=`
scalar Date
scalar URL


type Keywords {
    id:ID!
    keyword:String
}

type MaterialTypes {
    id:ID!
    typeName:String
}


type Material {
    id:ID!
    title:String
    description:String
    picture:URL
    createdAt:Date
    materialType:MaterialTypes
    donor:[String]
    keyword:[String]
    identificationNum:[String]
}

type Materials {
    id:ID!
    archivist:String
    material:Material
}

type Query {
    materials:[Materials]
}


`;



export default makeExecutableSchema({ resolvers, typeDefs});
