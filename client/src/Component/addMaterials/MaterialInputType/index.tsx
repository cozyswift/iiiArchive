import React from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";

import { History } from "history";
import MaterialTitle from "./MaterialTitle";
import MaterialDescription from "./MaterialDescription";
import MaterialKeywords from "./MaterialKeywords";

interface MaterialInputTypeParam {
  onMaterialChange(event: any): any;
  newMaterial: any;
}

function MaterialInputType({
  onMaterialChange,
  newMaterial
}: MaterialInputTypeParam) {
  return (
    <React.Fragment>
      <MaterialTitle
        onMaterialChange={onMaterialChange}
        newMaterial={newMaterial}
      />
      <MaterialDescription
        onMaterialChange={onMaterialChange}
        newMaterial={newMaterial}
      />
      <MaterialKeywords
        onMaterialChange={onMaterialChange}
        newMaterial={newMaterial}
      />
    </React.Fragment>
  );
}

export default MaterialInputType;
