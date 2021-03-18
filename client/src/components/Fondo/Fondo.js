import React, { useEffect } from "react";
import Tabla from "../Tabla/Tabla";
import { useDispatch } from "react-redux";
import { getChallenge } from "../../actions/index";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  grid: {
    width: 800,
  },
});

export default function Fondo() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChallenge());
  }, []);

  return (
    <Grid alignContent="center" className={classes.grid}>
      <Tabla />
    </Grid>
  );
}
