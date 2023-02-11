import React, { useState } from "react";
import styles from "../styles/Profile.module.css";
import Fort from "../assets/img/fort.png";
import Image from "next/image";

const Sanchit = () => {
  // const [teams, setTeams] = useState(0);
  const check = true;
  return (
    <>
      <div className={styles.bottomDiv}>
        <div className={styles.bottomAbout}>
          <h2>About Me</h2>
          <p>
            In order to participate in a CheckMate Gaming tournament you must be
            a registered participant. Tournament registration is open until all
            tournament spots are filled – the number of spots per each
            individual tournament is stated on the tournament page within the
            website.
          </p>
          <p>
            For a tournament entry to be considered valid, participants for any
            lost, late, incomplete, or misdirected entries.
          </p>
          <div className={styles.aboutDataDiv}>
            <div className={styles.aboutDataDivRow}>
              <p>Joined</p>
              <p>Age</p>
              <p>From</p>
            </div>
            <div className={styles.aboutDataDivRow2}>
              <p>December 31st 2020</p>
              <p>21</p>
              <p>Telangana, INDIA</p>
            </div>
          </div>
          <p style={{ color: "#2366e7" }}>Games</p>
          <div className={styles.aboutGames}>
            <p>Valorant</p>
            <p>CS GO</p>
            <p>Apex Legends</p>
            <p>Pubg PC</p>
          </div>
        </div>
        <div className={styles.bottomTeams}>
          {check ? (
            <>
              {" "}
              <h2>Teams</h2>
              <div className={styles.bottomTeamsBox}>
                <div className={styles.bottomTeamsRow}>
                  {" "}
                  <Image
                    alt="game"
                    className={styles.gameImage}
                    src={Fort}
                    height={60}
                    width={60}
                  />{" "}
                  <p>Team Save dragons</p>
                </div>
                <div className={styles.bottomTeamsRow}>
                  {" "}
                  <Image
                    alt="game"
                    className={styles.gameImage}
                    src={Fort}
                    height={60}
                    width={60}
                  />{" "}
                  <p>Team Save dragons</p>
                </div>{" "}
                <div className={styles.bottomTeamsRow}>
                  {" "}
                  <Image
                    alt="game"
                    className={styles.gameImage}
                    src={Fort}
                    height={60}
                    width={60}
                  />{" "}
                  <p>Team Save dragons</p>
                </div>{" "}
                <div className={styles.bottomTeamsRow}>
                  {" "}
                  <Image
                    alt="game"
                    className={styles.gameImage}
                    src={Fort}
                    height={60}
                    width={60}
                  />{" "}
                  <p>Team Save dragons</p>
                </div>{" "}
                <div className={styles.bottomTeamsRow}>
                  {" "}
                  <Image
                    alt="game"
                    className={styles.gameImage}
                    src={Fort}
                    height={60}
                    width={60}
                  />{" "}
                  <p>Team Save dragons</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.noTeam}>No Teams</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sanchit;
