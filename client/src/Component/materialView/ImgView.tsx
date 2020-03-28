import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { ImgArr, OptionalMaterialResult, MaterialImgeResult } from ".";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rightSide: {
      width: "49%",
      display: "inline-block",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        display: "block"
      },
     
    }
  })
);

interface ImageParam{
  picture:any
}

function ImgView({picture}:ImageParam) {
 
  const classes = useStyles();
  return (
    <Grid container className={classes.rightSide} spacing={0}>
      {picture[0]?picture[0].examUrl :"이미지 없음"}
    </Grid>
  );
}

export default ImgView;
