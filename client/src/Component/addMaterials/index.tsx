import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useState } from "react";
import * as queries from "../../graphql/queries";
import MaterialInputType from "./MaterialInputType/index";
import { useAddNewMaterialMutation, Material } from "../../graphql/types";
import { ImgArr } from "../materialView";
import { writeMaterialList } from "../../services/cache.service";

export interface AddMaterialsParam {
  // material?: {
  //   id?: string;
  //   archivistId?: string;
  //   description?:string;
  //   imgArr?:any;
  // };
  material: any;
}

interface MaterialListResult {
  materialList: any[];
}

function AddMaterials({ material }: AddMaterialsParam) {
  const [open, setOpen] = useState(false);

  const [newMaterial, setNewMaterial] = useState<any>({
    title: "test",
    description: "test",
    createdAt: new Date(Date.now() - 60 * 1000 * 1000),
    donor: ["test"],
    keyword: ["test"],
    identificationNum: ["test"]
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let archivistId: string;
  if (material && material.archivistId) {
    archivistId = material.archivistId;
  }

  let title = newMaterial.title;
  let materialId = material?.id;

  // const [addMaterial] = useMutation(addMaterialMutation);

  // const [addMaterial] = useAddMaterialMutation();

  // const [addNewMaterial] = useMutation(addNewMaterialMutation);

  const [addNewMaterial] = useAddNewMaterialMutation();

  const onMaterialChange = ({ target }: any) => {
    setNewMaterial({
      ...newMaterial,
      [target.name]: target.value
    });
    // event.preventDefault();
  };

  // const onStoreMaterial = () => {
  //   addMaterial({
  //     variables: { title, archivistId },
  //     optimisticResponse: {
  //       __typename: "Mutation",
  //       addMaterial: {
  //         __typename: "Material",
  //         title,
  //         archivistId
  //       }
  //     },

  //     update: (client, { data }) => {
  //       // if (data && data.addMaterial) {
  //       //   console.log({ data });
  //       //   console.log({ client });
  //       //   client.writeQuery({
  //       //     query: getMaterialList,
  //       //     data: {
  //       //       materialList: data.addMaterial
  //       //     }
  //       //   });
  //       // }

  //       let clientMaterialListData;
  //       try {
  //         clientMaterialListData = client.readQuery({
  //           query: queries.materialList
  //         });
  //       } catch (e) {
  //         return;
  //       }

  //       if (!clientMaterialListData || clientMaterialListData === null) {
  //         return null;
  //       }

  //       if (!clientMaterialListData || clientMaterialListData === undefined) {
  //         return null;
  //       }

  //       client.writeQuery({
  //         query: queries.materialList,
  //         data: {
  //           materialList: clientMaterialListData
  //         }
  //       });
  //     }
  //   });

  //   handleClose();
  //   setNewMaterial("");
  // };

  const onStoreMaterial = () => {
    console.log(newMaterial);
    const a = { ...newMaterial };

    console.log(a);
    addNewMaterial({
      variables: {
        newMaterial: {
          id: newMaterial.id,
          archivistId: newMaterial.archivistId,
          title: newMaterial.title,
          description: newMaterial.description
          // picture: newMaterial.picture,
          // createdAt: newMaterial.createdAt,
          // creator: newMaterial.creator,
          // materialType: newMaterial.materialType,
          // donor: newMaterial.donor,
          // keyword: newMaterial.keyword,
          // identificationNum: newMaterial.identificationNum
        }
      },
      optimisticResponse: {
        __typename: "Mutation",
        addNewMaterial: {
          __typename: "Material",
          id: "7",
          title: newMaterial.title,
          archivistId: newMaterial.archivistId,
          description: newMaterial.description
        }
      },

      update: client => {
        // var clientMaterialListData:any;
        // try {
        //   clientMaterialListData = client.readQuery({
        //     query: queries.materialList
        //   });
        // } catch (e) {
        //   return;
        // }

        // if (!clientMaterialListData || clientMaterialListData === null) {
        //   return null;
        // }

        // if (!clientMaterialListData || clientMaterialListData === undefined) {
        //   return null;
        // }

        // client.writeQuery({
        //   query: queries.materialList,
        //   data: {
        //     materialList: clientMaterialListData
        //   }
        // });

        writeMaterialList(client);
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
      {material && (
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
            <DialogContentText>아카이빙 자료추가</DialogContentText>
            <MaterialInputType
              onMaterialChange={onMaterialChange}
              newMaterial={newMaterial}
            />
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
      )}
    </div>
  );
}

export default AddMaterials;
