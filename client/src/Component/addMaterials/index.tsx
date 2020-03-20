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
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

// import { useAddMaterialMutation,GetMaterialListQuery } from "../../graphql/types";
import * as queries from "../../graphql/queries";
import MaterialInputType from "./MaterialInputType/index";

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

const addNewMaterialMutation = gql`
  mutation AddNewMaterial($newMaterial: InputMaterial) {
    addNewMaterial(newMaterial: $newMaterial) {
      id
      title
      archivistId
      description
    }
  }
`;

interface AddMaterialsParam {
  material?: {
    id?: string;
    archivistId?: string;
  };
}

interface MaterialListResult {
  materialList: any[];
}

function AddMaterials({ material }: AddMaterialsParam) {
  const [open, setOpen] = useState(false);
  // const [titleValue, setTitleValue] = useState<string>("");
  // const [newMaterial, setNewMaterial] = useState<any>({
  //   id: "",
  //   archivistId: "",
  //   title: "",
  //   description: "",
  //   picture: [],
  //   createdAt: new Date(Date.now() - 60 * 1000 * 1000),
  //   creator: "",
  //   materialType: "",
  //   donor: "",
  //   keyword: "",
  //   identificationNum: []
  // });

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

  const [addNewMaterial] = useMutation(addNewMaterialMutation);

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
          __typename: "InputMaterial",
          archivistId: newMaterial.archivistId,
          title: newMaterial.title,
          description: newMaterial.description
        }
      },

      update: (client, { data }) => {
        let clientMaterialListData;
        try {
          clientMaterialListData = client.readQuery({
            query: queries.materialList
          });
        } catch (e) {
          return;
        }

        if (!clientMaterialListData || clientMaterialListData === null) {
          return null;
        }

        if (!clientMaterialListData || clientMaterialListData === undefined) {
          return null;
        }

        client.writeQuery({
          query: queries.materialList,
          data: {
            materialList: clientMaterialListData
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
