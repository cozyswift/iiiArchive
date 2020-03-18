import { DateTimeResolver, URLResolver } from 'graphql-scalars';
import {materialList,imgList,Material,ImageArr,MaterialTypes,keyword} from '../db';

const resolvers = {
  Date: DateTimeResolver,
  URL: URLResolver,

  Material: {
    // materialType(typeId: any) {
    //   return materialTypes.find(mTypes => mTypes.typeName === 'jpg');
    // },

    picture(root: any) {
     
      const result = imgList.filter(word => word.materialId==root.id);

   
      return result
    },
  },

  // Materials: {
  //   material(findMaterial: any) {
  //     return material.find(m => m.id === findMaterial.id);
  //   },
  // },

  

  Query: {
    materialList() {
  
      return materialList;
    },

    material(root: any, { materialId }: any) {
      
      const result = materialList.find(m => m.id === materialId);
     
     
      return result;
    },

    // archivistID({ archivistId }: any){
    //   const findMaterial=materials.find(mts=>mts.id===archivistId);
    //   if(findMaterial && findMaterial.archivist){
    //     const result=material.find(material=>material.archivistId===findMaterial.archivist);
    //     const archivist=result?.archivistId;
    //     return archivist;
    //   }
    // }
    
  },

  Mutation: {
    addMaterial(root: any, { title,archivistId }: any) {
      console.log('root', { root });
      console.log('title', { title });
      console.log('archivis', { archivistId });


      const newMaterialId = (materialList.length + 1).toString();
      console.log({newMaterialId});
      const newArchivistId = archivistId;
      const newDescription = 'test';
      const imgArr={
        id:(imgList.length+1).toString(),
        regUser:archivistId,
        fileName:"네임 테스트",
        examUrl:["https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80%22"],
        width:"",
        height:"",
        tag:["tag"],
        regIp:"",
        fileType:"jpg",
        materialId:newMaterialId
    };

      const newCreatedAt = new Date();
      const newCreator = 'test';
      const newMaterialType: any = 'jpg';
      const newDonor: [] = [];
      const newKeyword: [] = [];
      const newIdentificationNum: [] = [];
      const newTitle = title;

      imgList.push(imgArr);
      
      const newMaterial = {
        id: newMaterialId,
        archivistId: newArchivistId,
        title: newTitle,
        description: newDescription,
        picture: [imgList.find(m=>m.materialId===newMaterialId)],
        createdAt: newCreatedAt,
        creator: newCreator,
        materialType: newMaterialType,
        donor: newKeyword,
        keyword: newKeyword,
        identificationNum: newIdentificationNum,
      };

      console.log({newMaterial});
      materialList.push(newMaterial);
      

      // console.log({imageArr})
      // console.log({material});
      
      
      const result=materialList.map((m)=>{
        materialList.find(m=>{m.archivistId===archivistId})  ;
      });
      console.log({imgList})
      console.log({result});

      // console.log(material.find(m => m.archivistId === archivistId));

      return newMaterial;
    },
  },
};

export default resolvers;
