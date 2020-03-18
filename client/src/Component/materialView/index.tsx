import React, { useCallback } from "react";
import { Container } from "@material-ui/core";
import TextView from "./TextView";
import ImageView from "./ImgView";
import MaterialNavbar from "./MaterialNavBar";
import { History } from "history";
import gql from "graphql-tag";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import AddMaterials from "../addMaterials";

export const getMaterialQuery = gql`
  query getMaterialQuery($materialId: ID!) {
    material(materialId: $materialId) {
      archivistId
      title
      description
      picture {
        examUrl
      }
    }
  }
`;

interface MaterialViewParams {
  materialId: string;
  match: any;
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
  description:string;
  title:string;

}

export type OptionalMaterialResult = MaterialQueryResult | null;
export type MaterialImgeResult = Array<ImgArr> | any;

function MaterialView({ materialId, match, history }: MaterialViewParams) {
  const client = useApolloClient();

 
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

  const { loading, error, data } = useQuery<any>(getMaterialQuery, {
    variables: { materialId }
  });

  if (loading) return <div>...loading</div>;

  if (error) {
    console.log(error.message);
    return <div className={"posts-error-message"}>error occured!</div>;
  }

  const { material } = data;


  if (!material) return null;

  client.writeQuery({
    query: getMaterialQuery,
    variables: { materialId },
    data: {
      material: {
        ...material
      }
    }
  });

  return (
    <Container>
      <AddMaterials material={material} />
      <MaterialNavbar history={history} />
      <TextView material={material}></TextView>
      {material.picture && (
        <ImageView picture={material.picture}></ImageView>
      )}
    </Container>
  );
}

export default MaterialView;
