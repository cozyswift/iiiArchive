import React, { useState } from "react";
import { createStyles, makeStyles, withStyles, Theme } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    margin: {
      margin: theme.spacing(1)
    }
  })
);

const ValidDescriptionField = withStyles({
  root: {
    // + filedset을 선택한다 //인접 선택자
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important" // override inline-style
    }
  }
})(TextField);

interface MaterialDescriptionParam {
  //  setTitleValue(title:string):any;
  //  titleValue:string;
  onMaterialChange(event: any): any;
  newMaterial: any;
}

function MaterialDescription({
  onMaterialChange,
  newMaterial
}: MaterialDescriptionParam) {
  const classes = useStyles();
  

  // const onTitleChange=({target}:any)=>{
  //     setTitleValue(target.value);
  // }

  return (
  
      <ValidDescriptionField
        className={classes.margin}
        label="내용"
        required
        variant="outlined"
        name="description"
        value={newMaterial.description}
        id="validation-outlined-input"
        onChange={onMaterialChange}
      />
      
  );
}

export default MaterialDescription;
