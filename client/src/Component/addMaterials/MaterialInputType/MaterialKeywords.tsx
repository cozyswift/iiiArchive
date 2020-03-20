import React from "react";
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

const ValidationKeywordsField = withStyles({
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

interface MaterialKeywordsParam {
  onMaterialChange(event: any): any;
  newMaterial: any;
}

function MaterialKeywords({
  onMaterialChange,
  newMaterial
}: MaterialKeywordsParam) {
  const classes = useStyles();

  return (
    <ValidationKeywordsField
      className={classes.margin}
      label="키워드"
      required
      variant="outlined"
      name="keyword"
      value={newMaterial.keyword}
      id="validation-outlined-input"
      onChange={onMaterialChange}
    />
  );
}

export default MaterialKeywords;