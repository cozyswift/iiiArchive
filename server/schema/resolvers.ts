import { DateTimeResolver, URLResolver } from 'graphql-scalars';
import { materials,material } from '../db';

const resolvers = {
  Date: DateTimeResolver,
  URL: URLResolver,

  // Material:{
  //   id(){

  //   },
  //   title(){
  //   }
  // },

  Materials:{
    material(findMaterial:any){
      console.log(findMaterial)
      return material.find(m=>m.id===findMaterial.id)
    }
  },

  Query: {
    materials(){
      return materials;
    }
  },
};

export default resolvers;
