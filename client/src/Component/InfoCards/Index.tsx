import React from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import InfoCard from "./InfoCard";
import { History } from 'history';

const InfoCardGrid = styled(Grid)``;
const OneSecContainer = styled(Grid)`
  background-color: #1e1e1e;
  height: 100vh;
`;

interface MaterialsListScreenProps {
  history: History;
}


function InfoCards({history}:MaterialsListScreenProps) {
  return (
    <OneSecContainer
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
    >
      <Grid container direction="row" justify="center" alignItems="center">
        <InfoCard history={history}/>
      </Grid>
    </OneSecContainer>
  );
}

export default InfoCards;
