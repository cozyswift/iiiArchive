import { importSchema } from 'graphql-import';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import resolvers from './resolvers';

// const typeDef = importSchema('schema/typeDefs.graphql');

const typeDefs = `
scalar Date
scalar URL


type MaterialType {
    id:ID!
    typeName:String!
}


type ImageArr {
    id:ID!
    regUser:String!
    fileName:String!
    examUrl:[URL!]
    width:String
    height:String
    tag:[String]
    regIP:String
    fileType:String
    materialId:String
}

type Material {
    id:ID!
    archivistId:String!
    title:String!
    description:String
    picture:[ImageArr]!
    createdAt:Date!
    creator:String
    materialType:MaterialType
    donor:[String!]
    keyword:[String]
    identificationNum:[String]
}


type Archivist {
    id:ID!
    archivistId:ID!
    name:String!
    material:[Material!]
}

type Query {
    materialList:[Material]
    material(materialId:ID!):Material
    archivist:Archivist
}

type Mutation {
    addMaterial(
       title:String!
       archivistId:String!
        ):Material
}


`;

//타입을 만들때 id가 없으면 useQuery를 사용할때 에러가 발생한다.

export default makeExecutableSchema({
    resolvers: resolvers as IResolvers,
    typeDefs,
  });