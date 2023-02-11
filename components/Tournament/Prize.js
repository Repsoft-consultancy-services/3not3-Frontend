import React from "react";
import styles from "../../styles/TournamentDetails.module.css";

const Prize = ({ prizes }) => {
  return (
    <div className={styles.prizeDist}>
      <div className={styles.prizeHeader}>
        <p>POSITION</p>
        <p>PRIZES</p>
      </div>
      {prizes.map((prize, index) => {
        return (<div>
          <p className={prize.position === 1 ? styles.position + " " + styles.positio1 : prize.position === 2 ? styles.position + " " + styles.positio2 : prize.position === 3 ? styles.position + " " + styles.positio3 : styles.position + " " + styles.positio4} >
            <span>{prize.position}</span>st
          </p>
          <p>&#8377;{prize.prize}</p>
        </div>)
      })}

    </div>
  );
};

export default Prize;
