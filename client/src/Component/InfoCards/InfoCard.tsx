import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Paper,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Button,
  CardActions,
  CardMedia
} from "@material-ui/core";
import { useCallback } from "react";
import { History } from "history";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import * as queries from "../../graphql/queries";
import { material } from "../../graphql/fragment";
import SVGBorder from "./SVGBorder";
import { useGetMaterialListQuery,useAddMaterialMutation } from "../../graphql/types";

import gql from "graphql-tag";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 275,
      backgroundColor: "#1E1E1E",
      color: "white",
      fontWeight: 700,
      fontSize: 20,
      borderRadius: 25,
      position: "relative",
      marginRight: 45
    },
    cardStyle: {
      minWidth: 275,
      backgroundColor: "#1E1E1E",
      color: "white",
      fontWeight: 700,
      fontSize: 20,
      borderRadius: 25,
      position: "relative"
    },
    imgSize: {
      height: 400,
      width: 300
    },
    cardContentStyle: {
      paddingLeft: 16
    },
    cardActionStyle: {
      color: theme.palette.primary.main,
      padding: 8
    }
  })
);

const dValueArr: any = {
  LeftLineStartPoint: "M 0 110",
  LeftLineEndPoint: "L 0 485",
  LeftBottomConerRadiusLine: "A 25 25 0 0 0 25 510",
  BottomLineEndPoint: "L 275 510",
  RightBottomConerRaidusLine: "A -25 -25 0 0 0 300 485",
  RightLineEndPoint: "L 300 25",
  RightTopConerRaiusLine: "A 25 -25 0 0 0 275 0",
  TopLineEndPoint: "L 230 0"
};

interface MaterialsListProps {
  history: History;
}

// export const getMaterialList = gql`
//   query GetMaterialList {
//     materialList {
//       id
//       title
//       archivistId
//       keyword
//       picture {
//         examUrl
//       }
//     }
//   }
// `;

function InfoCard({ history }: MaterialsListProps) {
  const classes = useStyles();
  const client = useApolloClient();
  // const { loading, error, data } = useQuery<any>(getMaterialList);

  const { loading, error, data } = useGetMaterialListQuery();



  const navToMaterials = useCallback(
    material => {
      history.push(`materials/${material.id}`);
    },
    [history]
  );

  if (loading) return <div>...loading</div>;

  if (error) {
    console.log(error.message);
    return <div className={"posts-error-message"}>{error.message}</div>;
  }

  if (data === undefined || data.materialList === undefined) {
    return null;
  }

  let materialList = data.materialList;

  client.writeQuery({
    query: queries.materialList,
    data: {
      materialList
    }
  });

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {materialList?.map((material: any) => (
        <Paper elevation={0} className={classes.root} key={material.id}>
          <Card className={classes.cardStyle}>
            <CardActionArea onClick={navToMaterials.bind(null, material)}>
              <CardContent className={classes.cardContentStyle}>
                <Typography data-testid="archvist">
                  {material.archivistId}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActionStyle}>
              <Button
                size="small"
                className={classes.cardActionStyle}
                data-testid="keyword"
              >
                {material.keyword}
              </Button>
            </CardActions>

            <CardActionArea>
              <CardMedia
                className={classes.imgSize}
                component="img"
                data-testid="picture"
                // src={material.picture[0].examUrl}
                src={material.picture[0] ? material.picture[0].examUrl : null}
              />
            </CardActionArea>
            <SVGBorder dValueArr={dValueArr}></SVGBorder>
          </Card>
        </Paper>
      ))}
    </Grid>
  );
}

export default InfoCard;
