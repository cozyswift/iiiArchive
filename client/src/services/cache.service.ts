import { DataProxy } from "apollo-cache";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import * as fragments from "../graphql/fragment";
import * as queries from "../graphql/queries";
import {
  useMaterialAddedSubscription,
  MaterialFragment,
  Material
} from "../graphql/types";
import { type } from "os";

type Client = DataProxy 

export function useCacheService() {
  useMaterialAddedSubscription({
    // onSubScriptionData는 구독 컴포넌트와 useSubscription
    // 훅이 데이터를 수신 할때 마다 트리거되는 콜백함수 등록을 허용한다.
    // 매개변수는 현재 클라이언트의 Apollo client 인스턴스와 subscriptioData의 수신 된 구독데이터로 구성됩니다.
    //(options: OnSubscriptionDataOptions<TData>) => any
    onSubscriptionData: ({ client, subscriptionData: { data } }) => {
      if (data) {
        writeMaterial(client, data.materialAdded);
      }
    }
  });
}

export function writeMaterial(client: Client, material: MaterialFragment) {
  type MaterialList = { [key: string]: any };
  let materialList: any;

  const materialIdFromStore = defaultDataIdFromObject(material);

  console.log(materialIdFromStore);
  if (materialIdFromStore === null) {
    return;
  }

  try {
    materialList = client.readFragment<Material>({
      id: materialIdFromStore,
      fragment: fragments.materialList,
      fragmentName: "MaterialList"
    });

    console.log({materialList});
  } catch (e) {
    return;
  }

  if (materialList === null) {
    return;
  }

  if(materialList.some((m:any)=>m.id===material.id)) return;

  materialList.push(material);


  client.writeFragment({
      id:materialIdFromStore,
      fragment:fragments.materialList,
      fragmentName:'MaterialList',
      data:materialList,
  });


  
}
