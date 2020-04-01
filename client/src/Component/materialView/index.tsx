import React, { useCallback, ComponentProps } from "react";
import { Container } from "@material-ui/core";
import TextView from "./TextView";
import ImageView from "./ImgView";
import MaterialNavbar from "./MaterialNavBar";
import { History } from "history";
import gql from "graphql-tag";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import AddMaterials, { AddMaterialsParam } from "../addMaterials";
import { useGetMaterialQuery } from "../../graphql/types";
import * as queries from "../../graphql/queries";
import {
  isSignedIn
} from "../../services/auth.service";
import { ComponentsProps } from "@material-ui/core/styles/props";
import { RouteComponentProps } from "react-router-dom";
import { DefaultComponentProps } from "@material-ui/core/OverridableComponent";

interface MaterialViewParams {
  materialId: string;
  history: History;
}

export interface MaterialType {
  id: string;
  typeName: string;
}

export interface ImgArr {
  imgId: string;
  regUser: string;
  fileName: string;
  examUrl: Array<URL>;
  width: string;
  height: string;
  tag: Array<string>;
  regIP: string;
  fileType: string;
  materiID: string;
}

export interface MaterialQueryResult {
  id: string;
  archivistId: string;
  picture: Array<ImgArr>;
  description: string;
  title: string;
}

export type OptionalMaterialResult = MaterialQueryResult | null;
export type MaterialImgeResult = Array<ImgArr> | any;

function MaterialView({ materialId, history }: MaterialViewParams) {
  const client = useApolloClient();
  console.log({ materialId });
  // const [material, setMaterial] = useState<OptionalMaterialResult>(null);

  // useMemo(async () => {
  //   const body = await fetch(`http://localhost:4000/graphql`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       query: getMaterialQuery,
  //       variables: { materialId }
  //     })
  //   });

  //   const {
  //     data: { material }
  //   } = await body.json();

  //   setMaterial(material);
  // }, [materialId]);

  // const { loading, error, data } = useQuery<any>(getMaterialQuery, {
  //   variables: { materialId }
  // });

  // const { loading, error, data } = useQuery<any>(getMaterial, {
  //   variables: { materialId }
  // });

  const { loading, error, data } = useGetMaterialQuery({
    variables: { materialId }
  });

  if (loading) return <div>...loading</div>;

  console.log(data);
  if (error) {
    console.log(error.message);
    return <div className={"posts-error-message"}>error occured!</div>;
  }

  if (!data) return null;

  let material = data.material;

  if (material === null || material === undefined) {
    return null;
  }
  client.writeQuery({
    query: queries.material,
    variables: { materialId },
    data: {
      material: {
        ...material
      }
    }
  });
  let trueOrFalse = isSignedIn();
  console.log({trueOrFalse})
  return (
    <Container>
      {trueOrFalse && <AddMaterials material={material} />}
      <MaterialNavbar history={history} />
      <TextView material={material}></TextView>
      {material.picture && <ImageView picture={material.picture}></ImageView>}
    </Container>
  );
}

export default MaterialView;
