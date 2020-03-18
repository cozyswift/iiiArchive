import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { MaterialQueryResult, OptionalMaterialResult } from ".";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rightSide: {
      width: "49%",
      display: "inline-block",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        display: "block"
      }
    }
  })
);

interface TexitViewParm{
  material:OptionalMaterialResult
}


function TextView({material}:TexitViewParm) {
  const classes = useStyles();

  return (
    <Grid container className={classes.rightSide} spacing={0}>
      Left {material&&(material.description)}

    </Grid>
  );
}

export default TextView;
