import { DateTimeResolver, URLResolver } from 'graphql-scalars';
import {
  materialList,
  imgList,
  Material,
  ImageArr,
  MaterialTypes,
  Keyword,
  archivists,
  Archivist,
} from '../db';
import { Resolvers } from '../types/graphql';
import { withFilter } from 'apollo-server-express';
import { secret, expiration } from '../env';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateLength, validatePassword } from '../validators';

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  URL: URLResolver,

  Material: {
    picture(root) {
      const result = imgList.filter(img => img.materialId == root.id) || null;

      return result;
    },
  },

  Query: {
    me(root, args, { currentArchivist }) {
      return currentArchivist || null;
    },
    materialList() {
      return materialList;
    },

    material(root, { materialId }, { currentArchivist }) {
      const result = materialList.find(m => m.id === materialId);

      return result || null;
    },

    archivist(root, args, { currentArchivist }) {
      if (!currentArchivist) return [];

      return archivists.filter(a => a.id !== currentArchivist.id);
    },
  },

  Mutation: {
    signIn(root, { archivistID, archivistPW }, { res }) {
      const archivist = archivists.find(
        people => people.archivistId === archivistID
      );

      if (!archivist) {
        throw new Error(`아키비스트를 찾을 수 없습니다.`);
      }
      const passwordsMatch = bcrypt.compareSync(
        archivistID,
        archivist.password
      );

      console.log({passwordsMatch})
      if (!passwordsMatch) {
        throw new Error('비밀번호가 다릅니다');
      }
      const authToken = jwt.sign(archivistID, secret);

      res.cookie('authToken', authToken, { maxAge: expiration });

      return archivist;
    },

    signUp(root, { name, archivistID, archivistPW, passwordConfirm, eMail }) {
      console.log({name})
      validateLength('req.name', name, 3, 50);
      validateLength('req.username', archivistID, 3, 18);
      validatePassword('req.password', archivistPW);

      if (archivistPW !== passwordConfirm) {
        throw Error("req.password and req.passwordConfirm don't match");
      }

      if (archivists.some(u => u.archivistId === archivistID)) {
        throw Error('username already exists');
      }
      const passwordHash = bcrypt.hashSync(archivistPW, bcrypt.genSaltSync(8));
      const archivist: Archivist = {
        id: String(archivists.length + 1),
        password: passwordHash,
        picture: '',
        archivistId: archivistID,
        name,
        eMail: '',
      };
      archivists.push(archivist);
      return archivist;
    },

    addMaterial(root: any, { title, archivistId }: any) {
      console.log('root', { root });
      console.log('title', { title });
      console.log('archivis', { archivistId });

      const newMaterialId = (materialList.length + 1).toString();
      console.log({ newMaterialId });
      const newArchivistId = archivistId;
      const newDescription = 'test';
      const imgArr = {
        id: (imgList.length + 1).toString(),
        regUser: archivistId,
        fileName: '네임 테스트',
        examUrl: [
          'https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80%22',
        ],
        width: '',
        height: '',
        tag: ['tag'],
        regIp: '',
        fileType: 'jpg',
        materialId: newMaterialId,
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
        picture: [imgList.find(m => m.materialId === newMaterialId)],
        createdAt: newCreatedAt,
        creator: newCreator,
        materialType: newMaterialType,
        donor: newKeyword,
        keyword: newKeyword,
        identificationNum: newIdentificationNum,
      };

      materialList.push(newMaterial);

     

      const result = materialList.map(m => {
        materialList.find(m => {
          m.archivistId === archivistId;
        });
      });



      return newMaterial;
    },

    addNewMaterial(root, { newMaterial }: any, { pubsub, currentArchivist }) {
      if (!currentArchivist) return null;
      console.log({ root });
      console.log({ newMaterial });

      materialList.push(newMaterial);
      newMaterial.id = materialList.length + 1;
      console.log(newMaterial);

      pubsub.publish('materialAdded', {
        materialAdded: newMaterial,
      });

      return newMaterial;
    },
  },

  Subscription: {
    materialAdded: {
      subscribe: withFilter(
        function resolverFn(root, args, { pubsub }) {
          return pubsub.asyncIterator('materialAdded');
        },
        function fillterFn({ materialAdded }, args, { currentArchivist }) {
          if (!currentArchivist) return false;

          return [materialAdded.id].includes(currentArchivist.id);
        }
      ),
    },
  },
};

export default resolvers;
