import { importSchema } from 'graphql-import';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import resolvers from './resolvers';


const typeDefs = importSchema('schema/typeDefs.graphql');

//타입을 만들때 id가 없으면 useQuery를 사용할때 에러가 발생한다.

export default makeExecutableSchema({
    resolvers: resolvers as IResolvers,
    typeDefs,
  });