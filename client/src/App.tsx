import React from "react";
import "./App.css";
import { Container, Grid } from "@material-ui/core";
import InfoCards from "./Component/InfoCards/Index";
import styled from "styled-components";
import {
  BrowserRouter,
  Route,
  Redirect,

  RouteComponentProps
} from "react-router-dom";
import MaterialView from "./Component/materialView";
import AnimatedSwitch from './Component/AnimatedSwitch';

const OneSecContainer = styled(Grid)`
  background-color: #1e1e1e;
  height: 100vh;
`;

const redirectToChats = () => <Redirect to="/materials" />;

function App() {
  return (
    <BrowserRouter>
      <AnimatedSwitch>
     
        <Route exact path="/materials" component={InfoCards} />
        <Route
          exact
          path="/materials/:materialId"
          component={({
            match,history
          }: RouteComponentProps<{ materialId: string }>) => (
            <MaterialView materialId={match.params.materialId} match={match} history={history}/>
          )}
        />
       
      </AnimatedSwitch>
      <Route exact path="/" render={redirectToChats} />
    </BrowserRouter>
  );
}

export default App;
