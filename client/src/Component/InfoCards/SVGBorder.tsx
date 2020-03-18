import React from "react";
import { styled, makeStyles, createStyles, Theme } from "@material-ui/core";
import zIndex from "@material-ui/core/styles/zIndex";
import transitions from "@material-ui/core/styles/transitions";

const DivBorder = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    svgStyle: {
      position: "absolute",
      // top: -8,
      // left: -8,
      width: "calc(100%)",
      height: "calc(100%)"
    },

    svg_hover_highlight: {
      strokeWidth: 8,
      color: "rgb(255, 255, 255)",
      strokeDashoffset: "calc(var(--highlight-dash)*2)",
      transition: theme.transitions.create(["stroke-dashoffset"], {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.complex
      })
    }
  })
);

type dValueArray = {
  LeftLineStartPoint: string;
  LeftLineEndPoint: string;
  LeftBottomConerRadiusLine: string;
  BottomLineEndPoint: string;
  RightBottomConerRaidusLine: string;
  RightLineEndPoint: string;
  RightTopConerRaiusLine: string;
  TopLineEndPoint: string;
};

type SVGBorderValue = {
  dValueArr: dValueArray;
};

function SVGBorder({ dValueArr }: SVGBorderValue) {
  const classes = useStyles();
  const dValue =
    dValueArr.LeftLineStartPoint +
    dValueArr.LeftLineEndPoint +
    dValueArr.LeftBottomConerRadiusLine +
    dValueArr.BottomLineEndPoint +
    dValueArr.RightBottomConerRaidusLine +
    dValueArr.RightLineEndPoint +
    dValueArr.RightTopConerRaiusLine +
    dValueArr.TopLineEndPoint;

  return (
    <DivBorder>
      <svg className={classes.svgStyle}>
        <path
          className={classes.svg_hover_highlight}
          d={dValue}
          fill="transparent"
          stroke="#BC243C"
        />
      </svg>
    </DivBorder>
  );
}

export default SVGBorder;
