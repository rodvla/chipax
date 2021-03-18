import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grid,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width: 800,
  },
  grid: {
    display: "flex",
  },
  title: {
    backgroundColor: "white",
  },
});

export default function Tabla() {
  const classes = useStyles();
  const matches = useSelector((state) => state.matches);
  const locations = useSelector((state) => state.locations);
  const time = useSelector((state) => state.time);

  return (
    <Grid align="center">
      <Grid>
        <img
          src={"./chipax.jpg"}
          alt="chipax"
          width={"120px"}
          height={"60px"}
        />
        <Typography className={classes.title}>
          Rick and Morty Challenge
        </Typography>
      </Grid>
      <TableContainer align="center" component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <Typography>Apariciones letra L en Locations</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography>Apariciones letra E en Episodes</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography>Apariciones letra C en characters</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography>Tiempo Challenge (ms)</Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell align="center">
                <Chip
                  label={<Typography>{matches[0]}</Typography>}
                  color="secondary"
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <Chip
                  label={<Typography>{matches[1]}</Typography>}
                  color="secondary"
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <Chip
                  label={<Typography>{matches[2]}</Typography>}
                  color="secondary"
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <Chip
                  label={<Typography>{time}</Typography>}
                  color="secondary"
                />
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer align="center" component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <Typography>Episodio</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography>Locations(origin) diferentes</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography>Nombres</Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="center">
                  <Chip
                    label={<Typography>{row.id}</Typography>}
                    color="primary"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Chip
                    label={<Typography>{row.locations.length}</Typography>}
                    color="primary"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.locations.map((location) => (
                    <Chip
                      label={<Typography>{location}</Typography>}
                      color="green"
                      style={{ margin: 5 }}
                    />
                  ))}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
