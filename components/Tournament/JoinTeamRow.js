import React from "react";
import styles from "../../styles/TournamentDetails.module.css";

export const JoinTeamRow = ({ sno, teamname, total, status }) => {
  return (
    <section className={styles.JoinTeamRow}>
      <p>{sno + 2}</p>
      <p>{teamname}</p>
      <p>{total}</p>
      {status === true ? (
        <p>
          <span style={{ backgroundColor: "#07BC0C" }}>Q</span>
        </p>
      ) : total !== 0 ? (
        <p>
          <span style={{ backgroundColor: "#D82B2B" }}>F</span>
        </p>
      ) : (
        <p>
          <span style={{ backgroundColor: "#1B1F34" }}>N/A</span>
        </p>
      )}
    </section>
  );
};
