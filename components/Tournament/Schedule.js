import React, { useState, useEffect } from "react";
import styles from "../../styles/TournamentDetails.module.css";
import { JoinTeamRow } from "./JoinTeamRow";
import { Footer } from "../../components/Footer";
import axiosinstance from "../../util/axiosInstance";
import { GET_SCHEDULE } from "../../constants/routes";
import { Loader } from "../Loader";
import Moment from "react-moment";
import { Dialog, DialogTitle, DialogActions, Button, Box } from "@mui/material";
import { RAISE_TICKET_BATTLEROYALE } from "../../constants/routes";
import { toast } from "react-toastify";
const Schedule = ({ getData, registered, registeredTeam, tid, status }) => {
  // /:tourneyId/schedules
  const [schedule, setschedule] = useState(null);
  const [selectedround, setselectedround] = useState(1);
  const [rounddata, setrounddata] = useState(null);
  const [teamdata, setteamdata] = useState(null);
  const [openticket, setopenticket] = useState(false);
  const [issuetype, setissuetype] = useState("Timing is not matching");
  const [ticketmessage, setticketmessage] = useState("");
  const [ticketraised, setticketraised] = useState(false);
  const getdata = () => {
    axiosinstance
      .get(`${GET_SCHEDULE}${tid}/schedules`)
      .then((res) => {
        setschedule(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (status == "started" || status == "completed") {
      getdata();
    }
  }, []);
  useEffect(() => {
    if (schedule) {
      const temp = schedule.data.filter(
        (round) => round.roundNumber == selectedround
      );
      if (temp.length > 0) {
        setrounddata(temp[0].groups[0]);
        if (temp[0].groups) {
          setteamdata(temp[0].groups[0]?.teams);
          temp[0]?.groups[0]?.raisedTickets?.forEach((ticket) => {
            if (ticket.raisedBy === registeredTeam) {
              setticketraised(true);
            }
            console.log(ticket.raisedBy);
            console.log(registeredTeam);
          });
        }
      }
    }
  }, [schedule, selectedround]);
  const handleCloseticket = () => {
    setopenticket(false);
  };
  const raiseticket = () => {
    if (ticketmessage === "") {
      toast.error("Please enter a message");
      return;
    }
    axiosinstance
      .post(
        `${RAISE_TICKET_BATTLEROYALE}${rounddata._id}/raise-ticket-battle-royale`,
        {
          teamId: registeredTeam,
          message: ticketmessage,
          type: issuetype,
        }
      )
      .then((res) => {
        getdata();
        toast.success(res.data.message);
        setopenticket(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  if (!schedule) return <Loader />;
  if (!rounddata)
    return (
      <center>
        <h2>Schedule Will Be Updated Soon</h2>
      </center>
    );
  if (!teamdata) return <Loader />;
  if (status == "waiting" || status == "registration") {
    return (
      <center>
        <h2>Tournament Not Started</h2>
      </center>
    );
  }
  if (status == "started" || status == "completed") {
    return (
      <div className={styles.tourSchedule}>
        <Dialog open={openticket} onClose={handleCloseticket} sx={{ width: '100vw' }}>
          <div className={styles.mobiledialog}>
            <DialogTitle id="alert-dialog-title" sx={{ color: "#1b86ed" }}>
              {"What is your concern ?"}
            </DialogTitle>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                margin: "0rem 1rem 0.5rem 1rem",
                color: "white",
                width: "90%",
              }}
            >
              <p style={{ margin: "0" }}>Please select one of the options</p>
              {/* </Box>
          <Box> */}
              <select
                name="issue"
                style={{
                  color: "white",
                  backgroundColor: "transparent",
                  padding: ".2rem .3rem",
                  borderRadius: "5px",
                }}
                onChange={(e) => setissuetype(e.target.value)}
              >
                <option
                  value="Timing is not matching"
                  style={{ color: "black" }}
                >
                  Timing is not matching
                </option>
                <option value="Score is wrong" style={{ color: "black" }}>
                  Score is wrong
                </option>
                <option value="Other" style={{ color: "black" }}>
                  Other
                </option>
              </select>
            </Box>
            <textarea
              placeholder="Enter Here ..."
              cols="50"
              rows="10"
              onChange={(e) => setticketmessage(e.target.value)}
            ></textarea>
            <DialogActions>
              <Button variant="outlined" size="small" onClick={raiseticket}>
                Confirm
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleCloseticket}
              >
                Cancel
              </Button>
            </DialogActions>
          </div>
        </Dialog>
        <div className={styles.tournamentScheduleBox}>
          <div className={styles.inputButtons}>
            <div className={styles.dropDownDiv}>
              <select
                className={styles.dropDown}
                value={selectedround}
                onChange={(e) => setselectedround(parseInt(e.target.value))}
              >
                {schedule.data.map((round) => {
                  return (
                    <option value={round.roundNumber}>
                      {`Round ${round.roundNumber}`}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {registered ? (
            <>
              <div className={styles.tournamentSchedule}>
                <div className={styles.Schedule}>
                  <h5>Schedule</h5>
                  <div>
                    <p className={styles.boldIt}>
                      Date Time <br /> <br />
                      Map <br /> <br />
                      Mode
                    </p>
                    <p className={styles.tournamentschedulevalue}>
                      {rounddata.startTime === ""
                        ? "Will be updated Soon"
                        : (console.log(rounddata.startTime),
                          (
                            <Moment format="DD MMM YY hh:mm A">
                              {rounddata.startTime}
                            </Moment>
                          ))}
                      <br /> <br />
                      {rounddata.map === ""
                        ? "Will be updated Soon"
                        : rounddata.map}
                      <br /> <br />
                      {rounddata.mode === ""
                        ? "Will be updated Soon"
                        : rounddata.mode}
                    </p>
                  </div>
                </div>
                <div className={styles.roomInfo}>
                  <h5>Room Info</h5>
                  <div>
                    <p className={styles.boldIt}>
                      Room id <br /> <br />
                      Room pass <br /> <br />
                      Note
                    </p>
                    <p className={styles.tournamentschedulevalue}>
                      {rounddata.roomId === ""
                        ? "Will Be updated Soon"
                        : rounddata.roomId}
                      <br /> <br />
                      {rounddata.roomPass === ""
                        ? "Will Be updated Soon"
                        : rounddata.roomPass}
                      <br /> <br />
                      {rounddata.note === ""
                        ? "Will Be updated Soon"
                        : rounddata.note}
                    </p>
                  </div>
                </div>
              </div>
              <h5>
                Stream link
                <span>
                  {rounddata.streamLink === ""
                    ? "Will be Updated Soon"
                    : rounddata.streamLink}
                </span>
              </h5>
              {ticketraised ? (
                <button>Ticket Raised</button>
              ) : (
                <button
                  onClick={() => {
                    setopenticket(!openticket);
                  }}
                >
                  Raise Ticket
                </button>
              )}
            </>
          ) : (
            <h1>Register first</h1>
          )}
        </div>
        <div className={styles.joinedTeamsBox}>
          <header>
            <p>Slot no</p>
            <p>Team Name</p>
            <p>Total</p>
            <p>Qualifaction Status</p>
          </header>
          {teamdata.length !== 0 ? (
            teamdata.map((team, index) => {
              return (
                <JoinTeamRow
                  sno={index + 1}
                  teamname={team.team.name}
                  total={team.points}
                  status={team.qualified}
                />
              );
            })
          ) : (
            <h1>No teams joined yet</h1>
          )}
          {/* <JoinTeamRow
          sno={"2"}
          teamname={"Godlike"}
          total={"40"}
          status={true}
          />
          <JoinTeamRow sno={"3"} teamname={"XO"} total={"35"} status={false} />
          <JoinTeamRow
          sno={"4"}
          teamname={"OR esports"}
          total={"28"}
          status={false}
          />
        <JoinTeamRow sno={"5"} teamname={"FATE"} total={"20"} status={""} /> */}
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
};

export default Schedule;
