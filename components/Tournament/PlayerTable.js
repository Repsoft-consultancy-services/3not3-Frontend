import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import styles from "../../styles/TournamentDetails.module.css";
import Link from "next/link";

const useStyles = makeStyles({
  paper: {
    color: "white !important",
    border: "0 !important",
    backgroundColor: "transparent !important",
  },
  table: {
    color: "white !important",
    backgroundColor: "#1b1f34",
    borderCollapse: "separate !important",
    borderSpacing: "0px 10px !important",
    border: "0 !important",
  },
  tableRow: {
    padding: "10px",
    backgroundColor: "#0B0F20 !important",
    cursor: "pointer",
    color: "#FFFFFF !important",
    marginTop: "8px",
    borderRadius: "10px",
    marginBottom: "15px",
    "&:hover": {
      backgroundColor: "#171730 !important",
    },
  },
  tableCell: {
    padding: "10px",
    backgroundColor: "#0B0F20 !important",
    border: " 0 !important",
    marginTop: "8px",
    color: "#fff !important",
    // fontSize: "16px",
  },
  tableCell2: {
    padding: "20px",
    backgroundColor: "#0B0F20 !important",
    border: " 0 !important",
    marginTop: "8px",
    color: "#fff !important",
    fontSize: "20px",
    fontWeight: "bolder",
  },
  pagination: {
    color: "white !important",
    backgroundColor: "#0B0F20 !important",
  },
  tablePagination: {},
  tablePaginationCaption: {
    color: "white",
  },
  tablePaginationSelectIcon: {
    color: "white",
  },
  tablePaginationArrowSelection: {
    color: "white",
  },
  tablePaginationSelect: {
    color: "white",
  },
  tablePaginationActions: {
    color: "white",
  },
});

const PlayerTable = ({ teams }) => {
  const classes = useStyles();
  // console.log(teams);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div className={styles.playerTable}>
      {/* <div className={styles.inputButtons}>
        <div className={styles.blueButtonDiv}>
          <button className={styles.blueButton}>All</button>
        </div>
        <div className={styles.dropDownDiv}>
          <select className={styles.dropDown}>
            <option value="Stage">Stage</option>
            <option value="Valorant">Valorant</option>
            <option value="Dota2">Dota 2</option>
            <option value="Fortnite">Fortnite</option>
          </select>
        </div>
        <div className={styles.dropDownDiv}>
          <select className={styles.dropDown}>
            <option value="Group">Group</option>
            <option value="Solo">Solo</option>
            <option value="Duo">Duo</option>
            <option value="Team">Team</option>
          </select>
        </div>
        <div className={styles.dropDownDiv}>
          <select className={styles.dropDown}>
            <option value="Match">Match</option>
            <option value="Name">Name</option>
            <option value="Popularity">Popularity</option>
            <option value="id">Id</option>
          </select>
        </div>
      </div> */}
      {teams.length !== 0 ? (
        <>
          {" "}
          <Paper
            className={classes.paper}
            sx={{ width: "100%", overflow: "hidden" }}
          >
            <TableContainer sx={{ maxHeight: 840 }}>
              <Table className={classes.table} aria-label="Table" hover>
                <TableHead>
                  <TableRow hover>
                    <TableCell className={classes.tableCell2}>
                      <>Participants</>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teams
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <>
                          <Link
                            passHref
                            key={index}
                            href={`/teams/${encodeURIComponent(row._id)}`}
                          >
                            <TableRow
                              // className={styles.tableCell}
                              component="th"
                              scope="row"
                              style={{
                                // width: 200,
                                display: "flex",
                                alignItems: "center",
                                marginTop: 8,
                              }}
                              className={classes.tableRow}
                            >
                              <img
                                className={styles.teamLogoImages}
                                src={row.teamLogo}
                              />
                              <div style={{ marginLeft: "15px" }}>
                                {row.name}
                              </div>
                            </TableRow>
                          </Link>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              classes={{
                root: classes.tablePagination,
                caption: classes.tablePaginationCaption,
                selectIcon: classes.tablePaginationSelectIcon,
                select: classes.tablePaginationSelect,
                actions: classes.tablePaginationActions,
                // menuItem: classes.tablePaginationMenuItem,
              }}
              className={classes.pagination}
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={teams.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>{" "}
        </>
      ) : (
        <center>
          <p>No teams</p>
        </center>
      )}
    </div>
  );
};

export default PlayerTable;
