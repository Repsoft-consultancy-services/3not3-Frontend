import React from "react";
import styles from "../../styles/TournamentDetails.module.css";
import Moment from "react-moment";
const Message = ({ type, msg, time, name }) => {
  var bgclr = "#024ca7";
  var posi = "0 0 0 auto";

  type === "received"
    ? ((bgclr = "#002d64"), (posi = ".2rem auto .2rem 0"))
    : ((bgclr = "#024ca7"), (posi = ".2rem 0 .2rem auto"));
  var color = name === "Moderator" ? " #FF0000" : "#fff";
  return (
    <div className={styles.message}>
      <p
        style={{
          backgroundColor: bgclr,
          margin: posi,
          fontSize: "0.7rem",
          width: "fit-content",
          padding: "0.2rem 0.5rem",
          borderRadius: "5px",
          color: color,
        }}
      >
        {name}
      </p>
      <h5
        style={{
          backgroundColor: bgclr,
          margin: posi,
        }}
      >
        {msg}
        <span>
          <Moment format="DD MMM YY HH:mm A">
            {new Date(time?.toDate()).toUTCString()}
          </Moment>
        </span>
      </h5>
    </div>
  );
};

export default Message;
