import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/TournamentDetails.module.css";
import Message from "./Message";
import Image from "next/image";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../../firebase/firebase";
import teamLogo from "../../assets/img/profilebanner.jpg";
import { CHECK_IN, GET_MATCHES, RAISE_TICKET } from "../../constants/routes";
import axiosinstance from "../../util/axiosInstance";
import { Loader } from "../Loader";
import { toast } from "react-toastify";
import Moment from "react-moment";
import { Dialog, DialogTitle, DialogActions, Button, Box } from "@mui/material";
const Chatter = ({ bracket, teamid, registeredTeam }) => {
  const [open, setOpen] = useState(false);
  const [matches, setmatches] = useState(null);
  const [chats, setChats] = useState([]);
  const [proof, setProof] = useState();
  const [selectedround, setselectedround] = useState(1);
  const [rounddata, setrounddata] = useState(null);
  const [message, setmessage] = useState("");
  const [myTeam, setmyTeam] = useState();
  const [measop, setmeasOp] = useState(null);
  const [checker, setChecker] = useState(false);
  const [proofUploaded, setProofUploaded] = useState(false);
  const [proofnum, setProofnum] = useState("");
  const [otherTeam, setOtherTeam] = useState();
  const [otherTeamProof, setOtherTeamProof] = useState(false);
  const [ticketraised, setticketraised] = useState(false);
  const [issuetype, setissuetype] = useState("Timing is not matching");
  const [ticketmessage, setticketmessage] = useState("");
  const getdata = () => {
    axiosinstance
      .post(`${GET_MATCHES}${bracket}/matches`, {
        teamId: registeredTeam,
      })
      .then((res) => {
        setmatches(res.data);
        if (
          res.data.data.participantId ===
          res.data.data.matches[selectedround - 1].opponent1.id
        ) {
          setmyTeam(res.data.data.matches[selectedround - 1].opponent1.name);
          setmeasOp("opponent1");
          setProofnum("proof1");
        } else {
          setOtherTeam(res.data.data.matches[selectedround - 1].opponent1.name);
        }
        if (
          res.data.data.participantId ===
          res.data.data.matches[selectedround - 1].opponent2.id
        ) {
          setmyTeam(res.data.data.matches[selectedround - 1].opponent2.name);
          setmeasOp("opponent2");
          setProofnum("proof2");
        } else {
          setOtherTeam(res.data.data.matches[selectedround - 1].opponent2.name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const checkInUser = () => {
    console.log("me:", measop);
    axiosinstance
      .post(`${CHECK_IN}${bracket}/checkin`, {
        matchId: matches.data.matches[selectedround - 1].id,
        participantId: matches.data.participantId,
      })
      .then((res) => {
        setChecker(true);
        getdata();
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (matches) {
      console.log("Hello Match ID", matches.data.matches[selectedround - 1].id);

      // if (matches.data.matches[selectedround - 1].id) {
      const ref = collection(
        db,
        "brackets",
        bracket,
        String(selectedround - 1),
        "matches",
        `${matches.data.matches[selectedround - 1].id}`
      );
      const allRef = query(ref, orderBy("timestamp", "asc"));
      onSnapshot(allRef, (docs) => {
        setChats(docs.docs.map((doc) => doc.data()));
      });
    }
  }, [matches, selectedround]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUploadProof = () => {
    const formdata = new FormData();
    formdata.append("proof", proof);
    formdata.append("matchId", matches.data.matches[selectedround - 1].id);
    formdata.append("participantId", matches.data.participantId);
    axiosinstance
      .post(`${CHECK_IN}${bracket}/match/proof`, formdata)
      .then((res) => {
        toast.success(res.data.message);
        setProofUploaded(true);
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  useEffect(() => {
    // scrollToBottom();
  }, [chats]);

  useEffect(() => {
    if (matches) {
      if (
        matches.data.participantId ===
        matches.data.matches[selectedround - 1].opponent1?.id
      ) {
        setmyTeam(matches.data.matches[selectedround - 1].opponent1?.name);
        setmeasOp("opponent1");
      } else {
        setOtherTeam(matches.data.matches[selectedround - 1].opponent1?.name);
      }
      if (
        matches.data.participantId ===
        matches.data.matches[selectedround - 1].opponent2?.id
      ) {
        setmyTeam(matches.data.matches[selectedround - 1].opponent2?.name);
        setmeasOp("opponent2");
      } else {
        setOtherTeam(matches.data.matches[selectedround - 1].opponent2?.name);
      }

      const temp = matches.data.matches.filter(
        (round) => round.round_id == selectedround - 1
      );
      if (temp[0]) {
        setrounddata(temp[0]);
      }
      setticketraised(
        matches.data.matches[selectedround - 1].extras.interference
      );
      if (
        matches.data.matches[selectedround - 1].extras.proof1 &&
        proofnum === "proof1"
      ) {
        setProofUploaded(true);
      }
      if (
        matches.data.matches[selectedround - 1].extras.proof1 &&
        proofnum === "proof2"
      ) {
        setOtherTeamProof(true);
      }
      if (
        matches.data.matches[selectedround - 1].extras.proof2 &&
        proofnum === "proof2"
      ) {
        setProofUploaded(true);
      }
      if (
        matches.data.matches[selectedround - 1].extras.proof2 &&
        proofnum === "proof1"
      ) {
        setOtherTeamProof(true);
      }
      console.log("other", otherTeamProof);
      console.log("mine", proofUploaded);
    }
  }, [matches, selectedround, proofUploaded, proofnum, otherTeamProof]);
  const postMessage = (e) => {
    e.preventDefault();
    if (message === "") {
      // alert("Please enter a Text");
      return;
    }
    addDoc(
      collection(
        db,
        "brackets",
        bracket,
        String(selectedround - 1),
        "matches",
        String(matches.data.matches[selectedround - 1].id)
      ),
      {
        name: myTeam,
        message: message,
        timestamp: serverTimestamp(),
      }
    );
    setmessage("");
  };
  const raiseticket = () => {
    axiosinstance
      .post(`${RAISE_TICKET}${bracket}/raise-ticket`, {
        matchId: matches.data.matches[selectedround - 1].id,
        issueType: issuetype,
        message: ticketmessage,
      })
      .then((res) => {
        toast.success(res.data.message);
        setticketraised(true);
        handleClose();
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };
  useEffect(() => {
    getdata();
  }, []);
  if (!matches) return <Loader />;
  if (!rounddata) return <Loader />;

  return (
    <div className={styles.Chatter}>
      <Dialog open={open} onClose={handleClose}>
        <div>
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
              <option value="Timing is not matching" style={{ color: "black" }}>
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
            <Button variant="outlined" size="small" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <h2>
        Round {selectedround}, Match{" "}
        {matches.data.matches[selectedround - 1].number}
      </h2>
      <hr />
      <div className={styles.selectRound}>
        <span>
          <label for="Round">Select Round</label>
          <select
            name="Round"
            value={selectedround}
            onChange={(e) => setselectedround(parseInt(e.target.value))}
          >
            {matches.data.matches.map((match, index) => {
              return <option value={index + 1}>{index + 1}</option>;
            })}
          </select>
        </span>
        {ticketraised ? (
          <button>Ticket Raised</button>
        ) : (
          <button onClick={handleClickOpen}>Raise Ticket</button>
        )}
      </div>

      <div className={styles.teamsAndMatchInfo}>
        <div className={styles.sec1TNMinfo}>
          <h2>{myTeam}</h2>
          <button
            type="button"
            className={styles.bChecked}
            // enabled={!rounddata.extras.checkIn.op1}
            onClick={checkInUser}
            disabled={
              (measop === "opponent1" && rounddata.extras.checkIn.opponent1) ||
              (measop === "opponent2" && rounddata.extras.checkIn.opponent2)
            }
          >
            {measop === "opponent1" &&
              rounddata.extras.checkIn.opponent1 &&
              "Checked In"}
            {measop === "opponent1" &&
              rounddata.extras.checkIn.opponent1 === false &&
              "Check In"}
            {measop === "opponent2" &&
              rounddata.extras.checkIn.opponent2 &&
              "Checked In"}
            {measop === "opponent2" &&
              rounddata.extras.checkIn.opponent2 === false &&
              "Check In"}
          </button>
          {!proofUploaded && (
            <label className={styles.chooseProof}>
              Choose File
              <input
                onChange={(e) => setProof(e.target.files[0])}
                type="file"
                accept="image/png ,image/jpeg,imgage/jpg"
              />
            </label>
          )}

          <p>
            <button
              type="button"
              onClick={handleUploadProof}
              className={styles.SScore}
              disabled={proofUploaded}
            >
              {proofUploaded ? "Score Submitted" : "Send Proof"}
            </button>
            <span>Score yet to be approved</span>
          </p>
        </div>

        <div className={styles.sec2TNMinfo}>
          <p>
            <span>Start Time:</span>

            {matches.data.matches[selectedround - 1].extras.startTime ? (
              <Moment format="DD MMM YYYY hh:mm A">
                {matches.data.matches[selectedround - 1].extras.startTime}
              </Moment>
            ) : (
              "will be updated soon"
            )}
          </p>
          <p>
            <span>End Time:</span>{" "}
            {matches.data.matches[selectedround - 1].extras.endTime ? (
              <Moment format="DD MMM YYYY hh:mm A">
                {matches.data.matches[selectedround - 1].extras.endTime}
              </Moment>
            ) : (
              "will be updated soon"
            )}
          </p>
          <div className={styles.scoresWithTeamLogo}>
            <div className={styles.apponentLogo}>
              <Image src={teamLogo} layout="fill" />
            </div>
            <div className={styles.sResult}>
              {rounddata.opponent1?.name === myTeam &&
                rounddata.opponent1?.result === "win" && <p>WON</p>}
              {rounddata.opponent2?.name === myTeam &&
                rounddata.opponent2?.result === "win" && <p>WON</p>}
              {rounddata.opponent1?.name === otherTeam &&
                rounddata.opponent1?.result === "win" && <p>LOST</p>}
              {rounddata.opponent2?.name === otherTeam &&
                rounddata.opponent2?.result === "win" && <p>LOST</p>}

              <span>
                <p>
                  {rounddata.opponent1?.name === myTeam
                    ? rounddata?.opponent1?.score
                    : rounddata?.opponent2?.score}
                </p>
                -
                <p>
                  {rounddata.opponent2?.name === otherTeam
                    ? rounddata?.opponent2?.score
                    : rounddata?.opponent1?.score}
                </p>
              </span>
            </div>
            <div className={styles.apponentLogo}>
              <Image src={teamLogo} layout="fill" />
            </div>
          </div>
        </div>

        <div className={styles.sec3TNMinfo}>
          <h2>{otherTeam}</h2>
          <button
            type="button"
            className={styles.bChecked}
            // enabled={!rounddata.extras.checkIn.opponent2}
            disabled="true"
            onClick={checkInUser}
          >
            {measop === "opponent1" &&
              rounddata.extras.checkIn.opponent2 &&
              "Checked In"}
            {measop === "opponent1" &&
              rounddata.extras.checkIn.opponent2 === false &&
              "Not Checked In"}
            {measop === "opponent2" &&
              rounddata.extras.checkIn.opponent1 &&
              "Checked In"}
            {measop === "opponent2" &&
              rounddata.extras.checkIn.opponent1 === false &&
              "Not Checked In"}
          </button>
          <p>
            <span>Score approved</span>
            <button type="button" className={styles.SScore} disabled>
              {otherTeamProof ? "Submitted" : "Not Submitted"}
            </button>
          </p>
        </div>
      </div>

      <div className={styles.chatArea}>
        <div className={styles.chatsScrollBox}>
          <div className={styles.chats}>
            {chats.map((chat) => {
              return (
                <Message
                  msg={chat.message}
                  type={chat.name === myTeam ? "sent" : "received"}
                  time={chat.timestamp}
                  name={chat.name}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className={styles.userInputText}>
          {/* FIX CSS */}
          <form>
            <input
              type="text"
              placeholder="Type here ..."
              onChange={(e) => {
                setmessage(e.target.value);
              }}
              value={message}
            />
            <button onClick={postMessage} type="submit">
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Chatter;
