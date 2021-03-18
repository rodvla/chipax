import { Grid } from "@material-ui/core";
import React from "react";
import Fondo from "./components/Fondo/Fondo";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  grid: {
    display: "flex",
    justifyContent: "center",
    background:
      "url(https://www.chipax.com/wp-content/uploads/2020/03/chipax_dashboard.png)",
  },
});

export default function App() {
  const classes = useStyles();
  return (
    <Grid className={classes.grid}>
      <Fondo />
    </Grid>
  );
}
