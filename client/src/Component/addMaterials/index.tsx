import React, { useMemo, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useState } from "react";
import { Input } from "@material-ui/core";
import MaterialPicture from "./MaterialPicture";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getMaterialList } from "../InfoCards/InfoCard";
import MaterialInputType from "./MaterialInputType";
import * as queries from "../../graphql/queries";
import client from "../../client";


// const getArchivistID = gql`
// query GetArchivistID($materialsId:Any){
//     archivistID(materialsId:$materialsId){
//         mate
//     }
// }
// `;

const addMaterialMutation = gql`
  mutation AddMaterial($title: String!, $archivistId: String!) {
    addMaterial(title: $title, archivistId: $archivistId) {
      title
      archivistId
    }
  }
`;

interface AddMaterialsParam {
  material: any;
}

interface MaterialListResult {
  materialList: any[];
}

function AddMaterials({ material }: AddMaterialsParam) {
  const [open, setOpen] = useState(false);
  // const [titleValue, setTitleValue] = useState<string>("");
  const [newMaterial, setNewMaterial] = useState<any>({
    archivistId: "",
    title: "",
    description: "",
    picture: [],
    createdAt: new Date(Date.now() - 60 * 1000 * 1000),
    creator: "",
    materialType: "",
    donor: [],
    keyword: [],
    identificationNum: []
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let archivistId = material.archivistId;
  let title = newMaterial.title;
  let materialId = material.id;

  const [addMaterial] = useMutation(addMaterialMutation);

  const onMaterialChange = ({ target }: any) => {
    setNewMaterial({
      ...newMaterial,
      [target.name]: target.value
    });
    // event.preventDefault();
  };

  const onStoreMaterial = () => {
    addMaterial({
      variables: { title, archivistId },
      optimisticResponse: {
        __typename: "Mutation",
        addMessage: {
          __typename: "Material",
          title,
          archivistId
        }
      },

      update: (client, { data }) => {
        // if (data && data.addMaterial) {
        //   console.log({ data });
        //   console.log({ client });
        //   client.writeQuery({
        //     query: getMaterialList,
        //     data: {
        //       materialList: data.addMaterial
        //     }
        //   });
        // }

        let clientMaterialListData;
        try{
          clientMaterialListData = client.readQuery({
            query: getMaterialList
          });
  
        } catch(e){
          return;
        }
        
        if (!clientMaterialListData || clientMaterialListData === null) {
          return null;
        }

        if (!clientMaterialListData|| clientMaterialListData === undefined) {
          return null;
        }

        client.writeQuery({
          query: getMaterialList,
          data:{
            materialList:clientMaterialListData
          }
        });

      }
    });

    handleClose();
    setNewMaterial("");
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        아카이빙 자료 추가
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"아카이빙 자료 추가하기"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
          <MaterialInputType
            onMaterialChange={onMaterialChange}
            newMaterial={newMaterial}
          />
          {/* <MaterialPicture
            onMaterialChange={onMaterialChange}
            newMaterial={newMaterial}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={onStoreMaterial} color="primary" autoFocus>
            자료추가
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddMaterials;
