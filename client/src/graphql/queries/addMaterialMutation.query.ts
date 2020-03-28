import gql from 'graphql-tag';

export const addMaterialMutation = gql`
  mutation AddMaterial($title: String!, $archivistId: String!) {
    addMaterial(title: $title, archivistId: $archivistId) {
      title
      archivistId
    }
  }
`;

export const addNewMaterialMutation = gql`
  mutation AddNewMaterial($newMaterial: InputMaterial) {
    addNewMaterial(newMaterial: $newMaterial) {

      title
      archivistId
      description
    }
  }
`;